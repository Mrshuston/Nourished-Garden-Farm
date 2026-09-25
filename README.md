# The Nourished Garden & Farm

A mobile-friendly Next.js website, program storefront, and secure member portal for The Nourished Garden & Farm.

## Included

- Farmhouse-inspired public website
- Clickable program catalog and program detail pages
- Supabase sign-in and protected member routes
- Stripe-hosted Checkout Sessions
- Verified Stripe webhook that grants program access
- Stripe customer billing portal
- Free guide download with owner notification through Resend
- Vercel-ready configuration

## Local setup

1. Install Node.js 20.9 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and replace every placeholder.
4. Run `npm run dev`.

## Required services

### Supabase

Create a Supabase project and set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`. Add the website URL and `/auth/callback` redirect in Supabase Authentication URL settings.

### Stripe

Create a one-time Price for each paid program and add its `price_...` ID to the matching environment variable. Use a restricted key with only the permissions this application needs. Configure a webhook endpoint at:

`https://YOUR-DOMAIN/api/stripe-webhook`

Subscribe it to `checkout.session.completed`, then set `STRIPE_WEBHOOK_SECRET` to the endpoint signing secret. Do not commit Stripe keys.

### Resend

To notify `thenourishedgardens@gmail.com` when the free guide is downloaded, verify a sending domain in Resend and configure `RESEND_API_KEY` and `DOWNLOAD_FROM_EMAIL`.

## Vercel

Import this GitHub repository into Vercel. Add all variables from `.env.example` in Project Settings → Environment Variables, using real production values. Set `NEXT_PUBLIC_APP_URL` to the final `https://` domain and redeploy.

## Important

Program lesson pages currently contain structured curriculum placeholders. Replace each placeholder with the final lessons, worksheets, and videos before selling that program.
