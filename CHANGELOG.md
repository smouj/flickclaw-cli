# FlickClaw CLI Changelog

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
