# FlickClaw — Business Model

## Core Principle

**FlickClaw sells agents, not tokens.**

We sell professional AI agent configurations as digital products. Users subscribe for library access, download export files, and use them in their own AI tools. We never charge per execution, per query, or per token. There is no cloud inference layer, no runtime dependency, and no vendor lock-in.

---

## Plans

FlickClaw has two plans:

### Free

- **Price:** 0 €
- **Includes:** 6 free agents (Product Claw, UI Claw, Docs Claw, Ops Claw, Data Claw, Test Claw), all 8 export formats, usage guides, public catalog access
- **Monetization:** Display advertising (Google AdSense) on public pages and dashboard for free users
- **Ad placements:** Agent catalog sidebar, agent detail bottom (free agents only), docs inline, dashboard discover sidebar
- **Target:** Users exploring the platform before committing to Pro

### Pro

- **Price:** €9.95/month, cancel anytime
- **Includes:** No advertisements, all 16 agents (6 free + 10 professional), advanced workflows, priority updates, commercial use, all 8 export formats, billing dashboard
- **Revenue:** Monthly recurring subscription via Stripe
- **Target:** Power users who need access to all agents and regular updates

---

## Revenue Streams

| Stream | Type | Expected Mix |
|---|---|---|
| Pro subscription | Recurring | 60-70% |
| Ad revenue (Free tier) | Advertising | 20-30% |
| Future: One-time agent sales | Transactional | 5-10% |

The goal is for recurring Pro subscriptions to represent the majority of revenue, providing predictable income while ad revenue from the free tier supports growth and user acquisition.

---

## Unit Economics

### Pro Subscription (€9.95/month)

- Payment processing (Stripe ~2.9% + €0.35): ~€0.64
- Net monthly revenue per subscriber: ~€9.31
- If average subscriber stays 6 months: ~€55.86 LTV

### Free Tier (Ad-supported)

- Revenue varies by traffic and ad performance
- No marginal cost per free user (digital product, no infrastructure)

---

## Why "Agents, Not Tokens" Matters

1. **No infrastructure cost** — We don't run GPUs or inference servers
2. **No usage-based pricing** — Users aren't penalized for using agents more
3. **True ownership** — Users own their agent files and can use them anywhere
4. **No lock-in** — Standard file formats work with any compatible AI tool
5. **Predictable revenue** — Subscriptions, not volatile token consumption
6. **Scalable margins** — Digital products have near-zero marginal cost

This model aligns our incentives with users: we make better agents so people subscribe, not so people consume more tokens.