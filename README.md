# 07–20 Youth Development Initiative Platform

This repository contains the web platform for the **07–20 Youth Development Initiative** (HQ: Trollhättan, Sweden). It is designed to be **municipality- and grant-ready** with clear governance pages, an activities calendar, and a Supabase-backed foundation for authentication and data storage.

## Tech stack

- **Frontend:** React + TypeScript (Vite)
- **UI:** Tailwind CSS + shadcn/ui
- **Backend:** Supabase (Auth, Postgres, Storage)
- **Deployment:** Vercel (static SPA)

## Local development

1) Install dependencies

```bash
npm install
```

2) Configure environment variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Fill in your Supabase values:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

3) Run the dev server

```bash
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production build outputs to `dist/`.

## Deploy to Vercel

- Import the repository into Vercel.
- Framework preset: **Vite** (or “Other”)
- Build command: `npm run build`
- Output directory: `dist`

This repo includes a `vercel.json` that:
- uses the correct build/output settings
- rewrites all routes to `index.html` so React Router works on refresh

## Supabase (backend)

This project uses Supabase for:
- user authentication (email/password)
- database tables (activities, RSVP, profiles)

A minimal starter schema is included in `supabase/schema.sql`.

## Project structure

- `src/pages`: Route pages
- `src/components`: UI and layout components
- `src/integrations/supabase`: Supabase client and types
- `public/assets`: Static images (includes the header logo)

## Notes

- Replace `public/assets/00007.png` with your final logo if needed.
- Governance/policy pages are accessible from the navigation and footer.
