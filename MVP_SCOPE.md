# FlickClaw — MVP Scope Document

## Version Definitions

### v0.1.1 — Professionalization (Current)

The immediate next version focused on professionalizing the existing codebase, stabilizing the product, and preparing infrastructure for commercial launch.

**Included:**
- Fix all lint errors and type errors
- Complete all public routes (agents, packs, pricing, docs, legal)
- Complete all dashboard routes (library, downloads, licenses, account, billing, settings)
- Agent data layer with 16 agents, 7 packs, pricing plans
- Export API supporting 8 formats (OpenClaw, Hermes, Claude Code, Codex, Cursor, Windsurf, Aider, Ollama)
- Stripe checkout integration (scaffolded)
- Stripe webhook handler (scaffolded)
- AdSlot component with placement logic
- Ad placement configuration (5 defined placements)
- Prisma schema for all entities (User, AgentProduct, AgentPack, Purchase, License, Subscription, AgentFile, DownloadLog, AdEvent)
- Premium dark theme with consistent design system
- Responsive layout (mobile-first)
- Documentation hub page
- Legal pages (Privacy Policy, Terms of Service, Refund Policy)
- README, CHANGELOG, SECURITY, CONTRIBUTING

**Not Included:**
- Real authentication (NextAuth is a dependency but not wired)
- Real payment processing (Stripe is scaffolded, not production-ready)
- Real ad provider integration (AdSlot is placeholder)
- User session management
- Email notifications

---

### v0.2.0 — Commercial Catalog

Focus: Make the catalog fully functional with real product data and export files.

**Included:**
- Complete agent manifests with real system prompts for all 12 agents
- Real export file generation (not just template strings)
- Agent versioning and changelog tracking
- Agent detail pages with full documentation
- Pack composition with savings calculations
- Product image and icon assets
- SEO optimization for agent pages (meta tags, Open Graph, structured data)
- Sitemap generation
- Product search and filtering improvements
- Related agent recommendations
- Download counter and popularity metrics

**Deferred:**
- User authentication
- Payment processing
- Library access control

---

### v0.3.0 — Authentication & Library

Focus: Add user accounts, authentication, and personal agent library.

**Included:**
- NextAuth.js integration (GitHub + email providers)
- User registration and login flow
- Session management and protected routes
- Personal agent library (My Agents, My Packs)
- License management (active, expired)
- Download history tracking
- Account settings (profile, preferences)
- License verification for premium content
- Access control: free vs. paid vs. pro vs. founder
- Email verification
- Password reset flow

**Deferred:**
- Stripe payment integration
- Subscription management
- Ad consent management

---

### v0.4.0 — Stripe Integration

Focus: Full Stripe payment integration for subscriptions and one-time purchases.

**Included:**
- Stripe Checkout for all plans (No Ads, Pro Library, Founder Lifetime)
- Stripe Checkout for individual agent purchases
- Stripe Checkout for pack purchases
- Webhook handlers for all payment events
- Subscription management (upgrade, downgrade, cancel)
- Customer portal integration
- Invoice generation and PDF download
- Refund processing
- Payment method management
- VAT handling for EU customers
- Yearly subscription options with discount display
- Purchase confirmation emails
- Receipt emails

**Deferred:**
- Ad monetization
- Consent management platform

---

### v0.5.0 — Ad Monetization

Focus: Implement ad serving with consent management for EU/EEE compliance.

**Included:**
- Google AdSense or equivalent ad provider integration
- Consent Management Platform (CMP) for GDPR/ePrivacy compliance
- Ad consent banner for EU/EEE traffic
- Granular consent options (analytics, marketing, etc.)
- AdSlot component connected to real ad provider
- Ad-free experience for No Ads, Pro, and Founder subscribers
- Ad performance tracking (via AdEvent model)
- A/B testing for ad placements
- Revenue optimization
- No-ad pages enforcement (checkout, login, legal pages)

**Deferred:**
- Public launch marketing
- Community features

---

### v1.0.0 — Public Launch

Focus: Production-ready platform with all features for public launch.

**Included:**
- All features from v0.1.1 through v0.5.0
- Performance optimization (Core Web Vitals)
- Security audit and penetration testing
- Load testing and capacity planning
- Error monitoring (Sentry or equivalent)
- Analytics integration (PostHog or equivalent)
- Uptime monitoring
- Rate limiting on API routes
- CDN configuration for static assets
- Documentation completeness review
- Onboarding flow for new users
- Email drip campaign for sign-ups
- Social proof (testimonials, case studies)
- Press kit and brand assets
- Public launch announcement

---

## Out of Scope (Post-v1.0)

These features are explicitly **not** planned for any current version:

- **Agent marketplace** — Third-party agents sold by other creators
- **Community agents** — User-submitted agents (moderated or unmoderated)
- **CLI tool** — Command-line agent launcher (`flick launch audit-claw`)
- **API access** — Public REST API for programmatic access
- **Real-time collaboration** — Multi-user agent editing or sharing
- **Cloud execution** — Running agents on FlickClaw infrastructure
- **Mobile app** — Native iOS/Android application
- **Agent builder** — Visual or code-based agent creation tool
- **Custom agent training** — Fine-tuning models for specific agents
- **Enterprise features** — SSO, team management, bulk licensing

---

## Scope Decision Framework

When evaluating new features, use these criteria:

1. **Does it sell agents?** — If yes, prioritize. If no, defer.
2. **Does it reduce friction to purchase?** — If yes, prioritize.
3. **Does it increase retention?** — If yes, consider for subscription features.
4. **Does it require infrastructure?** — If yes, defer unless critical.
5. **Does it add vendor lock-in?** — If yes, avoid. FlickClaw is portable by design.
