# FlickClaw — Pre-Launch Checklist

## Overview

This checklist covers everything that must be verified before FlickClaw goes live to the public. Each item should be tested and confirmed by at least one team member.

---

## 1. Legal Pages

- [ ] **Privacy Policy** (`/privacy`) — Complete, accurate, reflects current data practices
- [ ] **Terms of Service** (`/terms`) — Complete, covers purchases, refunds, IP, liability
- [ ] **Refund Policy** (`/refund-policy`) — 14-day guarantee clearly stated, process documented
- [ ] **Cookie Policy** — Referenced in privacy policy, covers ad cookies
- [ ] **GDPR Compliance** — Data processing lawful basis documented, DPA available
- [ ] **Imprint/Impressum** — Required for some EU countries (if applicable)
- [ ] **Contact information** — Email, support channel listed on legal pages
- [ ] **Last updated dates** — All legal pages show last modification date

---

## 2. Stripe Testing

### Test Mode Verification

- [ ] **Checkout — Subscription (No Ads)** — Test card 4242 succeeds, creates subscription
- [ ] **Checkout — Subscription (Pro Library)** — Test card 4242 succeeds, grants pro access
- [ ] **Checkout — One-time (Agent)** — Test card 4242 succeeds, creates license
- [ ] **Checkout — One-time (Pack)** — Test card 4242 succeeds, creates multiple licenses
- [ ] **Checkout — Founder Lifetime** — Test card 4242 succeeds, grants all access
- [ ] **Payment failure** — Test card 4000 0000 0000 0002 is declined gracefully
- [ ] **Webhook — checkout.session.completed** — Creates purchase and license records
- [ ] **Webhook — customer.subscription.updated** — Updates subscription status
- [ ] **Webhook — customer.subscription.deleted** — Downgrades user, revokes access
- [ ] **Webhook — invoice.paid** — Extends subscription period
- [ ] **Webhook — invoice.payment_failed** — Marks subscription as past_due
- [ ] **Customer Portal** — User can access and manage their subscription
- [ ] **Yearly subscriptions** — Yearly plans create correct subscription intervals
- [ ] **Refund processing** — Refund can be issued via Stripe Dashboard

### Live Mode Verification

- [ ] Switch to live API keys
- [ ] Live webhook endpoint is configured in Stripe Dashboard
- [ ] Test a real payment (small amount)
- [ ] Verify webhook events are received
- [ ] Confirm receipts are sent by email

---

## 3. Ad Consent Management

- [ ] **CMP integration** — Consent Management Platform is installed and configured
- [ ] **Consent banner** — Appears for EU/EEE users before any ad scripts load
- [ ] **Granular consent** — Users can accept/reject analytics and marketing separately
- [ ] **Reject All** — "Reject All" button is as visible as "Accept All"
- [ ] **Consent persistence** — Choices are saved and respected on return visits
- [ ] **Consent withdrawal** — Users can change consent from footer link
- [ ] **No pre-ticked boxes** — All consent is opt-in
- [ ] **Geo-detection** — EU/EEE users see the banner; non-EU users don't (or see simplified version)
- [ ] **TCF v2.2 compliance** — CMP is IAB TCF v2.2 certified
- [ ] **Ad loading** — Ads only load after marketing consent is given
- [ ] **Ad-free subscribers** — No consent banner shown to paid subscribers
- [ ] **AdSlot component** — Connected to real ad provider (not placeholder)

---

## 4. SEO

- [ ] **Meta titles** — Every page has a unique, descriptive `<title>`
- [ ] **Meta descriptions** — Every page has a compelling meta description
- [ ] **Open Graph tags** — OG title, description, and image for social sharing
- [ ] **Canonical URLs** — Each page has a canonical URL to prevent duplicate content
- [ ] **Structured data** — JSON-LD for organization, products, and pricing
- [ ] **Sitemap.xml** — Auto-generated sitemap submitted to Google Search Console
- [ ] **Robots.txt** — Properly configured (`/robots.txt` exists)
- [ ] **Page speed** — Core Web Vitals meet "Good" thresholds
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
- [ ] **Mobile responsiveness** — All pages pass Google Mobile-Friendly test
- [ ] **HTTPS** — All pages redirect HTTP → HTTPS
- [ ] **404 page** — Custom 404 page exists and is helpful
- [ ] **Alt text** — All images have descriptive alt text

---

## 5. Performance

- [ ] **Build size** — Production build is under reasonable bundle size
- [ ] **Image optimization** — Next.js Image component used for all images
- [ ] **Font loading** — Fonts preloaded, no layout shift from font loading
- [ ] **Code splitting** — Dynamic imports for heavy components
- [ ] **Caching headers** — Static assets have appropriate cache headers
- [ ] **Server response time** — TTFB < 200ms for static pages
- [ ] **API response time** — API endpoints respond within 500ms
- [ ] **No memory leaks** — Long-running server process stays stable
- [ ] **Concurrent users** — Tested with 100+ concurrent connections

---

## 6. Security

- [ ] **Environment variables** — All secrets are in `.env.production`, not in code
- [ ] **No secrets in client** — `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are server-only
- [ ] **HTTPS enforcement** — All HTTP requests redirect to HTTPS
- [ ] **CSP headers** — Content Security Policy is configured
- [ ] **Rate limiting** — API endpoints are rate-limited
- [ ] **Input validation** — All API inputs validated with Zod
- [ ] **SQL injection** — Prisma ORM used for all queries (parameterized)
- [ ] **XSS prevention** — No dangerouslySetInnerHTML with user content
- [ ] **CSRF protection** — Next.js built-in CSRF protection is active
- [ ] **Dependency audit** — `bun audit` passes with no critical vulnerabilities
- [ ] **Health check** — `/api/health` returns 200 OK
- [ ] **Error monitoring** — Sentry (or equivalent) is configured and receiving events
- [ ] **Webhook verification** — Stripe webhook signatures are verified

---

## 7. User Experience

- [ ] **Onboarding flow** — New users understand what FlickClaw is within 10 seconds
- [ ] **Agent browsing** — Users can find and filter agents easily
- [ ] **Agent detail** — Clear information about what each agent does and includes
- [ ] **Pricing clarity** — Prices, features, and comparisons are clear
- [ ] **Checkout flow** — Purchase process is smooth and trustworthy
- [ ] **Download flow** — Export files are easy to download and install
- [ ] **Error states** — All error states have helpful messages and recovery actions
- [ ] **Loading states** — All loading states show spinners or skeletons
- [ ] **Empty states** — All empty states have helpful CTAs
- [ ] **Accessibility** — Keyboard navigation works, ARIA labels present
- [ ] **Mobile experience** — All pages work well on mobile devices
- [ ] **Cross-browser** — Tested on Chrome, Firefox, Safari, Edge

---

## 8. Content

- [ ] **Agent descriptions** — All 16 agents have complete, accurate descriptions
- [ ] **Agent capabilities** — All agents list their expected outputs
- [ ] **Quality gates** — All agents have relevant quality gates listed
- [ ] **Pack descriptions** — All 7 packs have complete descriptions
- [ ] **Pricing page** — All prices are correct and up-to-date
- [ ] **Documentation hub** — Docs page links to all relevant sections
- [ ] **FAQ** — Frequently asked questions are answered on pricing page
- [ ] **Testimonials** — Social proof is authentic (or removed if not yet available)

---

## 9. Infrastructure

- [ ] **Docker build** — Production Docker image builds successfully
- [ ] **Docker Compose** — `docker compose up` starts all services
- [ ] **Caddy config** — Reverse proxy works, HTTPS is automatic
- [ ] **Database** — SQLite file is created with correct schema
- [ ] **Prisma migrations** — Database schema is up-to-date
- [ ] **Backups** — Database backup strategy is in place
- [ ] **Uptime monitoring** — External monitoring is configured
- [ ] **Log rotation** — Server logs are rotated to prevent disk fill
- [ ] **DNS** — Domain points to production server
- [ ] **SSL** — Certificate is valid and auto-renewing (Caddy)

---

## 10. Launch Readiness

- [ ] **All checklist items above are complete**
- [ ] **Staging environment matches production**
- [ ] **Run-through of complete user journey** (browse → purchase → download → use)
- [ ] **Support channel** — Email or helpdesk is ready for user questions
- [ ] **Social media** — Accounts are set up for launch announcement
- [ ] **Analytics** — Tracking is active and capturing events
- [ ] **Announcement** — Launch blog post / social posts are drafted
- [ ] **Rollback plan** — Documented procedure if something goes wrong

---

## Sign-Off

| Role | Name | Date | Approved |
|---|---|---|---|
| Product | | | |
| Engineering | | | |
| Security | | | |
| Legal | | | |
