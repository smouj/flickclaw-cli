# FlickClaw CLI

**One-command npm package. No global install required. Published with npm provenance.**

FlickClaw is an AI Agent Launcher — install pre-configured AI agents into your coding tools with one command.

```bash
npm exec --yes @flickclaw/cli@latest -- install product-claw --target cursor
```

> **Note:** The `@flickclaw/cli` npm package is not yet published. Commands shown are the intended interface. Export via the [web dashboard](https://flickclaw.com/dashboard) is available now.

## Install

```bash
# Primary (no global install required)
npm exec --yes @flickclaw/cli@latest -- install product-claw --target cursor

# Short alternative
npx @flickclaw/cli@latest install product-claw --target cursor

# Optional global install
npm install -g @flickclaw/cli
flickclaw install product-claw --target cursor

# Preview without writing files
npm exec --yes @flickclaw/cli@latest -- install product-claw --target cursor --dry-run

# Verify your setup
npm exec --yes @flickclaw/cli@latest -- doctor
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

See [AGENT_INSTALL_SECURITY.md](./AGENT_INSTALL_SECURITY.md) for full security model.

## Verify

```bash
# Check package metadata
npm view @flickclaw/cli version

# Verify provenance (after npm publish)
npm view @flickclaw/cli dist.integrity

# Run health check
npm exec --yes @flickclaw/cli@latest -- doctor
```

## Documentation

| Document | Description |
|----------|-------------|
| [CLI_INSTALLER.md](./CLI_INSTALLER.md) | CLI commands, options, target formats |
| [IDE_INSTALL_COMPATIBILITY.md](./IDE_INSTALL_COMPATIBILITY.md) | All 8 target adapters detailed |
| [AGENT_INSTALL_SECURITY.md](./AGENT_INSTALL_SECURITY.md) | Threat model, path safety, credential security |
| [CHANGELOG.md](./CHANGELOG.md) | Version history |
| [ROADMAP.md](./ROADMAP.md) | Product roadmap |
| [PRODUCT_SPEC.md](./PRODUCT_SPEC.md) | Product specification |
| [BUSINESS_MODEL.md](./BUSINESS_MODEL.md) | Business model (Free / Pro) |

## License

MIT — see [LICENSE](./LICENSE)
