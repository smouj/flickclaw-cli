Agent Install Security

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
