#!/usr/bin/env node
import fs from 'fs'
import os from 'os'
import path from 'path'
import crypto from 'crypto'

const API_BASE = process.env.FLICKCLAW_API_BASE || 'https://flickclaw.com'
const VERSION = '0.6.41'
const DEFAULT_TARGET = 'openclaw'
const SCHEMA_V2 = 'flickclaw-agent-package/v2'
const SCHEMA_V1 = 'flickclaw-agent-package/v1'

const TARGETS = ['claude-code', 'openclaw', 'codex', 'cursor', 'windsurf', 'aider', 'ollama', 'hermes', 'all']
const SCOPES = ['project', 'global', 'workspace']

const args = process.argv.slice(2)
const command = args[0]

// ─── CLI arg parsing ─────────────────────────────────────────────────────

function parseFlag(name, def = false) { return args.includes('--' + name) ? true : def }
function parseOpt(name, def = null) { const ix = args.indexOf('--' + name); return ix >= 0 && ix + 1 < args.length ? args[ix + 1] : def }

// ─── Config ───────────────────────────────────────────────────────────────

function cfgDir() {
  if (process.platform === 'win32') return path.join(process.env.APPDATA || '', 'flickclaw')
  return path.join(os.homedir(), '.config', 'flickclaw')
}
function cfgPath() { return path.join(cfgDir(), 'config.json') }
function readConfig() { if (!fs.existsSync(cfgPath())) return {}; try { return JSON.parse(fs.readFileSync(cfgPath(), 'utf8')) } catch { return {} } }
function writeConfig(data) { fs.mkdirSync(cfgDir(), { recursive: true }); fs.writeFileSync(cfgPath(), JSON.stringify(data, null, 2), { mode: 0o600 }) }
function getToken() { return process.env.FLICKCLAW_TOKEN || readConfig().token || null }

// ─── Security ─────────────────────────────────────────────────────────────

function isSafeRelPath(p) {
  if (!p || p.length > 255) return false
  if (p.startsWith('/') || p.startsWith('~')) return false
  if (/^[a-zA-Z]:/.test(p)) return false
  if (p.includes('..')) return false
  if (p.includes('\0')) return false
  return true
}

function validateAbsolutePath(base, target) {
  const resolved = path.resolve(base, target)
  if (!resolved.startsWith(path.resolve(base) + path.sep) && resolved !== path.resolve(base)) {
    throw new Error('Path traversal detected: ' + target)
  }
  return resolved
}

// ─── Package normalization ────────────────────────────────────────────────

function normalizePackage(pkg, requestedTarget) {
  const schema = pkg?.schemaVersion || 'legacy'

  if (schema !== SCHEMA_V2 && schema !== SCHEMA_V1 && schema !== 'legacy') {
    throw new Error('Unsupported package schema: ' + schema)
  }
  if (!Array.isArray(pkg?.files)) throw new Error('Invalid package: files[] missing')

  const files = pkg.files.map((f, i) => {
    const rel = f.targetPath || f.relativePath || f.filename || null
    if (!rel || !isSafeRelPath(rel)) throw new Error('Invalid targetPath in files[' + i + ']')
    if ((f.required ?? true) && (!f.content || !String(f.content).length)) {
      throw new Error('Required file has empty content in files[' + i + ']')
    }
    return {
      ...f,
      relativePath: rel,
      targetPath: rel,
      target: f.target || f.format || 'shared',
      required: f.required ?? true,
      mergeStrategy: f.mergeStrategy || 'overwrite',
      contentHash: f.contentHash || (f.content ? crypto.createHash('sha256').update(f.content).digest('hex') : null),
    }
  })

  return { ...pkg, target: pkg.target || requestedTarget, files, schemaVersion: schema }
}

// ─── Backup system ────────────────────────────────────────────────────────

function backupDir(cwd) { return path.join(cwd, '.flickclaw', 'backups') }

function createBackup(cwd, slug) {
  const dir = backupDir(cwd)
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const backupPath = path.join(dir, `${slug}-${ts}`)
  return backupPath
}

function backupFile(filePath, backupPath) {
  if (!fs.existsSync(filePath)) return
  fs.mkdirSync(path.dirname(path.join(backupPath, path.basename(filePath))), { recursive: true })
  fs.copyFileSync(filePath, path.join(backupPath, path.basename(filePath)))
}

// ─── File writing with merge strategies ───────────────────────────────────

const BLOCK_START = (slug, target) => `<!-- FLICKCLAW:BEGIN ${slug} ${target} -->`
const BLOCK_END = (slug, target) => `<!-- FLICKCLAW:END ${slug} ${target} -->`

function writeFileWithMerge(filePath, content, strategy, slug, target, opts) {
  const cwd = opts.cwd || process.cwd()
  const absPath = validateAbsolutePath(cwd, filePath)

  if (opts.dryRun) {
    console.log(`  [dry-run] would write (${strategy}): ${filePath} (${content.length} bytes)`)
    return
  }

  fs.mkdirSync(path.dirname(absPath), { recursive: true })

  switch (strategy) {
    case 'overwrite':
      if (fs.existsSync(absPath)) backupFile(absPath, opts._backupPath || createBackup(cwd, slug))
      fs.writeFileSync(absPath, content)
      break

    case 'create':
      if (fs.existsSync(absPath)) {
        console.log(`  ⚠ skipped (exists): ${filePath}`)
        return
      }
      fs.writeFileSync(absPath, content)
      break

    case 'append-block': {
      const start = BLOCK_START(slug, target)
      const end = BLOCK_END(slug, target)
      const block = `${start}\n${content}\n${end}`

      let current = ''
      if (fs.existsSync(absPath)) {
        backupFile(absPath, opts._backupPath || createBackup(cwd, slug))
        current = fs.readFileSync(absPath, 'utf8')
      }

      const rx = new RegExp(start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'm')
      if (rx.test(current)) {
        current = current.replace(rx, block)
      } else {
        current = current.trimEnd() + '\n\n' + block + '\n'
      }
      fs.writeFileSync(absPath, current)
      break
    }

    case 'manual':
      console.log(`  ℹ manual placement needed: ${filePath}`)
      console.log(`    Content generated but not written. Merge manually.`)
      return

    default:
      if (fs.existsSync(absPath)) backupFile(absPath, opts._backupPath || createBackup(cwd, slug))
      fs.writeFileSync(absPath, content)
  }

  // Verify content hash
  if (fs.existsSync(absPath)) {
    const written = fs.readFileSync(absPath, 'utf8')
    const hash = crypto.createHash('sha256').update(written).digest('hex')
    // Only verify for overwrite/create — append-block modifies the file
    if (strategy === 'overwrite' || strategy === 'create') {
      const expected = opts.expectedHash
      if (expected && hash !== expected) {
        console.log(`  ⚠ contentHash mismatch: ${filePath}`)
      }
    }
  }
}

// ─── Registry (.flickclaw/installed.json) ─────────────────────────────────

function registryPath(cwd) { return path.join(cwd, '.flickclaw', 'installed.json') }

function readRegistry(cwd) {
  const p = registryPath(cwd)
  if (!fs.existsSync(p)) return { schemaVersion: 'flickclaw.installed.v1', agents: [] }
  try { return JSON.parse(fs.readFileSync(p, 'utf8')) } catch { return { schemaVersion: 'flickclaw.installed.v1', agents: [] } }
}

function writeRegistry(cwd, entry, opts) {
  if (opts.dryRun) { console.log('  [dry-run] would update:', registryPath(cwd)); return }
  const reg = readRegistry(cwd)
  reg.schemaVersion = 'flickclaw.installed.v1'
  // Remove existing entry for same slug+target
  reg.agents = reg.agents.filter(x => !(x.slug === entry.slug && x.target === entry.target))
  reg.agents.push(entry)
  fs.mkdirSync(path.dirname(registryPath(cwd)), { recursive: true })
  fs.writeFileSync(registryPath(cwd), JSON.stringify(reg, null, 2))
}

function removeFromRegistry(cwd, slug, target, opts) {
  if (opts.dryRun) { console.log('  [dry-run] would remove from registry'); return }
  const reg = readRegistry(cwd)
  const entry = reg.agents.find(x => x.slug === slug && x.target === target)
  if (entry) {
    for (const f of (entry.files || [])) {
      const rel = typeof f === 'string' ? f : f?.path || f?.targetPath
      if (!rel) continue
      try {
        const fp = validateAbsolutePath(cwd, rel)
        if (fs.existsSync(fp)) fs.unlinkSync(fp)
      } catch { /* skip unsafe paths */ }
    }
    reg.agents = reg.agents.filter(x => !(x.slug === slug && x.target === target))
    fs.writeFileSync(registryPath(cwd), JSON.stringify(reg, null, 2))
    console.log('  removed', entry.files.length, 'files')
  } else {
    console.log('  not found in registry')
  }
}

// ─── API ───────────────────────────────────────────────────────────────────

async function apiGet(url) {
  const token = getToken()
  const headers = {}
  if (token) headers['Authorization'] = 'Bearer ' + token
  const res = await fetch(API_BASE + url, { headers })
  const data = await res.json().catch(() => ({ error: 'Request failed' }))
  if (!res.ok) {
    if (res.status === 401) throw new Error('AUTH_REQUIRED — run: flickclaw login --token <token>')
    if (res.status === 403) throw new Error('PRO_REQUIRED — upgrade at: ' + API_BASE + '/pricing')
    throw new Error(data.error || data.message || 'Request failed (' + res.status + ')')
  }
  return data
}

// ─── Generic install (uses mergeStrategy from package) ────────────────────

function installFiles(slug, files, target, opts) {
  const cwd = opts.cwd || process.cwd()
  opts._backupPath = createBackup(cwd, slug)

  for (const f of files) {
    writeFileWithMerge(
      f.targetPath || f.relativePath,
      f.content,
      f.mergeStrategy || 'overwrite',
      slug,
      target,
      opts,
    )
  }
}

// ─── Commands ──────────────────────────────────────────────────────────────

async function cmdLogin() {
  const token = parseOpt('token')
  if (!token) throw new Error(
    'Usage: flickclaw login --token <token>\n\n' +
    'Get your token from: ' + API_BASE + '/dashboard/tokens\n' +
    'Free accounts: 30 req/min · Pro accounts: 120 req/min'
  )
  if (!token.startsWith('fctk_')) throw new Error(
    'Invalid token format. Tokens must start with "fctk_".\n' +
    'Get a valid token from: ' + API_BASE + '/dashboard/tokens'
  )
  writeConfig({ ...readConfig(), token })
  try { await apiGet('/api/cli/agents'); console.log('✓ authenticated') }
  catch { console.log('⚠ token saved (could not verify — check connection)') }
}

function cmdLogout() { const cfg = readConfig(); delete cfg.token; writeConfig(cfg); console.log('✓ logged out') }

async function cmdWhoami() {
  const data = await apiGet('/api/cli/agents')
  const allowed = data.agents.filter(a => a.allowed).length
  console.log(`✓ authenticated\n  agents: ${allowed}/${data.agents.length} accessible`)
}

async function cmdList() {
  const data = await apiGet('/api/cli/agents')
  console.log(`${'slug'.padEnd(20)} ${'plan'.padEnd(10)} ${'category'.padEnd(14)} access`)
  console.log('-'.repeat(58))
  for (const a of data.agents) console.log(`${a.slug.padEnd(20)} ${a.plan.padEnd(10)} ${a.category.padEnd(14)} ${a.allowed ? '✓' : '✗ (Pro)'}`)
}

async function cmdTargets() {
  const slug = args[1]
  if (!slug) throw new Error('Usage: flickclaw targets <slug>')

  const data = await apiGet('/api/agents/slug/' + slug + '/targets')
    .catch(() => apiGet('/api/agents/' + slug + '/targets'))
    .catch(() => null)
  if (!data || data.error) {
    // Fallback: show static target list
    console.log(`Targets for ${slug}:`)
    for (const t of TARGETS.filter(t => t !== 'all')) {
      console.log(`  ${t}`)
    }
    return
  }

  console.log(`${data.name} (${data.slug}) — ${data.totalFiles} files across ${data.targets.length} targets\n`)
  for (const t of data.targets) {
    console.log(`  ${t.label} (${t.fileCount} files):`)
    for (const f of t.files) {
      console.log(`    ${f.required ? '●' : '○'} ${f.path} — ${f.description}`)
    }
  }
}

async function cmdInstall() {
  const slug = args[1]
  if (!slug) throw new Error('Usage: flickclaw install <slug> --target <target> [--scope project|global] [--dry-run] [--force]')
  const target = parseOpt('target') || DEFAULT_TARGET
  const scope = parseOpt('scope') || 'project'
  if (!TARGETS.includes(target)) throw new Error('Invalid target. Supported: ' + TARGETS.join(', '))
  if (!SCOPES.includes(scope)) throw new Error('Invalid scope. Supported: ' + SCOPES.join(', '))
  const dryRun = parseFlag('dry-run', false)
  const force = parseFlag('force', false)
  const applyConfig = parseFlag('apply-config', false)
  const opts = { scope, dryRun, force, applyConfig, cwd: process.cwd() }

  if (scope === 'global') {
    console.log('⚠ global scope is experimental; prefer project/workspace unless you need global install.')
  }

  console.log(`FlickClaw v${VERSION}`)
  console.log(`Installing ${slug} → ${target} (${scope} scope)${dryRun ? ' [DRY-RUN]' : ''}`)
  if (!parseOpt('target')) console.log('Target: openclaw (default)')
  console.log('')

  const targets = target === 'all'
    ? ['openclaw', 'claude-code', 'codex', 'cursor', 'windsurf', 'aider', 'ollama', 'hermes']
    : [target]

  let allFiles = []

  for (const t of targets) {
    if (targets.length > 1) console.log(`→ Installing for ${t}...`)
    const pkg = normalizePackage(await apiGet('/api/cli/agent-package/' + slug + '/' + t), t)
    installFiles(slug, pkg.files, t, opts)

    allFiles.push(...pkg.files.map(f => ({
      path: f.targetPath || f.relativePath,
      targetPath: f.targetPath || f.relativePath,
      target: f.target || t,
      contentHash: f.contentHash,
      required: f.required,
      mergeStrategy: f.mergeStrategy,
    })))

    if (targets.length > 1) console.log('')
  }

  // Write registry
  const pkgMeta = await apiGet('/api/cli/agent-package/' + slug + '/' + (target === 'all' ? 'openclaw' : target)).catch(() => null)
  writeRegistry(process.cwd(), {
    slug,
    target,
    scope,
    version: pkgMeta?.agent?.version || null,
    files: allFiles,
    installedAt: new Date().toISOString(),
  }, opts)

  console.log(dryRun ? '[dry-run] no files were written' : '✓ installation complete')
  console.log('  run `flickclaw doctor` to verify')
}

async function cmdUninstall() {
  const slug = args[1]
  const target = parseOpt('target') || DEFAULT_TARGET
  if (!slug) throw new Error('Usage: flickclaw uninstall <slug> --target <target>')
  const dryRun = parseFlag('dry-run', false)
  console.log(`Uninstalling ${slug} (${target})${dryRun ? ' [DRY-RUN]' : ''}`)
  removeFromRegistry(process.cwd(), slug, target, { dryRun })
  console.log(dryRun ? '[dry-run] no files removed' : '✓ uninstalled')
}

function cmdDoctor() {
  const reg = readRegistry(process.cwd())
  console.log(`FlickClaw v${VERSION} — Doctor\n`)
  console.log('Config:', cfgPath())
  console.log('Token:', getToken() ? '✓ set' : '✗ not set (run: flickclaw login --token <token>)')
  console.log('Registry:', registryPath(process.cwd()))
  console.log('Installed agents:', reg.agents.length)
  if (reg.agents.length > 0) {
    for (const e of reg.agents) {
      const files = e.files || []
      const missing = files.filter(f => {
        const rel = typeof f === 'string' ? f : f?.path || f?.targetPath
        return rel && !fs.existsSync(path.join(process.cwd(), rel))
      })
      const status = missing.length === 0 ? '✓' : `✗ ${missing.length} missing files`
      console.log(`  ${e.slug} (${e.target}) v${e.version || '?'} — ${status}`)
    }
  }
  const toolDirs = [
    ['Claude Code', '.claude/skills'],
    ['OpenClaw', 'openclaw/'],
    ['Codex', 'codex/AGENTS.md'],
    ['Cursor', '.cursor/rules'],
    ['Windsurf', '.windsurf/rules'],
    ['Aider', 'aider/CONVENTIONS.md'],
    ['Ollama', 'ollama/Modelfile'],
    ['Hermes', 'hermes/skills/flickclaw'],
  ]
  console.log('\nTool directories:')
  for (const [name, p] of toolDirs) console.log(`  ${name}: ${fs.existsSync(path.join(process.cwd(), p)) ? '✓' : '—'} ${p}`)
}

async function cmdUpdate() {
  if (!parseFlag('all', false)) {
    const slug = args[1]
    if (!slug) throw new Error('Usage: flickclaw update <slug> --target <target>  OR  flickclaw update --all')
    const target = parseOpt('target') || DEFAULT_TARGET
    console.log(`Updating ${slug} (${target})...`)
    const pkg = normalizePackage(await apiGet('/api/cli/agent-package/' + slug + '/' + target), target)
    const opts = { scope: 'project', dryRun: false, force: true, cwd: process.cwd() }
    installFiles(slug, pkg.files, target, opts)
    writeRegistry(process.cwd(), {
      slug,
      target,
      scope: 'project',
      version: pkg.agent?.version || null,
      files: pkg.files.map(f => ({ path: f.targetPath, targetPath: f.targetPath, target: f.target, contentHash: f.contentHash, required: f.required, mergeStrategy: f.mergeStrategy })),
      installedAt: new Date().toISOString(),
    }, opts)
    console.log('✓ updated')
    return
  }

  const reg = readRegistry(process.cwd())
  console.log(`Updating ${reg.agents.length} agents...`)
  for (const entry of reg.agents) {
    console.log(`\n→ Updating ${entry.slug} (${entry.target})...`)
    try {
      const pkg = normalizePackage(await apiGet('/api/cli/agent-package/' + entry.slug + '/' + entry.target), entry.target)
      const opts = { scope: entry.scope, dryRun: false, force: true, cwd: process.cwd() }
      installFiles(entry.slug, pkg.files, entry.target, opts)
      writeRegistry(process.cwd(), {
        ...entry,
        files: pkg.files.map(f => ({ path: f.targetPath, targetPath: f.targetPath, target: f.target, contentHash: f.contentHash, required: f.required, mergeStrategy: f.mergeStrategy })),
        installedAt: new Date().toISOString(),
        version: pkg.agent?.version || entry.version,
      }, opts)
    } catch (e) { console.log('  ✗ failed:', e.message) }
  }
  console.log('\n✓ update complete')
}

async function main() {
  if (!command || command === '--help' || command === '-h') {
    console.log(`FlickClaw CLI v${VERSION} — AI Agent Installer

Usage: flickclaw <command> [options]

Commands:
  login              Authenticate (get token at flickclaw.com/dashboard/tokens)
  logout             Remove stored credentials
  whoami             Verify authentication
  list               List available agents
  targets <slug>     Show available export targets for an agent
  install <slug>     Install an agent into your tool
  uninstall <slug>   Remove an installed agent
  update <slug>      Update a specific agent
  update --all       Update all installed agents
  doctor             Check installation health

Install options:
  --target <t>       claude-code | openclaw | codex | cursor | windsurf | aider | ollama | hermes | all  (default: openclaw)
  --scope <s>        project | global                    (default: project)
  --dry-run          Preview without writing files
  --force            Overwrite existing files (with backup)

Merge strategies (per file):
  overwrite          Replace the file entirely (safe for tool-specific paths)
  create             Only write if file doesn't exist
  append-block       Insert/update a delimited FLICKCLAW block in existing file
  manual             Present to user without auto-writing

Examples:
  flickclaw install product-claw
  flickclaw install product-claw --target claude-code
  flickclaw install product-claw --target cursor --dry-run
  flickclaw install product-claw --target openclaw,claude-code
  flickclaw install product-claw --target all
  flickclaw targets audit-claw
  flickclaw update audit-claw --target claude-code
  flickclaw update --all
  flickclaw uninstall audit-claw --target cursor
  flickclaw doctor`)
    return
  }
  if (command === '--version' || command === '-v' || command === 'version') { console.log('v' + VERSION); return }

  const cmds = {
    login: cmdLogin,
    logout: () => cmdLogout(),
    whoami: cmdWhoami,
    list: cmdList,
    targets: cmdTargets,
    install: cmdInstall,
    uninstall: cmdUninstall,
    update: cmdUpdate,
    doctor: () => cmdDoctor(),
  }
  const fn = cmds[command]
  if (!fn) throw new Error('Unknown command: ' + command + '\nRun: flickclaw --help')
  await fn()
}

main().catch(err => { console.error('✗ ' + (err.message || String(err))); process.exit(1) })
