# Agent Install Security — FlickClaw v0.6.14

Security model for the FlickClaw CLI installer.

## Distribution Security

**FlickClaw CLI is distributed as a standalone binary, not as an npm package.**

We explicitly reject the following distribution methods:

| Method | Rejected | Reason |
|--------|----------|--------|
| `npx @flickclaw/cli` | ✅ | Requires Node.js runtime, exposes npm supply chain |
| `npm install -g @flickclaw/cli` | ✅ | Global package install risk, npm registry dependency |
| `curl https://... \| bash` | ✅ | Pipes untrusted remote script into shell |
| `powershell \| iex` | ✅ | Same risk as curl pipe for Windows |

**Accepted method:** Download standalone binary from [flickclaw.com/download](https://flickclaw.com/download) or GitHub Releases. Verify SHA-256 checksum before running.

## Threat Model

The CLI downloads and writes files from a remote API to the local filesystem. Key risks:

1. **Path traversal** — writing files outside the intended directory
2. **Content injection** — malicious content in downloaded files
3. **Credential exposure** — tokens leaked or stored insecurely
4. **Supply chain** — API serving compromised packages

## Path Safety

The CLI rejects paths that could escape the project directory:

| Pattern | Rejected | Reason |
|---------|----------|--------|
| `/etc/passwd` | ✅ | Absolute Unix path |
| `C:\Windows\` | ✅ | Absolute Windows path (backslash) |
| `c:/users/` | ✅ | Absolute Windows path (forward slash) |
| `D:/data` | ✅ | Any drive letter |
| `~/.ssh/` | ✅ | Home directory path |
| `../etc/passwd` | ✅ | Path traversal |
| `foo/../../bar` | ✅ | Nested traversal |
| `foo\0bar` | ✅ | Null byte injection |
| Path > 255 chars | ✅ | Overly long path |
| Empty path | ✅ | No path specified |

**Safe paths:** `.claude/skills/<slug>/SKILL.md`, `AGENTS.md`, `.cursor/rules/<name>.mdc`, `.flickclaw/ollama/<slug>/Modelfile`

## Package Security

### File Properties

- `executable` is always `false` — downloaded files are never made executable
- `sha256` hash is provided for each file for integrity verification
- Files are validated against the path safety rules before writing

### No Script Execution

The CLI **never executes** downloaded content. It only writes text files to disk.

### No Model Downloads

The Ollama adapter writes a Modelfile but does **not** download or create models automatically. `ollama create` requires explicit `--create-model` flag or manual execution.

### No Dependency Installation

The CLI never installs npm packages, pip packages, or any other dependencies.

### No Symlinks

The CLI does not create or follow symlinks during installation.

### Backup Before Overwrite

When `--force` is used, existing files are backed up with a timestamped `.bak-` suffix before being overwritten. This prevents data loss.

## Credential Security

### Token Storage

- Config file: `~/.config/flickclaw/config.json` with mode `0600` (owner read/write only)
- Windows: `%APPDATA%/flickclaw/config.json`
- Environment variable: `FLICKCLAW_TOKEN`

### Token Handling

- Tokens are **never printed** to stdout or logs
- Authentication failures show a generic message: `AUTH_REQUIRED — run: flickclaw login`
- The `logout` command removes the token from config

### API Authentication

- All CLI API requests include `Authorization: Bearer <token>` header
- Anonymous requests receive `401 Unauthorized`
- Free users requesting Pro content receive `403 Forbidden` with an upgrade URL
- The CLI token uses `crypto.timingSafeEqual` on the server side to prevent timing attacks

## Binary Security

- No Pro agent content is embedded in the binary
- All agent packages come from the authenticated API
- Binary includes SHA-256 verification of API payloads (planned)
- Checksums published alongside each release
- No automatic script execution, no model downloads, no dependency installation

## Access Control

| Role | FREE_ADS Agents | PRO Agents |
|------|-----------------|------------|
| Anonymous | 401 | 401 |
| Free user | ✅ | 403 + upgradeUrl |
| Pro subscriber | ✅ | ✅ |
| Admin/Developer | ✅ | ✅ |
| CLI token | ✅ | ✅ |

## Dry-Run Mode

`--dry-run` performs all validation and resolution but writes **zero files**. This is the recommended way to verify what an installation will do before committing.

## Content Integrity

- Each file includes a `sha256` hash from the API
- The CLI verifies hashes post-install (planned for v0.6.15)
- Content is served over HTTPS from `flickclaw.com`
- API responses are validated before processing

## Known Limitations

- **No signature verification:** Binary releases are not yet digitally signed (planned)
- **Hash verification:** CLI does not yet verify sha256 after download (planned for v0.6.15)
- **No sandboxing:** CLI writes directly to filesystem
- **Global scope risks:** Writing to `~/.claude/` or `~/.codex/` affects all projects

## Recommendations

1. Always use `--dry-run` first for new agents
2. Review files in `.claude/skills/`, `AGENTS.md`, `.cursor/rules/`, and `.flickclaw/` after install
3. Use project scope (default) instead of global when possible
4. Run `flickclaw doctor` after installation to verify
5. Keep your token secure — treat it like a password
6. Verify binary checksums before running the CLI