# @flickclaw/cli

**One-command npm package. No global install required. Published with npm provenance.**

FlickClaw is an AI Agent Launcher — install pre-configured AI agents into your coding tools with one command.

Default target: openclaw. If no --target is provided, install uses openclaw.

```bash
npm exec --yes @flickclaw/cli@latest -- install product-claw
```

## Install

```bash
# Primary (no global install required)
npm exec --yes @flickclaw/cli@latest -- install product-claw

# Short alternative
npx @flickclaw/cli@latest install product-claw

# Optional global install
npm install -g @flickclaw/cli
flickclaw install product-claw
```

## Commands

| Command | Description |
|---------|-------------|
| `flickclaw login --token <t>` | Authenticate with FlickClaw |
| `flickclaw logout` | Remove stored credentials |
| `flickclaw whoami` | Verify authentication |
| `flickclaw list` | List available agents |
| `flickclaw install <slug>` | Install an agent into your tool |
| `flickclaw uninstall <slug>` | Remove an installed agent |
| `flickclaw update --all` | Update all installed agents |
| `flickclaw doctor` | Check installation health |
| `flickclaw version` | Show CLI version |

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
| Hermes | Workspace / Global | `hermes.json` |
| All | Bundle | Complete ZIP with all formats |

## Security

- **npm provenance** — published with Sigstore attestations
- **No global install required** — `npm exec` runs without permanent setup
- **No `postinstall` or `preinstall` scripts** — zero runtime side effects
- **No Pro content in package** — all agent packages come from authenticated API
- **No secrets in package** — tokens stored securely, never in npm cache
- **Path traversal protection** — all install paths validated
- **Minimal dependencies** — zero runtime dependencies
- **Token redaction** — credentials never printed in error messages
- **No model downloads** — Ollama adapter creates Modelfile, never runs `ollama create`

## License

MIT

## Default target behavior

- Default target is openclaw
- install <slug> equals install <slug> --target openclaw
- Cursor remains supported as secondary target:
  - npm exec --yes @flickclaw/cli@latest -- install product-claw --target cursor
