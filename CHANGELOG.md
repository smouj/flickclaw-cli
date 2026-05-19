# FlickClaw Changelog

## v0.6.14 — Standalone CLI Policy + Ollama Adapter (2026-05-19)

### CLI Distribution Policy
- **Eliminated npm/npx from all public-facing UI and docs**
- `npx @flickclaw/cli install ...` → `flickclaw install ...`
- All references to `@flickclaw/cli`, `npx`, `npm install -g` removed
- Added `/download` page: standalone binary, no npm, no curl|bash
- 5 platform cards (Windows x64, macOS ARM/x64, Linux x64/ARM64) — "Coming soon"
- Security model documented: SHA-256 checksums, no Pro content in binary, no script execution

### Ollama Adapter
- New target: `ollama` — 7th install adapter
- Generates `.flickclaw/ollama/<slug>/Modelfile` (FROM llama3.2 + SYSTEM block)
- Generates `.flickclaw/ollama/<slug>/system-prompt.md` and `examples.md`
- CLI does NOT run `ollama create` automatically (explicit `--create-model` flag required)
- No model downloads — user controls the base model

### All Targets Enabled
- OpenClaw, Windsurf, Aider, Ollama no longer show as "coming soon" in agent detail
- Dropdown now shows all 7 targets + All
- Scope descriptions added for each target

### Agent Detail Page
- Install command: `flickclaw install <slug> --target <tool>`
- Link to `/download` added below command
- Helper text: "Requires the FlickClaw CLI standalone binary."

### Documentation
- CLI_INSTALLER.md: replaced all `npx @flickclaw/cli` with `flickclaw`, added distribution policy section, documented all 7 targets
- IDE_INSTALL_COMPATIBILITY.md: all 7 targets documented as ✅ Stable, Ollama section added
- AGENT_INSTALL_SECURITY.md: added distribution security table (npm/npx/curl|bash rejected), binary security section, no model downloads policy
- ROADMAP.md: CLI section updated to standalone binary plan (Go migration v0.6.15)

### Tests
- 35/35 pass (3 new Ollama adapter tests)

## v0.6.13 — Extended CLI Install Adapters (2026-05-19)

(unchanged — see original entry)

## v0.6.12 — Plan Simplification + Full Audit (2026-05-19)

### Plan System
- Simplified from 4 tiers (free/no_ads/pro/founder) to 2 tiers: **Free** and **Pro**
- `ClientUserPlan` now `'free' | 'pro'` only
- `getUserPlan()` returns `'free' | 'pro'` (was 4-tier)
- Admin/Developer users automatically resolved to `pro`
- `no_ads` plan eliminated — free users have ads, Pro removes them
- `founder` plan eliminated — legacy DB licenses mapped to `pro`
- `planGrantsPremiumAccess()`: only `'pro'` grants premium access
- Checkout: removed `no_ads` rejection (plan no longer exists)
- Webhook: accepts both `pro` and `pro_library` plan names

### Numbers Updated Across All Pages
- Homepage: 12→16 Verified Agents, 7→8 Export Formats
- Pricing: 4 starter→6 free agents, 12+→16 professional agents, 7→8 export formats
- Pricing layout metadata: updated agent/format counts
- Docs page: format references already correct (8)

### Homepage Carousel
- Added 4 new agents: Data Claw (free), Test Claw (free), DevOps Claw (pro), Analytics Claw (pro)
- Total carousel agents: 16 (6 free + 10 pro)

### Documentation Updated
- BUSINESS_MODEL.md: rewrote from 6-tier to 2-plan model
- AD_MONETIZATION.md: `hiddenForPlans` updated to `["pro"]`
- PRODUCT_SPEC.md: 7+→8 formats
- ROADMAP.md: 12→16 agents/bundles
- LAUNCH_CHECKLIST.md: 12→16 agents
- MVP_SCOPE.md: 12→16 agents, 7→8 formats
- STRIPE_PRODUCTION.md: `no_ads`→`pro_library` in example
- SECURITY_AUDIT.md: agent count corrected

### Tests
- 23/23 pass (removed founder + no_ads tests, added admin=pro test)

## v0.6.11 — CLI Installer MVP + Agent Avatars + Plan Consistency (2026-05-19)

### CLI Installer
- **Full CLI package** at `packages/flickclaw-cli` with `flickclaw` binary
- Commands: login, logout, whoami, list, install, uninstall, update, doctor
- Install targets: Claude Code, Codex, Cursor (plus `all`)
- Flags: --target, --scope, --dry-run, --yes, --force, --api-url
- Auth: FLICKCLAW_TOKEN env var + config.json (mode 0600)
- Path safety: rejects absolute paths, traversal, Windows paths, null bytes, symlinks
- Backup before overwrite, dry-run writes nothing
- Idempotent Codex AGENTS.md blocks
- Cursor .mdc files with valid YAML frontmatter
- Installation registry: `.flickclaw/installed-agents.json`

### Agent Avatars/Images
- New `image` field on Agent model (nullable URL)
- Admin edit page: image URL input with preview
- Agent detail page: shows image if set, falls back to Lucide icon
- Homepage cards: shows image if set, falls back to AgentIcon
- API allowlist updated with `image` field

### Plan System Simplified (v0.6.12)
- `useUserPlan` now returns `ClientUserPlan` (free | pro) — no_ads and founder removed
- `hasAds` boolean — only `free` plan sees ads
- `isPro` boolean — only `pro` grants Pro access
- `AgentsPageClient`: `isProUser` checks `userPlan === 'pro'`
- Admin/Developer users are resolved to `pro` automatically
- Server `getUserPlan()` returns `'free' | 'pro'` (was 4-tier)
- Legacy `founder` licenses in DB still work (mapped to pro)
- `AdSlot`: receives mapped plan, not raw plan
- `no_ads` users no longer incorrectly see ads
- `AgentDetailClient`: uses `isPro` for canInstall/canExport

### Codex/OpenAI Brand Icon
- Replaced broken Wikimedia 1180×320 viewBox with simple-icons 24×24 SVG
- Now renders correctly centered in all container sizes

### New Agents (4 added)
- **Data Claw** (FREE_ADS) — schemas, migrations & queries
- **Test Claw** (FREE_ADS) — unit, integration & E2E tests
- **DevOps Claw** (PRO) — CI/CD, pipelines & monitoring
- **Analytics Claw** (PRO) — metrics, dashboards & insights

### Version Sync
- package.json: 0.6.10 → 0.6.11
- app-version.ts: 0.6.10 → 0.6.11
- CLI package: 0.6.6.0 → 0.6.11.0

### Tests
- 24 CLI/install tests via Vitest
- Coverage: path safety, adapter logic, registry, dry-run, force mode, access control

### Documentation
- docs/CLI_INSTALLER.md — complete CLI reference
- docs/IDE_INSTALL_COMPATIBILITY.md — target compatibility matrix
- docs/AGENT_INSTALL_SECURITY.md — security model and threat analysis
- docs/FREE_PRO_INSTALL_ACCESS.md — access control flow and FAQ

## v0.6.10 — Brand Logos + Profile Avatars (2026-05-19)

### Brand Logos
- **All 14 integration logos** now use official brand SVGs (monochrome, no background)
- Sources: Claude Code (claude.ai), OpenAI/Codex (Wikimedia), Cursor (simple-icons), Windsurf (simple-icons), Ollama (simple-icons), Aider (aider.chat), OpenClaw (openclaw.ai)
- New brands: Gemini CLI, Qwen Code, Kimi Code, Kimari Local AI, llama.cpp, OpenAI-compatible APIs
- CSS filter `invert(1) brightness(0.8)` for visibility on dark UI
- Homepage integration cards: proper sizing (h-7 w-7 inside h-10 w-10)
- Agent detail page: same monochrome treatment for export format + compatible tools

### Profile Avatars
- **CSP updated**: `img-src` now includes `avatars.githubusercontent.com`, `github.githubassets.com`, `lh3.googleusercontent.com`
- **NextAuth fix**: `session.user.image` now propagates via JWT callback (`token.image`)
- **Avatar upload**: Settings page has file picker + URL input, max 2MB
- **Remove avatar**: X overlay button on avatar in settings
- **API**: `PATCH /api/user/profile` — update name + image (auth required)
- **Session refresh**: `updateSession()` after profile save

### Bug Fixes
- Brand logos: `dangerouslySetInnerHTML` didn't render SVG → replaced with `<img src>`
- Agent table missing after deploy: `prisma db push` now always runs in deploy script
- OpenClaw gradient ID collision: renamed to `brand-oc-grad`
- Admin avatar lost on re-seed: deploy script preserves GitHub avatar URL

## v0.6.9 — Security Audit + Consent Mode v2 (2026-05-19)

### Security (commit `c203c9b`)
- CRITICAL: Stripe webhook always verifies signature (no dev fallback)
- CRITICAL: `/api/runs` endpoints now require authentication
- HIGH: CLI token uses `crypto.timingSafeEqual` + dedicated CLI role
- HIGH: Rate limit `/api/auth/register` (5/15min) + anti-enumeration
- HIGH: Rate limit `/api/checkout` (10/min per IP)
- HIGH: Webhook no longer auto-creates users from metadata
- MEDIUM: Admin PATCH uses allowlist for updatable fields
- MEDIUM: Production startup validates NEXTAUTH_SECRET
- Security headers via proxy.ts, X-Powered-By removed

### AdSense + Consent Mode v2
- `wait_for_update: 500` in consent default (tells CMP to wait)
- CookieBanner already sets ad_storage, ad_user_data, ad_personalization correctly
- Legal pages updated to reflect Google CMP + AdSense live

### Stripe E2E
- 29/29 tests pass (handler + webhook + API + FREE→Pro flow)
- `grantLicense` now called on checkout (was dead code)

## v0.6.8 — Google AdSense Integration (2026-05-19)

- AdSense publisher ID: `<redacted>`
- `AdSenseScript`: loads for all non-Pro users (no consent gate)
- `AdSenseMeta`: verification meta tag in layout
- `AdSlot`: renders real `<ins class="adsbygoogle">` auto-ad units
- `ads.txt`: correct Google publisher entry
- CSP updated: AdSense domains added
- Legal pages: cookie-policy + privacy reflect AdSense

## v0.6.6-a — CLI Installer & IDE Adapters (2026-05-19)

- CLI rewrite in pure JS: login/logout/whoami/list/install/uninstall/update/doctor
- Install adapters: Claude Code, Codex, Cursor, Windsurf, Aider, Ollama (6 targets)
- API routes for CLI: `/api/cli/agents`, `/api/cli/agent-package/[slug]/[target]`
- Systemd service: `node` not bun, CLI token (environment variable)

## v0.6.5 — Real Agent Content + Hermes (2026-05-18)

- 8th export format: Hermes
- Brand logos for all 8 tools
- TrustBadges in Footer
- 16 agents × 8 formats = 128 real export files
- Spanish → English comprehensive fix for all DB content

## v0.6.4 — Trust + Content + SEO (2026-05-18)

- `/api/health/deep` no longer exposes internal paths
- "When to use" + "How to use" sections on agent detail
- Pricing comparison table (12 features)
- Dynamic SEO metadata per page
- Admin placeholder content detection

## v0.6.3 — DB-Backed Catalog (2026-05-18)

- `/agents` and `/agents/[slug]` read from DB
- Export UI buttons connected
- `/api/library` migrated to DB
- Auto-create user with role=USER

## v0.6.2 — Admin Panel + ZIP Export (2026-05-18)

- Admin panel at `/admin/*`
- Agent CRUD via API
- ZIP export at `/api/agent-export/[slug]/[format]`
- Version management, audit logs