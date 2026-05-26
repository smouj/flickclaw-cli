# @flickclaw/cli

<p align="center">
  <img src="https://flickclaw.com/logo-full-white.png" alt="FlickClaw" width="200" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@flickclaw/cli"><img src="https://img.shields.io/npm/v/@flickclaw/cli?color=22c55e&label=npm" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@flickclaw/cli"><img src="https://img.shields.io/npm/dt/@flickclaw/cli?color=3b82f6" alt="npm downloads" /></a>
  <a href="https://github.com/smouj/flickclaw-cli/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="license" /></a>
  <a href="https://flickclaw.com"><img src="https://img.shields.io/badge/web-flickclaw.com-22c55e" alt="website" /></a>
  <a href="https://github.com/smouj/flickclaw-cli"><img src="https://img.shields.io/github/stars/smouj/flickclaw-cli?style=social" alt="GitHub stars" /></a>
</p>

<p align="center"><strong>One command. No global install. All 8 AI Agent Frameworks.</strong></p>

---

FlickClaw CLI installs pre-configured AI agents into your coding tools. Browse 150 professional agents at [flickclaw.com](https://flickclaw.com), pick one, authenticate with your FlickClaw token, and install it into any of 8 supported frameworks — no global install required.

```bash
npm exec --yes @flickclaw/cli@latest -- install product-claw --target cursor
```

---

## Quick Start

```bash
# Check your setup (no install needed)
npm exec --yes @flickclaw/cli@latest -- doctor

# List available agents (requires login/token)
npm exec --yes @flickclaw/cli@latest -- list

# Install an agent into your framework (requires login/token)
npm exec --yes @flickclaw/cli@latest -- install <slug> --target <target>

# Optional: global install for shorter commands
npm install -g @flickclaw/cli
flickclaw install product-claw --target cursor
```

---

## Supported Frameworks

| Framework | `--target` | Install scope | Files |
|-----------|-----------|--------------|-------|
| **OpenClaw** | `openclaw` | workspace / global | Skill package + agent workspace |
| **Claude Code** | `claude-code` | project / global | SKILL.md + CLAUDE.md |
| **Codex** | `codex` | project / global | AGENTS.md + codex profile |
| **Cursor** | `cursor` | project | .mdc rule files |
| **Windsurf** | `windsurf` | project | Rule + workflow files |
| **Aider** | `aider` | project | CONVENTIONS.md + config |
| **Ollama** | `ollama` | project | Modelfile + system prompt |
| **Hermes** | `hermes` | workspace / global | Skill package + validate.sh |
| **All** | `all` | bundle | Complete ZIP with all formats |

---

## Commands

| Command | Description |
|---------|-------------|
| `flickclaw doctor` | Check installation health and connectivity |
| `flickclaw list` | List all available agents |
| `flickclaw install <slug>` | Install an agent (default: OpenClaw) |
| `flickclaw install <slug> --target <t>` | Install into a specific framework |
| `flickclaw targets <slug>` | Show available targets with file details |
| `flickclaw uninstall <slug>` | Remove an installed agent |
| `flickclaw update <slug> --target <t>` | Update a specific agent |
| `flickclaw update --all` | Update all installed agents |
| `flickclaw login --token <t>` | Authenticate with FlickClaw |
| `flickclaw logout` | Remove stored credentials |
| `flickclaw whoami` | Verify authentication status |
| `flickclaw version` | Show CLI version |

---

## Install Examples

```bash
# OpenClaw (default)
npm exec --yes @flickclaw/cli@latest -- install product-claw

# Cursor
npm exec --yes @flickclaw/cli@latest -- install product-claw --target cursor

# Claude Code
npm exec --yes @flickclaw/cli@latest -- install security-claw --target claude-code

# All frameworks at once
npm exec --yes @flickclaw/cli@latest -- install audit-claw --target all
```

---

## Authentication

The CLI requires authentication for catalog and package access. Free agents do not require payment, but they still require a FlickClaw account/token so activation and downloads are tracked consistently. Pro agents require an account with Pro access.

```bash
# Login with your FlickClaw token
flickclaw login --token <your-token>

# Or set environment variable
export FLICKCLAW_TOKEN=<your-token>
```

Get your token at [flickclaw.com/dashboard/tokens](https://flickclaw.com/dashboard/tokens). Tokens use the `fctk_` format and are shown only once when created.

### Rate Limits

| Plan | Rate Limit |
|------|-----------|
| Free | 30 requests/minute |
| Pro | 120 requests/minute (4x more) |

Upgrade at [flickclaw.com/pricing](https://flickclaw.com/pricing).

---

## Security

| Feature | Status |
|---------|--------|
| npm provenance | ✅ Published with attestations |
| No postinstall scripts | ✅ Zero runtime side effects |
| No Pro content in package | ✅ Agents fetched from authenticated API |
| No secrets in package | ✅ Auth via token, never in cache |
| Path traversal protection | ✅ All paths validated |
| Zero runtime dependencies | ✅ Minimal supply chain |
| Token redaction | ✅ Credentials never in logs |

---

## Requirements

- **Node.js** ≥ 18
- **npm** ≥ 9

---

## License

MIT © FlickClaw

---

<p align="center">
  <a href="https://flickclaw.com">Website</a> ·
  <a href="https://flickclaw.com/docs">Docs</a> ·
  <a href="https://flickclaw.com/agents">Agents</a> ·
  <a href="https://github.com/smouj/flickclaw-cli">GitHub</a> ·
  <a href="https://www.npmjs.com/package/@flickclaw/cli">npm</a>
</p>
