# Deployment Guide — Al-Diar Platform

Recommended host: **Vercel** (first-party Next.js 16 support).

## 1. Push to GitHub

```bash
git remote add origin https://github.com/<you>/al-diar-platform.git
git push -u origin main
```

## 2. Import on Vercel

1. vercel.com → **Add New → Project** → import the repo.
2. Framework is auto-detected as **Next.js**. No build config needed.
3. **Project Settings → Node.js Version → 20.x** (matches what we tested; avoids Prisma engine mismatches).

## 3. Environment Variables

Add these in **Project Settings → Environment Variables**. Copy keys from `.env.example`.

| Variable | Required? | Notes |
|---|---|---|
| `AUTH_SECRET` | **Yes** | NextAuth fails to start in prod without it. Generate: `openssl rand -base64 32` |
| `AUTH_URL` | Recommended | Your production URL, e.g. `https://al-diar.vercel.app` |
| `DATABASE_URL` | For DB features | Managed Postgres — Neon, Supabase, or Vercel Postgres |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Used by metadata, sitemap, JSON-LD |
| `CLOVER_*` | For live payments | Leave as `demo-*` to keep checkout in mock mode |
| `CLOUDINARY_*`, `RESEND_*` | Optional | Placeholders are fine for the demo |

> The public site renders from `src/lib/mock`, and all API routes are wrapped in try/catch,
> so the app **builds and runs without a live database**. Add `DATABASE_URL` + run
> `prisma db push` only when you want auth/persistence to work.

## 4. Database (when ready)

```bash
# locally, against your production DATABASE_URL
npx prisma db push
npx tsx prisma/seed.ts   # optional demo data
```

`prisma generate` runs automatically on every deploy via the `postinstall` script.

## Netlify (alternative)

Works, but install `@netlify/plugin-nextjs` and expect occasional lag on newest Next.js
features. Same environment variables apply.
