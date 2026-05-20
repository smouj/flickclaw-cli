# FlickClaw CLI Changelog

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
- Added version command (alias for --version)
- Updated supported targets: 8 tools + All bundle
- Zero runtime dependencies
- No preinstall/postinstall scripts
- Security: path traversal protection, token redaction, no Pro content
