<div align="center">
  <a href="https://flickclaw.com">
    <img src="https://flickclaw.com/logo.svg" alt="FlickClaw logo" width="96" height="96" />
  </a>

# FlickClaw CLI

**Use pre-configured AI agents in your existing tools with one command.**

[![npm version](https://img.shields.io/npm/v/@flickclaw/cli?color=0ea5e9&label=%40flickclaw%2Fcli)](https://www.npmjs.com/package/@flickclaw/cli)
[![npm provenance](https://img.shields.io/badge/npm-provenance-16a34a)](https://www.npmjs.com/package/@flickclaw/cli)
[![npm downloads](https://img.shields.io/npm/dt/@flickclaw/cli)](https://www.npmjs.com/package/@flickclaw/cli)
[![license](https://img.shields.io/npm/l/@flickclaw/cli)](https://github.com/smouj/flickclaw-cli/blob/main/LICENSE)
[![runtime dependencies](https://img.shields.io/badge/runtime_dependencies-0-16a34a)](https://www.npmjs.com/package/@flickclaw/cli)

[Website](https://flickclaw.com) · [Agents](https://flickclaw.com/agents) · [Download](https://flickclaw.com/download) · [Docs](https://flickclaw.com/docs) · [npm](https://www.npmjs.com/package/@flickclaw/cli)

</div>

---

## What FlickClaw CLI does

FlickClaw CLI configures **one selected FlickClaw agent** for **one selected AI tool**.

It does not install IDEs, proxy model calls, resell tokens, or embed Pro agent content inside the npm package. Agent packages are fetched from the authenticated FlickClaw API, and Free/Pro access is enforced server-side.

```bash
npm exec --yes @flickclaw/cli@latest -- install product-claw --target cursor
```

The command above configures **Product Claw for Cursor only**.

---

## Quick start

Run the CLI without a global install:

```bash
# Check CLI health
npm exec --yes @flickclaw/cli@latest -- doctor

# Check the published version
npm exec --yes @flickclaw/cli@latest -- version

# List available agents
npm exec --yes @flickclaw/cli@latest -- list
```

To configure an agent, open the agent page on FlickClaw, choose your target tool, and copy the generated command.

```bash
npm exec --yes @flickclaw/cli@latest -- install product-claw --target cursor
```

Optional global install:

```bash
npm install -g @flickclaw/cli
flickclaw doctor
```

---

## Command semantics

| Command | Meaning |
|---|---|
| `install product-claw --target cursor` | Configure Product Claw for Cursor only |
| `install product-claw --target claude-code` | Configure Product Claw for Claude Code only |
| `install product-claw --target all` | Configure Product Claw for all supported tools |
| `list` | List agents available to the current user |
| `doctor` | Check CLI health and environment assumptions |

`--target all` means **all tools for the selected agent**. It does not install the full agent library.

---

## Supported targets

| Target | Purpose | Files configured |
|---|---|---|
| `claude-code` | Claude Code skills | `.claude/skills/<slug>/SKILL.md` |
| `openclaw` | OpenClaw skills | `skills/<slug>/SKILL.md` |
| `codex` | Codex project instructions | `AGENTS.md` + `.flickclaw/agents/<slug>/codex.md` |
| `cursor` | Cursor rules | `.cursor/rules/flickclaw-<slug>.mdc` |
| `windsurf` | Windsurf rules and workflows | `.windsurf/rules/` + `.windsurf/workflows/` |
| `aider` | Aider conventions | `.aider.conf.yml` + `CONVENTIONS.md` |
| `ollama` | Ollama local agent prompt | `Modelfile` + `system-prompt.md` |
| `hermes` | Hermes agent configuration | Hermes-compatible agent package |
| `all` | Bundle target | All supported tool formats for the selected agent |

---

## Authentication and access

Free agents can be listed and configured without Pro access. Pro agents require an active FlickClaw Pro subscription.

```bash
# Login with a FlickClaw token
flickclaw login --token <token>

# Or use an environment variable
export FLICKCLAW_TOKEN=<token>

# Verify current access
flickclaw whoami
```

Access rules are enforced by the FlickClaw API:

| User plan | Free agents | Pro agents | Ads |
|---|---:|---:|---:|
| Free | Yes | No | Yes |
| Pro | Yes | Yes | No |
| Admin / Developer | Yes | Yes | No |

---

## Security model

| Control | Status |
|---|---|
| npm package provenance | Published with provenance metadata |
| Runtime dependencies | Zero runtime dependencies |
| Install scripts | No `preinstall`, `install`, or `postinstall` scripts |
| Pro content | Not embedded in the npm package |
| Agent delivery | Fetched from authenticated API endpoints |
| Access control | Enforced server-side by FlickClaw |
| Path safety | Blocks traversal and unsafe install paths |
| Token handling | Tokens are redacted from logs and errors |

Verify package metadata:

```bash
npm view @flickclaw/cli version
npm view @flickclaw/cli dist.integrity
npm view @flickclaw/cli scripts
```

---

## Common workflows

Configure Product Claw for Cursor:

```bash
npm exec --yes @flickclaw/cli@latest -- install product-claw --target cursor
```

Preview without writing files:

```bash
npm exec --yes @flickclaw/cli@latest -- install product-claw --target cursor --dry-run
```

Configure the selected agent for all supported tools:

```bash
npm exec --yes @flickclaw/cli@latest -- install product-claw --target all
```

---

## Documentation

| Document | Description |
|---|---|
| [CLI_INSTALLER.md](./CLI_INSTALLER.md) | CLI usage, options, targets, and examples |
| [IDE_INSTALL_COMPATIBILITY.md](./IDE_INSTALL_COMPATIBILITY.md) | Tool-specific file formats and compatibility notes |
| [AGENT_INSTALL_SECURITY.md](./AGENT_INSTALL_SECURITY.md) | Threat model, package safety, and path validation |
| [CHANGELOG.md](./CHANGELOG.md) | Version history |
| [ROADMAP.md](./ROADMAP.md) | Planned CLI and platform work |

---

## Product links

- Website: https://flickclaw.com
- Agent catalog: https://flickclaw.com/agents
- Download page: https://flickclaw.com/download
- npm package: https://www.npmjs.com/package/@flickclaw/cli

---

## License

MIT — see [LICENSE](./LICENSE).
