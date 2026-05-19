# FlickClaw — Ad Monetization Strategy

## Overview

FlickClaw uses display advertising as a revenue stream for free-tier users. Ads are shown only to users on the Free plan and are hidden for all paid subscribers (No Ads, Pro Library, Founder Lifetime).

**Key principle:** Ads should never interfere with the core product experience. They must be non-intrusive, clearly labeled, and easy to remove by upgrading.

---

## Ad Placements

FlickClaw defines five ad placements across the platform:

### 1. `public-agent-list-sidebar`

- **Page:** `/agents` (Agent Catalog)
- **Position:** Right sidebar
- **Description:** Sidebar ad on the agent catalog page
- **Format:** Rectangular (300×250 or responsive)
- **Visibility:** Free users only

### 2. `public-agent-detail-bottom`

- **Page:** `/agents/[slug]` (Agent Detail)
- **Position:** Below agent content, before similar agents
- **Description:** Bottom ad on agent detail page
- **Important:** Only shown for **free agents**. Paid agent detail pages never show ads — this respects users who are evaluating a purchase.
- **Format:** Banner (728×90 or responsive)
- **Visibility:** Free users only, free agents only

### 3. `docs-free-inline`

- **Page:** `/docs` (Documentation Hub)
- **Position:** Inline between doc sections
- **Description:** Inline ad in the free documentation section
- **Format:** In-content banner (responsive)
- **Visibility:** Free users only

### 4. `blog-inline`

- **Page:** `/blog` (Blog — future)
- **Position:** Inline within blog post content
- **Description:** Inline ad in blog posts
- **Format:** In-content banner (responsive)
- **Visibility:** Free users only

### 5. `dashboard-free-discover-sidebar`

- **Page:** `/dashboard/library` (Dashboard Library — Discover tab)
- **Position:** Right sidebar
- **Description:** Sidebar ad in free user's discover section
- **Format:** Rectangular (300×250 or responsive)
- **Visibility:** Free users only

---

## Where NOT to Place Ads

Ads are explicitly **never** shown on these pages:

| Page | Reason |
|---|---|
| `/checkout` | Payment flow — ads create friction and distrust |
| `/login` | Authentication — users are trying to access their account |
| `/dashboard/licenses` | Licensed content — paying users should never see ads here |
| `/dashboard/downloads` | Download area — paid feature |
| `/privacy` | Legal page — inappropriate for ads |
| `/terms` | Legal page — inappropriate for ads |
| `/refund-policy` | Legal page — inappropriate for ads |
| Agent detail pages (paid agents) | Purchase evaluation — ads undermine the sales experience |
| Dashboard (paid subscribers) | Subscribers have paid to remove ads |

These restrictions are enforced by the `noAdPages` configuration in `src/lib/ads/placements.ts`.

---

## AdSlot Component

### Usage

```tsx
import { AdSlot } from '@/components/ads/AdSlot'

<AdSlot
  placement="public-agent-list-sidebar"
  hiddenForPlans={["pro"]}
  className="mb-6"
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `placement` | `string` | Required | Ad placement identifier (maps to `adPlacements`) |
| `hiddenForPlans` | `string[]` | `["pro"]` | User plans that should not see ads |
| `fallback` | `ReactNode` | `null` | Optional content to show when ads are hidden |
| `className` | `string` | `""` | Additional CSS classes |

### Behavior

1. Check if the current user's plan is in `hiddenForPlans` → if yes, render `fallback` or `null`
2. Check if the current page is in `noAdPages` → if yes, render nothing
3. Otherwise, render the ad slot with the placement identifier
4. Each ad slot includes a "Remove ads →" link to `/pricing`

### Integration with Ad Providers

In production, the AdSlot component should integrate with:

- **Google AdSense** — For general display advertising
- **Google Ad Manager** — For more advanced ad operations (if traffic scales)
- **Carbon Ads** — For developer-focused, ethical advertising (preferred)

---

## CMP Requirements (EU/EEE Traffic)

### GDPR & ePrivacy Compliance

For traffic from the EU/EEE, FlickClaw must comply with:

1. **ePrivacy Directive** — Requires consent before setting tracking cookies or running non-essential scripts
2. **GDPR** — Requires a lawful basis for processing personal data for ad targeting
3. **TCF v2.2** — Transparency and Consent Framework by IAB Europe

### Required CMP Features

- **Consent Banner** — Must appear before any ad scripts load for EU/EEE users
- **Granular Consent** — Users must be able to consent to or reject:
  - Necessary cookies (always on)
  - Analytics cookies
  - Marketing/advertising cookies
- **Consent Persistence** — Store consent choices for minimum 6 months
- **Consent Withdrawal** — Users must be able to change consent at any time
- **No Pre-Ticked Boxes** — All consent must be opt-in, not opt-out
- **Equal Visibility** — "Reject All" must be as easy to find as "Accept All"

### Implementation Plan

1. Integrate a TCF v2.2 certified CMP (e.g., Cookiebot, OneTrust, Usercentrics)
2. Detect EU/EEE traffic via geo-IP lookup
3. Only load ad scripts after consent is obtained
4. Pass consent signals to ad providers via TCF API
5. Store consent records in the database (AdEvent model)
6. Provide a consent management link in the footer and privacy policy

### Geo-Detection Logic

```
if (user_in_EU_or_EEE) {
  show_consent_banner()
  wait_for_consent()
  if (consent_given_for_marketing) {
    load_ad_scripts()
  }
} else {
  load_ad_scripts() // Non-EU: no consent required for basic ads
}
```

---

## Ad Revenue Optimization

### Strategies

1. **Above-the-fold placements** — Sidebar ads on catalog pages get the most visibility
2. **Contextual targeting** — Agent-related ads perform better on agent pages
3. **Developer-focused ad networks** — Carbon Ads and similar provide higher CPM for developer audiences
4. **A/B testing** — Test placement positions, sizes, and formats
5. **Frequency capping** — Limit ad impressions per user per session to prevent fatigue

### Anti-Strategies (What NOT to Do)

- No pop-ups or interstitials
- No auto-playing video ads
- No ads that delay page load
- No ads that block content
- No ads that look like native content (must be clearly labeled "Advertisement")
- No ads on purchase or payment pages
- No redirect ads
