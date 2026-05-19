# FlickClaw — Product Roadmap

## Overview

This roadmap outlines the planned development of FlickClaw from the current version (v0.3.1) through v1.0.0 (public launch) and beyond. Each version has a clear focus, defined scope, and specific deliverables.

---

## v0.3.1 — Bundle Integrity & Export Consistency (Current)

**Focus:** Close inconsistencies in bundles, export, download, and validation before production.

### Deliverables
- `EXPORT_FORMATS` and `BUNDLE_FILE_FORMATS` separation in validation constants
- Downloads endpoint: no silent fallback when bundle is missing
- Export endpoint: no system-prompt substitution for other formats
- Bundle verification script (`bun run verify:bundles`)
- CI workflow includes bundle verification step
- All 16 bundles have complete file sets (was missing local-ai-claw and various codex.md/aider.md files)
- Optional SHA-256 checksum validation in verification script
- Standardized error codes: INVALID_FORMAT, BUNDLE_NOT_FOUND, FORMAT_NOT_AVAILABLE, LICENSE_REQUIRED, AUTH_REQUIRED
- No stack traces or server paths leaked in error responses

### Status
- ✅ All 16 bundles pass verification
- ✅ EXPORT_FORMATS / BUNDLE_FILE_FORMATS separated
- ✅ No silent fallback in downloads
- ✅ No system-prompt substitution in exports
- ✅ Bundle verification script in CI
- ✅ Standardized error codes
- ✅ lint/typecheck/build pass

---

## v0.3.0 — Product Files & Agent Bundles

**Focus:** Create real downloadable products. Connect all UI buttons. Make FlickClaw deliver real value.

### Deliverables
- 16 agent product bundles in `agent-products/` directory
- Each bundle: product.json, system-prompt.md, manifest, export files, usage guide, QA checklist, changelog
- Server-side product loaders with path traversal protection
- Downloads endpoint serving real bundle files (not generated templates)
- Export endpoint serving real bundle files with format selector
- Free agent activation endpoint (`POST /api/licenses/activate-free`)
- Stripe Customer Portal endpoint (`POST /api/billing/portal`)
- In-memory rate limiting on all sensitive endpoints
- Library page: Download, Export, and Activate buttons fully connected
- Billing page: Manage Billing button connected to Stripe portal

### Status
- ✅ 16 agent bundles created
- ✅ Product loaders with security
- ✅ Downloads serve real files
- ✅ Exports serve real files
- ✅ Activate free agent works
- ✅ Customer portal endpoint exists
- ✅ Rate limiting active
- ✅ UI buttons connected
- 🔄 Stripe Price IDs need consolidation for production

---

## v0.4.0 — Production Stripe & Deployment

**Focus:** Make FlickClaw production-deployable with real Stripe integration.

### Deliverables
- Real Stripe Price IDs for all plans
- Complete Customer Portal configuration
- GitHub OAuth App for production
- Deploy on flickclaw.com (Vercel or Docker + Caddy)
- Sitemap, robots.txt, Open Graph tags
- AdSense/CMP activation if ads are enabled
- Production environment variables
- Health check and monitoring endpoints
- Error tracking (Sentry or equivalent)
- Performance optimization (Core Web Vitals)
- Production database (PostgreSQL)

### Key Metrics
- End-to-end purchase flow works with real Stripe
- Customer portal allows plan management
- Production deployment is automated
- Core Web Vitals "Good"

---

## v0.5.0 — Ad Monetization & Polish

**Focus:** Real ad integration with GDPR-compliant consent management and UX polish.

### Deliverables
- Google AdSense or Carbon Ads integration
- Consent Management Platform (CMP)
- GDPR/ePrivacy consent banner for EU/EEE users
- AdSlot connected to real ad provider
- Ad-free experience for paid subscribers
- UI polish and micro-interactions
- Onboarding flow for new users
- Email drip campaign setup

### Key Metrics
- CMP is IAB TCF v2.2 certified
- Ads only load after consent
- Ad revenue is tracking correctly
- No ads shown to paid subscribers

---

## v1.0.0 — Public Launch

**Focus:** Production-ready platform for public launch.

### Deliverables
- All v0.3.1–v0.5.0 features complete and tested
- Security audit and penetration testing
- Load testing and capacity planning
- Analytics integration (PostHog)
- Uptime monitoring
- CDN for static assets
- Social proof (testimonials, case studies)
- Press kit and brand assets
- Public launch announcement

### Key Metrics
- Core Web Vitals all "Good"
- 99.9% uptime target
- < 200ms TTFB for static pages
- Security audit passes with no critical issues

---

## Beyond v1.0 — Future Features

### CLI Tool (v0.6.14+)
- **Standalone binary distribution** (Go/Rust, no npm required)
- 7 install targets: Claude Code, OpenClaw, Codex, Cursor, Windsurf, Aider, Ollama
- Device flow authentication (browser-based)
- SHA-256 checksum verification
- No Pro content embedded in binary
- Path traversal protection
- No script execution, no model downloads

### Standalone Binary (v0.6.15)
- Go CLI binary: Windows, macOS (Intel + ARM), Linux (x64 + ARM64)
- GitHub Releases with checksums.txt
- SBOM (Software Bill of Materials)
- Signed releases
- `/download` page on flickclaw.com

### API Access (v1.2)
- Public REST API for programmatic access
- API key management in dashboard
- Rate limiting per API key
- Webhook support for license events

### Community Agents (v1.3)
- User-submitted agent configurations
- Community review and rating system
- Agent moderation (review before publishing)
- Revenue sharing for agent creators (70/30 split)

### Agent Marketplace (v1.5)
- Full marketplace for third-party agents
- Creator profiles and portfolios
- Pricing flexibility (free, paid, subscription)
- Featured and trending sections
- Creator analytics dashboard

### Agent Builder (v2.0)
- Visual agent configuration tool
- System prompt builder with templates
- Quality gate configurator
- One-click publish to marketplace

### Team & Enterprise (v2.0)
- Team accounts with seat management
- Role-based access control
- SSO integration (SAML, OIDC)
- Audit logs

---

## Version Timeline (Estimated)

| Version | Focus | Estimated Timeline |
|---|---|---|
| v0.3.1 | Bundle Integrity & Export Consistency | Current |
| v0.4.0 | Production Stripe & Deployment | +2 weeks |
| v0.5.0 | Ad Monetization & Polish | +4 weeks |
| v1.0.0 | Public Launch | +6 weeks |
| v1.1 | CLI Tool | +10 weeks |
| v1.2 | API Access | +14 weeks |
| v1.3 | Community Agents | +20 weeks |
| v1.5 | Agent Marketplace | +32 weeks |
| v2.0 | Builder & Enterprise | +44 weeks |

---

## Decision Framework for New Features

1. **Does it help sell agents?** — Features that directly drive agent sales are prioritized
2. **Does it reduce purchase friction?** — Features that make buying easier are high priority
3. **Does it increase retention?** — Features that keep users engaged are medium priority
4. **Does it require new infrastructure?** — Infrastructure-heavy features need more planning
5. **Does it align with "agents, not tokens"?** — Features that move toward token-based pricing are rejected
