# CLI Migration Plan — TypeScript → Go

## Current State (v0.6.14)

- CLI is pure JavaScript: `packages/flickclaw-cli/src/index.js`
- Run via `node src/index.js` or from source
- 7 adapters: claude-code, openclaw, codex, cursor, windsurf, aider, ollama
- All agent content fetched from API (no Pro content in binary)
- Path traversal protection, backup-before-overwrite, dry-run, doctor

## Target State (v0.6.15)

- Go binary: `flickclaw` (Linux/macOS/Windows)
- Single binary per platform, no runtime dependencies
- Cross-compiled via `GOOS`/`GOARCH`
- Distributed via GitHub Releases + flickclaw.com/download

## Migration Steps

### Phase 1: Go CLI Scaffold (v0.6.15-alpha)

```bash
mkdir -p cli/flickclaw
cd cli/flickclaw
go mod init github.com/smouj/flickclaw-cli
```

**Dependencies:**
- `cobra` — CLI commands (install, login, logout, whoami, list, uninstall, update, doctor)
- `viper` — Config file handling (optional, can use manual JSON)
- `net/http` — API client (standard library)
- `crypto/sha256` — Payload checksum verification
- `archive/zip` — Package extraction
- `os/path/filepath` — Safe path handling

### Phase 2: Port Commands

| Command | Priority | Notes |
|---------|----------|-------|
| `flickclaw login --token` | P0 | Config file write, mode 0600 |
| `flickclaw logout` | P0 | Config cleanup |
| `flickclaw whoami` | P0 | API call with auth |
| `flickclaw list` | P0 | Fetch from API |
| `flickclaw install <slug>` | P0 | All 7 adapters |
| `flickclaw uninstall <slug>` | P1 | Registry cleanup |
| `flickclaw update --all` | P1 | Re-fetch + overwrite |
| `flickclaw doctor` | P1 | Health check |

### Phase 3: Port Adapters

Each adapter writes specific files to specific paths. The Go version replicates the exact same file structure:

| Target | Files | Scope |
|--------|-------|-------|
| claude-code | `.claude/skills/<slug>/*` | project / global |
| openclaw | `skills/<slug>/*` | workspace / global |
| codex | `AGENTS.md` + `.flickclaw/agents/<slug>/*` | project / global |
| cursor | `.cursor/rules/flickclaw-<slug>.mdc` | project |
| windsurf | `.windsurf/rules/flickclaw-<slug>.md` | project |
| aider | `.flickclaw/agents/<slug>/aider.md` + `.aider.conf.yml` | project |
| ollama | `.flickclaw/ollama/<slug>/Modelfile` + `system-prompt.md` + `examples.md` | project |

### Phase 4: Cross-Compilation

```bash
# Build all platforms
GOOS=linux   GOARCH=amd64 go build -o flickclaw-linux-x64     -ldflags="-s -w"
GOOS=linux   GOARCH=arm64 go build -o flickclaw-linux-arm64   -ldflags="-s -w"
GOOS=darwin  GOARCH=arm64 go build -o flickclaw-macos-arm64   -ldflags="-s -w"
GOOS=darwin  GOARCH=amd64 go build -o flickclaw-macos-x64     -ldflags="-s -w"
GOOS=windows GOARCH=amd64 go build -o flickclaw-windows-x64.exe -ldflags="-s -w"
```

### Phase 5: Release Pipeline

1. GitHub Action: build 5 binaries on tag push
2. Generate `checksums.txt` (SHA-256)
3. Sign `checksums.txt` with GPG key
4. Upload to GitHub Release with release notes
5. Update `/download` page to link real binaries

### Phase 6: Device Auth (v0.6.16)

- `flickclaw login` opens browser to flickclaw.com/auth/device
- User enters code shown in terminal
- CLI polls for token grant
- Token stored in config (no passwords, no token printing)

## Security Guarantees (Preserved in Go)

- No Pro content embedded in binary
- All agent packages from authenticated API
- Path traversal protection (Go: `filepath.Rel` + `strings.Contains` checks)
- No script execution, no model downloads, no dependency installation
- Backup before overwrite
- Config file mode 0600 (Unix) / ACL (Windows)
- SHA-256 verification of API payloads
- Dry-run mode for all commands

## Timeline

| Version | Scope | ETA |
|---------|-------|-----|
| v0.6.15-alpha | Go scaffold, install command, 3 adapters | 1-2 weeks |
| v0.6.15-beta | All 7 adapters, cross-compilation, checksums | 1 week |
| v0.6.15 | GitHub Release, `/download` live links | 1 week |
| v0.6.16 | Device auth, signed releases, SBOM | 1-2 weeks |

## TypeScript CLI (Current)

The existing `packages/flickclaw-cli/` remains as the internal prototype. It continues to work for development and testing. Once the Go binary is stable, the TypeScript CLI will be deprecated (not removed — still useful for contributors).

---

*Created: 2026-05-19*
*Status: Planning*