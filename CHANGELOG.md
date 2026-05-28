# FlickClaw CLI Changelog

## v0.6.50 (2026-05-29)

### Version Sync
- Version bump to 0.6.50 to match FlickClaw main app (Admin Panel 2.0 release)
- Updated README agent count: 150 → 159 agents, matching current production catalog

## v0.6.41 (2026-05-26)

### Per-User Token System
- Support for `fctk_` token format with prefix validation in `login` command
- Token help now points to `/dashboard/tokens` (was `/dashboard`)
- Rate limit info shown in login help (Free: 30/min, Pro: 120/min)
- Version sync with main FlickClaw app v0.6.41

## v0.6.38 (2026-05-25)

### Version Sync
- Version bump to 0.6.38 to match main FlickClaw app.

## v0.6.37 (2026-05-24)

### Packaging Fix
- Fixed npm executable packaging by shipping the CLI entrypoint with executable permissions.
- Updated internal VERSION constant to 0.6.37.

### Auth Contract
- Clarified CLI authentication policy: catalog/package access requires a FlickClaw token, including free agents.
- Updated README agent count to 150 to match current FlickClaw production catalog.

## v0.6.36 (2026-05-22)

### Sync & Release
- Synced with FlickClaw main app v0.6.36 release
- Updated internal VERSION constant to 0.6.36
- Published to npm as @flickclaw/cli@0.6.36

### Compatibility
- Full compatibility with FlickClaw API v0.6.36
- All 8 targets supported: openclaw, claude-code, codex, cursor, windsurf, aider, ollama, hermes
- 102 agents available with complete 8-framework file sets

## v0.6.27.0 (2026-05-21)

### Stability and Sync
- Synced release with web v0.6.27 public SEO/GEO rollout.
- Added canonical API fallback for target listing route:
  - primary: /api/agents/slug/:slug/targets
  - fallback: /api/agents/:slug/targets
- Kept v2 Target Registry install flow and merge-strategy behavior unchanged.
- Release alignment for multi-repo tagging and deployment traceability.

## v0.6.26.0 (2026-05-21)

### Target Registry Integration
- **Full v2 schema support**: reads `flickclaw-agent-package/v2` from Target Registry API
- **Merge strategies per file**: `overwrite`, `create`, `append-block`, `manual`
- **FLICKCLAW block markers**: `<!-- FLICKCLAW:BEGIN -->` / `<!-- FLICKCLAW:END -->` for safe append-block in AGENTS.md and CLAUDE.md
- **Generic install**: no more per-target install adapters — all targets use same `installFiles()` with mergeStrategy from API

### New Commands
- `flickclaw targets <slug>` — show available export targets with file details
- `flickclaw update <slug> --target <t>` — update a specific agent (not just --all)

### Registry
- `.flickclaw/installed-agents.json` → `.flickclaw/installed.json` (v1 schema)
- Tracks `mergeStrategy` and `contentHash` per file
- Tracks `version` per installed agent

### Security
- `validateAbsolutePath()` prevents path traversal on every write
- `--dry-run` shows merge strategy for each file
- No scripts executed during install
- No `ollama create` auto-run
- No `.env` modification
- `settings.example.json` generated instead of `settings.json` for Claude Code

### Breaking Changes
- Registry file moved from `installed-agents.json` to `installed.json`
- v1 package schema still supported with fallback

## v0.6.24.0 (prep)

- OpenClaw installer now respects targetPath directly (no nested .openclaw under skills/<slug>).
- target all now records all installed files in registry for better doctor/uninstall/update.
- Aider messaging clarified when --apply-config is not used.
- Hermes installation/docs aligned to skill package (hermes/skills/flickclaw/<slug>/...) with legacy fallback only.
- Global scope marked as experimental.
- Provenance statements corrected: v0.6.23 was published without provenance; CI provenance restore prepared for next release.
- npm publish workflow hardened for tagged releases (cli-v*) and optional scripts.

## v0.6.23.0 (2026-05-20)

- Default target changed to openclaw
- install <slug> now defaults to --target openclaw
- Added package schema support for flickclaw-agent-package/v1 with legacy fallback
- Installer now prioritizes targetPath (fallback: relativePath/filename)
- Added required-file validation and contentHash verification
- Aider config mutation is opt-in via --apply-config
- Cursor remains supported but no longer the primary example


## v0.6.20.0 (2026-05-19)

- npm publish readiness: publishConfig, provenance, repository URL
- Added shebang to index.js for bin execution
- Added `version` command (alias for --version)
- Updated supported targets: 8 tools + All bundle
- Zero runtime dependencies
- No preinstall/postinstall scripts
- Security: path traversal protection, token redaction, no Pro content

## v0.6.19.0 (2026-05-19)

- Hermes promoted to stable (8th target)
- npm exec distribution strategy
- Updated install commands to use `npm exec --yes @flickclaw/cli@latest`
- Added Hermes adapter (installHermes)

## v0.6.17.0 (2026-05-19)

- CLI MVP: install, list, login, logout, whoami, doctor, update
- 7 install adapters (claude-code, openclaw, codex, cursor, windsurf, aider, ollama)
- Security: path traversal, backup, dry-run, force, token storage
