# FlickClaw CLI

**Standalone binary. No npm. No `curl | bash`. Verify before running.**

FlickClaw is an AI Agent Launcher — install specialized AI agents into your coding tools with one command.

```bash
flickclaw install product-claw --target cursor
```

## Download

→ [flickclaw.com/download](https://flickclaw.com/download)

Available for Windows, macOS (Intel + Apple Silicon), and Linux (x64 + ARM64). Standalone binaries with SHA-256 checksums.

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

## Quick Start

```bash
# Login (get your token at flickclaw.com/dashboard)
flickclaw login --token <your-token>

# Install an agent
flickclaw install product-claw --target claude-code

# Install for all tools at once
flickclaw install product-claw --target all

# Preview without writing files
flickclaw install product-claw --target cursor --dry-run

# Verify your setup
flickclaw doctor
```

## Security

- **No npm, no `npx`, no `curl | bash`** — standalone binary distribution only
- **No Pro content in binary** — all agent packages come from authenticated API
- **Path traversal protection** — all install paths validated
- **No script execution** — CLI only writes text files
- **No model downloads** — Ollama adapter creates Modelfile, never runs `ollama create` automatically
- **SHA-256 checksums** — verify before running
- **Config mode 0600** — tokens stored securely

See [AGENT_INSTALL_SECURITY.md](./AGENT_INSTALL_SECURITY.md) for full security model.

## Documentation

| Document | Description |
|----------|-------------|
| [CLI_INSTALLER.md](./CLI_INSTALLER.md) | CLI commands, options, target formats |
| [IDE_INSTALL_COMPATIBILITY.md](./IDE_INSTALL_COMPATIBILITY.md) | All 7 target adapters detailed |
| [AGENT_INSTALL_SECURITY.md](./AGENT_INSTALL_SECURITY.md) | Threat model, path safety, credential security |
| [CLI_MIGRATION_PLAN.md](./CLI_MIGRATION_PLAN.md) | TypeScript → Go binary migration roadmap |
| [CHANGELOG.md](./CHANGELOG.md) | Version history |
| [ROADMAP.md](./ROADMAP.md) | Product roadmap |
| [PRODUCT_SPEC.md](./PRODUCT_SPEC.md) | Product specification |
| [BUSINESS_MODEL.md](./BUSINESS_MODEL.md) | Business model (Free / Pro) |
| [MVP_SCOPE.md](./MVP_SCOPE.md) | MVP scope definition |
| [AD_MONETIZATION.md](./AD_MONETIZATION.md) | Ad monetization model |
| [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) | Launch checklist |

## License

MIT — see [LICENSE](./LICENSE)

---

*This repository contains public documentation, changelogs, and security policies for FlickClaw. The source code is in a private repository.*
