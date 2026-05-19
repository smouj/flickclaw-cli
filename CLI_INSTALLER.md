# CLI Installer — FlickClaw v0.6.14

Install FlickClaw agents into your AI coding tools with one command.

## Distribution Policy

**FlickClaw CLI is distributed as a standalone binary.** No npm, no `npx`, no global package install, no `curl | bash`.

- Download from [flickclaw.com/download](https://flickclaw.com/download)
- Verify SHA-256 checksums before running
- Single binary per platform (Windows, macOS, Linux)
- No runtime dependencies (no Node.js required in production)

During development, the CLI can also be run from source:

```bash
node packages/flickclaw-cli/src/index.js install product-claw --target cursor
```

## Quick Start

```bash
# Login (get your token at flickclaw.com/dashboard)
flickclaw login --token YOUR_TOKEN

# Install an agent
flickclaw install product-claw --target claude-code

# Verify
flickclaw doctor
```

## Commands

| Command | Description |
|---------|-------------|
| `flickclaw login --token <TOKEN>` | Authenticate with FlickClaw |
| `flickclaw logout` | Remove stored credentials |
| `flickclaw whoami` | Verify authentication status |
| `flickclaw list` | List available agents |
| `flickclaw install <slug>` | Install an agent |
| `flickclaw uninstall <slug>` | Remove an installed agent |
| `flickclaw update --all` | Update all installed agents |
| `flickclaw doctor` | Check installation health |

## Install Options

| Flag | Values | Default | Description |
|------|--------|---------|-------------|
| `--target` | `claude-code`, `openclaw`, `codex`, `cursor`, `windsurf`, `aider`, `ollama`, `all` | `claude-code` | Target AI tool |
| `--scope` | `project`, `global` | `project` | Installation scope |
| `--dry-run` | — | off | Preview without writing files |
| `--force` | — | off | Overwrite existing files (with backup) |
| `--yes` | — | off | Skip confirmation prompts |
| `--api-url` | URL | `https://flickclaw.com` | Custom API endpoint |

## Install Targets

### Claude Code

**Project scope** (default):
```
.claude/skills/<slug>/SKILL.md
.claude/skills/<slug>/reference.md
.claude/skills/<slug>/examples.md
.claude/skills/<slug>/qa-checklist.md
.claude/skills/<slug>/changelog.md
```

**Global scope**:
```
~/.claude/skills/<slug>/SKILL.md
```

SKILL.md includes YAML frontmatter with `description` for Claude Code discovery.

### Codex

**Project scope**:
- Inserts a compact delimited block into `AGENTS.md`
- Creates `.flickclaw/agents/<slug>/codex.md` with full content
- Creates `.flickclaw/agents/<slug>/reference.md`

The AGENTS.md block is idempotent — re-running install updates the block without duplication.

```
<!-- FLICKCLAW:<slug>:start -->
## FlickClaw: <slug>
Use `.flickclaw/agents/<slug>/codex.md` when working on tasks related to this agent's domain.
<!-- FLICKCLAW:<slug>:end -->
```

**Global scope**:
```
~/.codex/AGENTS.md
~/.codex/flickclaw/agents/<slug>/codex.md
```

### Cursor

**Project scope**:
```
.cursor/rules/flickclaw-<slug>.mdc
```

The `.mdc` file includes valid frontmatter:
```yaml
---
description: FlickClaw <Agent Name> agent
globs:
alwaysApply: false
---
```

Global scope for Cursor is not yet supported — documented as pending.

### OpenClaw

**Workspace scope** (default):
```
skills/<slug>/SKILL.md
skills/<slug>/reference.md
skills/<slug>/qa-checklist.md
```

**Global scope**:
```
~/.openclaw/workspace/skills/<slug>/SKILL.md
```

SKILL.md includes YAML frontmatter with `name`, `version`, and `description`.

### Windsurf

**Project scope**:
```
.windsurf/rules/flickclaw-<slug>.md
```

The rule file includes frontmatter compatible with Windsurf's directory-based rules:
```yaml
---
description: Use <Agent Name> for <description>.
globs:
  - "**/*.{ts,tsx,js,jsx,md,mdx,css,scss,json,yml,yaml}"
alwaysApply: false
---
```

### Aider

**Project scope**:
```
.flickclaw/agents/<slug>/aider.md
.flickclaw/agents/<slug>/aider-config-hint.txt
```

The installer automatically appends a `read:` entry to `.aider.conf.yml` if not already present.

### Ollama

**Project scope**:
```
.flickclaw/ollama/<slug>/Modelfile
.flickclaw/ollama/<slug>/system-prompt.md
.flickclaw/ollama/<slug>/examples.md
```

The Modelfile uses `llama3.2` as the default base model. To create an Ollama model:

```bash
ollama create <slug> -f .flickclaw/ollama/<slug>/Modelfile
```

**Important**: The CLI does NOT run `ollama create` automatically. This is intentional — the user must explicitly create the model with the `--create-model` flag or manually. No models are downloaded automatically.

### All Tools

```bash
flickclaw install product-claw --target all
```

Installs for all supported targets: Claude Code, OpenClaw, Codex, Cursor, Windsurf, Aider, Ollama.

## Authentication

The CLI supports two auth methods:

1. **Environment variable**: `FLICKCLAW_TOKEN=your_token`
2. **Config file**: `~/.config/flickclaw/config.json` (macOS/Linux), `%APPDATA%/flickclaw/config.json` (Windows)

Config files use mode 0600 for security. Tokens are never printed to stdout.

## Access Control

| User Plan | FREE_ADS Agents | PRO Agents |
|-----------|-----------------|------------|
| Anonymous | ❌ 401 | ❌ 401 |
| Free | ✅ | ❌ 403 (upgrade URL) |
| Pro | ✅ | ✅ |
| Admin/Developer | ✅ | ✅ |
| CLI token | ✅ | ✅ |

## Installation Registry

Each installation is tracked in `.flickclaw/installed-agents.json`:

```json
{
  "installed": [
    {
      "slug": "product-claw",
      "target": "claude-code",
      "scope": "project",
      "version": "0.1.0",
      "files": [".claude/skills/product-claw/SKILL.md"],
      "installedAt": "2026-05-19T10:00:00.000Z"
    }
  ]
}
```

Use `flickclaw doctor` to verify installed agents and check for missing files.

## Examples

```bash
# Install product-claw into Claude Code (project scope)
flickclaw install product-claw --target claude-code

# Install into Codex with global scope
flickclaw install product-claw --target codex --scope global

# Preview cursor install without writing
flickclaw install ui-claw --target cursor --dry-run

# Install into all supported tools
flickclaw install ops-claw --target all

# Update all installed agents
flickclaw update --all

# Check installation health
flickclaw doctor
```

## Coming Soon

- OpenClaw adapter (workspace skills)
- Windsurf adapter (.windsurf/rules/)
- Aider adapter (.aider.conf.yml)
- Ollama adapter (Modelfile)
- Device flow authentication
- Token revocation