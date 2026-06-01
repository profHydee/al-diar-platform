# Al-Diar Digital Experience Platform

A premium, enterprise-grade restaurant platform for **Al-Diar Restaurant USA** — authentic Yemeni cuisine, reimagined. Built to feel like a top-tier hospitality brand: cinematic storytelling, online ordering, reservations, catering, loyalty rewards and full customer / driver / admin dashboards.

## Tech Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** + custom brand design tokens
- **Framer Motion** (page reveals, scroll & micro animations)
- **Prisma 6** + **PostgreSQL**
- **Auth.js (NextAuth v5)** — email + password (JWT sessions)
- **React Hook Form** + **Zod** (typed, validated forms)
- **Recharts** (admin analytics)
- **Clover** payment integration layer (sandbox/demo mode)
- Placeholder integrations: **Cloudinary**, **Resend**

## Getting Started

```bash
npm install                 # installs deps + runs `prisma generate`
cp .env.example .env        # fill in real credentials (placeholders work for the demo)
npm run dev                 # http://localhost:3000
```

The public site renders from `src/lib/mock` so it runs **without a database**. To go live:

```bash
npm run db:push             # push schema to your Postgres
npx tsx prisma/seed.ts      # optional: seed demo records
```

## Demo Logins

The `/login` page has shortcut buttons to each role dashboard. Seeded accounts (password `password123`):

| Role     | Email                | Dashboard     |
|----------|----------------------|---------------|
| Admin    | admin@aldiar.com     | `/admin`      |
| Driver   | driver@aldiar.com    | `/driver`     |
| Customer | layla@example.com    | `/dashboard`  |

## Structure

```
src/
  app/
    (site)/        Public site (home, menu, order, about, locations, blog, contact, catering, reservations)
    (auth)/        Login & register (split-screen)
    dashboard/     Customer dashboard (orders, rewards, wishlist, reviews, notifications, profile)
    driver/        Driver hub (active deliveries, history, earnings)
    admin/         Admin console (overview, menu, orders, customers, drivers, content, marketing, reviews, analytics, settings)
    api/           Route handlers (auth, checkout, newsletter, reservations, catering, contact, register)
    sitemap.ts · robots.ts
  components/      ui · home · menu · order · dashboard · driver · forms · cart · layout · motion · seo · icons
  lib/             prisma · auth · clover · site · utils · mock data
prisma/            schema.prisma (23+ models) · seed.ts
```

## Clover Payments

`src/lib/clover.ts` wraps charge creation / retrieval. When `CLOVER_ACCESS_TOKEN` starts with `demo`, it short-circuits to deterministic mock responses so checkout works end-to-end without live keys. Set real sandbox/production credentials in `.env` to enable live charges.

## SEO & Performance

Dynamic metadata + Open Graph per route, JSON-LD `Restaurant` structured data, `sitemap.xml`, `robots.txt`, `next/image` optimization and route-level code splitting.

---

> Built as the **Al-Diar Digital Experience Platform** — a business growth solution, not just a website redesign.
