Agent Install Security

- Published on npm. Provenance for v0.6.23 is pending CI workflow repair.

- path traversal blocked
- absolute paths blocked
- null byte paths blocked
- targetPath preferred (fallback relativePath then filename)
- contentHash verification after write
- --force creates backup
- --dry-run performs no writes
- token output redacted
- ollama create not run by default
- aider config not modified unless --apply-config
- global scope is experimental (prefer project/workspace)
