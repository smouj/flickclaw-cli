# FlickClaw CLI

> AI Agent Launcher — install preconfigured AI agents into your coding tools with one command.

[![npm version](https://img.shields.io/npm/v/@flickclaw/cli.svg)](https://www.npmjs.com/package/@flickclaw/cli) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

```bash
npx @flickclaw/cli@latest doctor
npx @flickclaw/cli@latest install product-claw --target cursor
```

## Install

No global install needed. Run directly with `npx` or `npm exec`:

```bash
# Check your setup
npx @flickclaw/cli@latest doctor

# Install an agent for a specific tool
npx @flickclaw/cli@latest install product-claw --target claude-code

# Install for all supported tools at once
npx @flickclaw/cli@latest install product-claw --target all

# Preview without writing files
npx @flickclaw/cli@latest install product-claw --target cursor --dry-run
```

## Authentication

Get your token at [flickclaw.com/dashboard](https://flickclaw.com/dashboard):

```bash
npx @flickclaw/cli@latest login --token <your-token>
```

## Supported Targets

| Target | Flag | Scope | File Format |
|--------|------|-------|-------------|
| Claude Code | `--target claude-code` | Project / Global | `.claude/skills/<slug>/SKILL.md` |
| OpenClaw | `--target openclaw` | Workspace / Global | `skills/<slug>/SKILL.md` |
| Codex | `--target codex` | Project / Global | `AGENTS.md` + `.flickclaw/agents/` |
| Cursor | `--target cursor` | Project | `.cursor/rules/flickclaw-<slug>.mdc` |
| Windsurf | `--target windsurf` | Project | `.windsurf/rules/flickclaw-<slug>.md` |
| Aider | `--target aider` | Project | `.flickclaw/agents/<slug>/aider.md` |
| Ollama | `--target ollama` | Project | `.flickclaw/ollama/<slug>/Modelfile` |
| Hermes | `--target hermes` | Project | `.flickclaw/hermes/<slug>/config.yaml` |

**`--target all`** installs the agent for all supported tools at once.

## Commands

| Command | Description |
|---------|-------------|
| `doctor` | Check your setup and connectivity |
| `login --token <token>` | Authenticate with FlickClaw |
| `logout` | Remove stored credentials |
| `whoami` | Show current user |
| `list` | List available agents |
| `install <slug> --target <tool>` | Install an agent |
| `uninstall <slug> --target <tool>` | Uninstall an agent |
| `version` | Show CLI version |
| `update` | Update to latest version |

## Security

- **npm distribution** — verified package, no arbitrary script execution
- **No Pro content bundled** — all agent packages fetched from authenticated API
- **Path traversal protection** — all install paths validated
- **No script execution** — CLI only writes text files
- **No model downloads** — Ollama adapter creates Modelfile, never runs `ollama create`
- **Config mode 0600** — tokens stored securely
- **Dry-run mode** — `--dry-run` previews without writing files

See [AGENT_INSTALL_SECURITY.md](./AGENT_INSTALL_SECURITY.md) for the full security model.

## Plans

- **Free**: 6 agents with ads, basic export formats
- **Pro** (€9.95/month): All 16 agents, no ads, advanced workflows, priority updates

→ [flickclaw.com/pricing](https://flickclaw.com/pricing)

## License

MIT — see [LICENSE](./LICENSE)
