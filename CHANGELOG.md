# FlickClaw Changelog

## v0.6.20 — npm CLI Package Published (2026-05-19)

### Distribution
- **npm package**: `@flickclaw/cli@0.6.20` — zero dependencies, MIT license
- **Primary method**: `npx @flickclaw/cli@latest install <slug> --target <tool>`
- **No global install required** — `npm exec` or `npx` runs directly
- **8 supported targets**: claude-code, openclaw, codex, cursor, windsurf, aider, ollama, hermes
- **`--target all`** installs the agent for all supported tools

### Security
- No postinstall scripts, no arbitrary code execution
- No Pro content bundled — all agent packages fetched from authenticated API
- Path traversal protection on all install paths
- Token stored in config.json with mode 0600
- `--dry-run` flag previews without writing files

### Commands
- `doctor` — check setup and connectivity
- `login --token <token>` — authenticate
- `logout` — remove stored credentials
- `whoami` — show current user
- `list` — list available agents
- `install <slug> --target <tool>` — install an agent
- `uninstall <slug> --target <tool>` — uninstall an agent
- `version` — show CLI version

### 128 Agent-Target Combinations
- 16 agents × 8 targets = 128 combinations, all verified passing
- 6 Free agents + 10 Pro agents
- Free agents accessible with any account
- Pro agents require active Pro subscription

---

## v0.6.14 — Standalone CLI Policy + Ollama Adapter (2026-05-19)

> **Note**: v0.6.14 was superseded by v0.6.20. The current supported distribution
> method is **npm exec** (`npx @flickclaw/cli@latest`). The standalone binary approach
> described below is historical and no longer maintained.

### CLI Distribution Policy (superseded)
- Eliminated npm/npx from public-facing UI (reversed in v0.6.20)
- `flickclaw install ...` standalone binary approach (superseded)
- Added `/download` page for standalone binary (superseded)
- Security: SHA-256 checksums, no Pro content in binary, no script execution

### Ollama Adapter
- New target: `ollama` — 7th install adapter
- Generates `.flickclaw/ollama/<slug>/Modelfile` (FROM llama3.2 + SYSTEM block)
- No model downloads — user controls the base model

### Tests
- 35/35 pass (3 new Ollama adapter tests)
