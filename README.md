# The Grand Masters 2026

Next.js site for The Grand Masters summit series. It shares the Laravel
"LW Events" API and project structure with the BFLS site
([techmistriz/bfls-fe](https://github.com/techmistriz/bfls-fe)).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the API and asset URLs
npm run dev:local            # or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | What it does                              |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Next.js dev server                        |
| `npm run dev:local` | Dev server with `.env.local`              |
| `npm run dev:live`  | Dev server with `.env.live`               |
| `npm run build`     | Production build                          |
| `npm run start`     | Serve the production build                |
| `npm run check`     | Typecheck, lint and Prettier (pre-commit) |

## Structure

```
src/
  app/            routes (App Router); pages that need the browser use a *Client.tsx
  components/
    layout/       Header, Footer
    sections/     homepage sections
    common/       shared widgets (sidebar, sponsor carousel, city picker, ...)
  config/         API URLs, event type, feature flags
  data/           static content
  hooks/          data hooks (useEvents, useCart, ...)
  network/        axios instance + cart token
  services/       API calls
  types/, utils/
```

`src/config/event.ts` toggles `registrationOpen` (Register Now vs Summit
Gallery CTAs). `src/config/eventType.config.ts` holds the event type id sent
to the API (Grand Masters = 1).
