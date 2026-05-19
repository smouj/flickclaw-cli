# IDE Install Compatibility — FlickClaw v0.6.14

Which AI tools work with FlickClaw CLI and how.

## Distribution

**FlickClaw CLI is distributed as a standalone binary.** No npm, no `npx`, no global package install required.

Download from [flickclaw.com/download](https://flickclaw.com/download) or GitHub Releases.

```bash
flickclaw install product-claw --target cursor
```

## Supported Targets

| Target | Status | Project Scope | Global Scope | File Format |
|--------|--------|---------------|--------------|-------------|
| Claude Code | ✅ Stable | `.claude/skills/<slug>/SKILL.md` | `~/.claude/skills/<slug>/` | SKILL.md with YAML frontmatter |
| Codex | ✅ Stable | `AGENTS.md` + `.flickclaw/agents/` | `~/.codex/` | Delimited AGENTS.md block + separate files |
| Cursor | ✅ Stable | `.cursor/rules/flickclaw-<slug>.mdc` | ❌ Pending | .mdc with YAML frontmatter |
| OpenClaw | ✅ Stable | `skills/<slug>/SKILL.md` | `~/.openclaw/skills/` | SKILL.md with YAML frontmatter |
| Windsurf | ✅ Stable | `.windsurf/rules/flickclaw-<slug>.md` | ❌ Pending | Markdown with YAML frontmatter |
| Aider | ✅ Stable | `.flickclaw/agents/<slug>/aider.md` | ❌ Pending | Markdown + `.aider.conf.yml` read entry |
| Ollama | ✅ Stable | `.flickclaw/ollama/<slug>/Modelfile` | ❌ Pending | Modelfile + system-prompt.md + examples.md |

## Claude Code Details

**File structure:**
```
.claude/skills/product-claw/
├── SKILL.md          # Main skill definition (required)
├── reference.md      # Reference documentation
├── examples.md       # Usage examples
├── qa-checklist.md   # Quality assurance checklist
└── changelog.md      # Version changelog
```

**SKILL.md frontmatter:**
```yaml
---
description: Product strategy, scope & priorities
globs:
alwaysApply: false
---
```

**Discovery:** Claude Code scans `.claude/skills/*/SKILL.md` in project and `~/.claude/skills/*/SKILL.md` globally.

## Codex Details

**File structure:**
```
AGENTS.md                           # Compact block pointing to agent
.flickclaw/agents/product-claw/
├── codex.md         # Main agent definition
├── reference.md     # Reference documentation
└── qa-checklist.md  # QA checklist
```

**AGENTS.md block format:**
```markdown
<!-- FLICKCLAW:product-claw:start -->
## FlickClaw: product-claw
Use `.flickclaw/agents/product-claw/codex.md` when working on tasks related to this agent's domain.
<!-- FLICKCLAW:product-claw:end -->
```

## Cursor Details

**File structure:**
```
.cursor/rules/
└── flickclaw-product-claw.mdc
```

**MDC frontmatter:**
```yaml
---
description: FlickClaw Product Claw agent
globs:
alwaysApply: false
---
```

## OpenClaw Details

**File structure:**
```
skills/product-claw/
├── SKILL.md          # Main skill definition with frontmatter
├── reference.md      # Reference documentation
└── qa-checklist.md   # QA checklist
```

**SKILL.md frontmatter:**
```yaml
---
name: product-claw
version: "0.1.0"
description: Product strategy, scope & priorities
---
```

**Scopes:** `--scope workspace` (default) writes to `skills/` in project root. `--scope global` writes to `~/.openclaw/skills/`.

## Windsurf Details

**File structure:**
```
.windsurf/rules/
└── flickclaw-product-claw.md
```

**Frontmatter:**
```yaml
---
description: Use Product Claw for product strategy, scope & priorities.
globs:
  - "**/*.{ts,tsx,js,jsx,md,mdx,css,scss,json,yml,yaml}"
alwaysApply: false
---
```

## Aider Details

**File structure:**
```
.flickclaw/agents/product-claw/
├── aider.md              # Main agent instructions
└── aider-config-hint.txt # Setup reminder
```

The CLI also appends a `read:` entry to `.aider.conf.yml` if not already present.

## Ollama Details

**File structure:**
```
.flickclaw/ollama/product-claw/
├── Modelfile        # Ollama model definition (FROM llama3.2 + SYSTEM block)
├── system-prompt.md # Standalone system prompt
└── examples.md      # Usage examples
```

**Important:** The CLI does NOT run `ollama create` automatically. To create the model:

```bash
ollama create product-claw -f .flickclaw/ollama/product-claw/Modelfile
```

Or use `flickclaw install product-claw --target ollama --create-model` (requires confirmation).

The Modelfile uses `llama3.2` as the default base model. No models are downloaded automatically.

## General Notes

- **Binary distribution:** Standalone binary, no npm required. Download from flickclaw.com/download.
- **Backup:** Existing files are backed up with `.bak-YYYY-MM-DDThh-mm-ss` suffix before overwriting
- **Dry-run:** Use `--dry-run` to preview changes without writing
- **Registry:** All installations tracked in `.flickclaw/installed-agents.json`
- **Force:** Use `--force` to overwrite (with backup), otherwise existing files block installation