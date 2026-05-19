<div align="center">

# 🐾 FlickClaw CLI

**Pre-configured AI agents for your existing tools. One command to install.**

[![npm version](https://img.shields.io/npm/v/@flickclaw/cli?color=blue&label=%40flickclaw%2Fcli)](https://www.npmjs.com/package/@flickclaw/cli)
[![npm provenance](https://img.shields.io/badge/npm-provenance-green)](https://www.npmjs.com/package/@flickclaw/cli)
[![npm downloads](https://img.shields.io/npm/dt/@flickclaw/cli)](https://www.npmjs.com/package/@flickclaw/cli)
[![license](https://img.shields.io/npm/l/@flickclaw/cli)](https://github.com/smouj/flickclaw-cli/blob/main/LICENSE)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](https://www.npmjs.com/package/@flickclaw/cli)

[🌐 Website](https://flickclaw.com) · [📋 Agents](https://flickclaw.com/agents) · [📖 Docs](https://flickclaw.com/docs) · [💬 Discord](https://discord.gg/zQKjRzczTS)

</div>

---

## Quick Start

No global install required. Run directly with npm exec:

```bash
# Check your setup
npm exec --yes @flickclaw/cli@latest -- doctor

# List available agents
npm exec --yes @flickclaw/cli@latest -- list

# Check version
npm exec --yes @flickclaw/cli@latest -- version
```

To configure a specific agent, open its page at [flickclaw.com/agents](https://flickclaw.com/agents), choose your target tool, and copy the generated command.

## Install an Agent

```bash
# Install Product Claw for Cursor
npm exec --yes @flickclaw/cli@latest -- install product-claw --target cursor

# Install for Claude Code
npm exec --yes @flickclaw/cli@latest -- install product-claw --target claude-code

# Install for all tools at once
npm exec --yes @flickclaw/cli@latest -- install product-claw --target all

# Preview without writing files
npm exec --yes @flickclaw/cli@latest -- install product-claw --target cursor --dry-run
```

## Supported Targets

| Target | Scope | File Format |
|--------|-------|-------------|
| Claude Code | Project / Global | `.claude/skills/<slug>/SKILL.md` |
| OpenClaw | Workspace / Global | `skills/<slug>/SKILL.md` |
| Codex | Project / Global | `AGENTS.md` + `.flickclaw/agents/` |
| Cursor | Project | `.cursor/rules/flickclaw-<slug>.mdc` |
| Windsurf | Project | `.windsurf/rules/flickclaw-<slug>.md` |
| Aider | Project | `.flickclaw/agents/<slug>/aider.md` |
| Ollama | Project | `.flickclaw/ollama/<slug>/Modelfile` |
| Hermes | Workspace / Global | `hermes-config.json` |
| **All** | **Bundle** | **Complete package for all 8 targets** |

## Authentication

```bash
# Login with your FlickClaw token
flickclaw login --token <your-token>

# Or set environment variable
export FLICKCLAW_TOKEN=<your-token>

# Verify your session
flickclaw whoami
```

Free agents work without authentication. Pro agents require an active subscription.

## Commands

| Command | Description |
|---------|-------------|
| `flickclaw login --token <t>` | Authenticate with your token |
| `flickclaw logout` | Remove stored credentials |
| `flickclaw whoami` | Verify your session |
| `flickclaw list` | List available agents |
| `flickclaw install <slug>` | Install an agent |
| `flickclaw uninstall <slug>` | Remove an agent |
| `flickclaw update --all` | Update all installed agents |
| `flickclaw doctor` | Check installation health |
| `flickclaw version` | Show version |

## Optional Global Install

```bash
npm install -g @flickclaw/cli
flickclaw doctor
```

No global install is required — `npm exec` runs directly without permanent setup.

## Security

| Feature | Status |
|---------|--------|
| **npm provenance** | ✅ Published with Sigstore attestations |
| **No postinstall scripts** | ✅ Zero runtime side effects |
| **No Pro content in package** | ✅ Agents fetched from authenticated API |
| **No secrets in package** | ✅ Tokens stored securely at runtime |
| **Path traversal protection** | ✅ All install paths validated |
| **Zero runtime dependencies** | ✅ 7.4 kB package size |

See [AGENT_INSTALL_SECURITY.md](./AGENT_INSTALL_SECURITY.md) for the full security model.

## Verify

```bash
# Check package metadata
npm view @flickclaw/cli version

# Verify integrity
npm view @flickclaw/cli dist.integrity

# Run health check
npm exec --yes @flickclaw/cli@latest -- doctor
```

## Documentation

| Document | Description |
|----------|-------------|
| [CLI_INSTALLER.md](./CLI_INSTALLER.md) | CLI commands, options, and target formats |
| [IDE_INSTALL_COMPATIBILITY.md](./IDE_INSTALL_COMPATIBILITY.md) | All 8 target adapters detailed |
| [AGENT_INSTALL_SECURITY.md](./AGENT_INSTALL_SECURITY.md) | Threat model, path safety, credential security |
| [CHANGELOG.md](./CHANGELOG.md) | Version history |
| [ROADMAP.md](./ROADMAP.md) | Product roadmap |

## License

MIT — see [LICENSE](./LICENSE)
