# FlickClaw — Product Specification

## Overview

**FlickClaw** is an AI Agent Launcher — a platform that sells professional, preconfigured AI agents as digital products. Users purchase agents, not tokens. Each agent is a self-contained, versioned, and exportable configuration that works with the user's own AI tools (Claude Code, Cursor, Codex, Windsurf, Aider, Ollama, and more).

**Tagline:** AI agents ready for your workflow. Buy once. Export anywhere. Use with your own AI tools.

---

## Core Concept: Agents as Digital Products

FlickClaw does **not** sell cloud inference, API tokens, or per-execution access. Instead, each agent is a complete digital product containing:

1. **System Prompt** — A specialized, tested prompt that defines the agent's role, constraints, and behavior.
2. **Scoped Tool Permissions** — Explicit list of tools the agent may use, preventing unauthorized actions.
3. **Quality Gates** — Automated checks the agent must pass before delivering output (e.g., `no_fake_claims`, `no_secret_exposure`).
4. **Approval Requirements** — Destructive or sensitive actions that require explicit user approval (e.g., `install_dependencies`, `deploy_production`).
5. **Export Files** — Ready-to-use configuration files for 8 AI tool formats.
6. **Usage Guide** — Step-by-step instructions for getting the most from the agent.
7. **QA Checklist** — Quality assurance checklist for validating agent outputs.
8. **Changelog** — Version history tracking updates and improvements.

Once purchased, the user downloads export files and uses them in their own AI tools. FlickClaw has no runtime dependency — the agent runs locally or in the user's own environment.

---

## What FlickClaw Sells

| Product Type | Description | Pricing Model |
|---|---|---|
| Free Agents | 4 agents available to all users (Product Claw, UI Claw, Docs Claw, Ops Claw) | Free |
| Paid Agents | 8 premium agents with advanced capabilities | 9 € – 19 € one-time |
| Agent Packs | Bundles of 5-6 agents targeting specific use cases | 19 € – 49 € one-time |
| No Ads Subscription | Ad-free experience | 2.99 €/month |
| Pro Library Subscription | All premium agents + advanced exports | 9.99 €/month |
| Founder Lifetime | Everything forever, one-time payment | 79 € one-time |

**Key principle:** FlickClaw sells agents, not tokens. There are no usage fees, no per-query charges, and no vendor lock-in.

---

## Target Audience

### Primary Segments

1. **Solo Founders & Indie Hackers** — Need specialized AI agents for product strategy, code, and launch without hiring a team.
2. **SaaS Teams & Startups** — Require engineering, security, and operations agents to move faster.
3. **Open Source Maintainers** — Need documentation, audit, and security agents to maintain project quality.
4. **Game Developers** — Need UI, performance, and local AI agents for game-specific workflows.
5. **Security Teams & Auditors** — Require security review, audit, and compliance agents.
6. **Marketing Teams** — Need launch, SEO, and content agents for growth campaigns.
7. **AI Researchers & Tinkerers** — Want local AI, model management, and benchmarking agents.

### User Profile

- Developers and technical professionals already using AI coding tools
- Comfortable with CLI tools and configuration files
- Value ownership and portability over subscription lock-in
- Prefer one-time purchases over recurring token fees

---

## Value Proposition

### For Users

- **Buy once, use forever** — No recurring charges for individual agents
- **Export anywhere** — Works with Claude Code, Cursor, Codex, Windsurf, Aider, Ollama
- **No vendor lock-in** — Standard file formats, portable configurations
- **Professional quality** — Every agent has quality gates, QA checklists, and tested prompts
- **No tokens** — Use your own AI tools and API keys; FlickClaw never charges per execution
- **Version updates** — Agents are versioned and updated; Pro and Founder users get updates

### vs. Competitors

| Feature | FlickClaw | Prompt Marketplaces | AI SaaS Platforms |
|---|---|---|---|
| One-time purchase | Yes | Sometimes | No (subscriptions) |
| No token fees | Yes | Varies | No (per-query) |
| Multi-tool export | 8 formats | Usually 1 | Proprietary |
| Quality gates | Built-in | Rare | Varies |
| Version tracking | Yes | No | Sometimes |
| Works offline | Yes | Yes | No |

---

## Agent Categories

| Category | Agents | Focus |
|---|---|---|
| Product | Product Claw | Strategy, scope, priorities |
| Engineering | Frontend Claw, Backend Claw | Code, APIs, databases |
| Design | UI Claw | UX, visual hierarchy, components |
| Documentation | Docs Claw | README, docs, changelogs |
| Marketing | SEO Claw, Launch Claw | SEO, campaigns, launches |
| Quality | Audit Claw | Repo audits, risk detection |
| Security | Security Claw | Secrets, permissions, vulnerabilities |
| Operations | Ops Claw | Docker, deploy, environments |
| Local AI | Local AI Claw | GGUF, Ollama, llama.cpp |
| Agent Ops | OpenClaw Ops | Export, organize, manage agents |

---

## How Agents Work (End-to-End Flow)

1. **Browse** — User explores the agent catalog on FlickClaw
2. **Purchase** — User buys an agent (or gets a free one)
3. **Export** — User selects their preferred tool format (e.g., Cursor rules)
4. **Download** — User downloads the export file(s)
5. **Install** — User places the file in their tool's configuration directory
6. **Run** — User activates the agent in their AI tool with their own API key
7. **Iterate** — User updates the agent when new versions are available

At no point does FlickClaw execute the agent, process user data, or require a runtime connection.

---

## Platform Architecture

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui
- **Backend:** Next.js API Routes, Prisma ORM, SQLite
- **Payments:** Stripe (checkout sessions, subscriptions, webhooks)
- **State Management:** Zustand, TanStack Query
- **Animations:** Framer Motion
- **Deployment:** Docker + Caddy reverse proxy

---

## Naming Convention

All agent names follow the pattern: **[Domain] Claw** (e.g., Frontend Claw, Security Claw). This creates a memorable, consistent brand identity across the catalog.
