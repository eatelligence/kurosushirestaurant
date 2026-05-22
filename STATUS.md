# Kuro Sushi — Project Status

Last updated: 2026-05-23

## Done

### Foundation
- Next.js 15.5 + React 19 + Tailwind v4 + TypeScript
- Auto-deploy via Vercel on push to `main`
- Accessibility: focus trap drawer, WCAG AA contrast, heading order, preconnect, LCP hint
- Performance: LazyMotion + `m` components (~28KB JS saved), CSS-only hero animations

### Brand restyle (commit `fabf147`)
Black / white / grey monochrome only. **No red, no gold.** Color comes only from food photography.
- Typography: Cormorant Garamond (display) + DM Sans (body), loaded via `next/font` Google.
- Navigation: 4 items — Nosotros · Ubicación · Menú · Galería.

### Pages
- `/` — Hero (centered "KURO" + fish logo + "Sushi Restaurant" subtitle) → DishesStrip (6-photo grid) → Location (B&W map + info)
- `/nosotros` — about page, slimmer copy, 4-value grid (技 / 鮮 / 間 / 黒)
- `/ubicacion` — merge of map + contact info + WhatsApp form (replaces `/contacto`)
- `/galeria` — 12-photo bento grid
- `/menu` — dish list with filter pills
- `/not-found` — minimal 404
- 301 redirects from `/about`, `/contacto`, `/reservations`

### Recent iterations
- Reservations CTAs replaced by "Contáctanos" (client does not take reservations; `acceptsReservations: false` in JSON-LD).
- Hero: eyebrow removed, wordmark recentered, fish logo added under subtitle, bottom-left kanji decoration removed.
- Navbar: text "KURO" replaced by kanji 黒 (mincho font stack).
- Hours updated: Domingo–Miércoles 12:00–22:00 · Jueves–Sábado 12:00–24:00.
- Footer credit: "Proudly powered by Eatelligence · Salvo Rincione".

## Open / to confirm with client

### Brand & content
- Phone `+58 212 555 1234` — placeholder, confirm real number.
- Email `info@kurosushirestaurant.com` — confirm.
- WhatsApp number `582125551234` (in link) — confirm.
- Address "3ra Avenida, Los Palos Grandes / Chacao, Caracas 1060" — confirm.
- Map coordinates `(10.4990, -66.8420)` — confirm against real address.
- Instagram / TikTok handle `@kurosushicaracas` — confirm.

### Photos
- All dish / atmosphere photos are Unsplash placeholders — replace with real restaurant photography when available.
- Logo: current `public/logopesce.jpg` is a JPG using `mix-blend-screen`. A transparent SVG/PNG would be cleaner and scale better (e.g. for use in navbar on smaller screens, social previews, favicon variants).

### Menu data
- Dishes, descriptions and prices in [`lib/constants.ts`](lib/constants.ts) are placeholder/demo — confirm real menu.

### Post-deploy verification
- Confirm hero (logo + kanji navbar) rendering on prod after hard refresh.
- Responsive sanity check below 360px width.
- Optional Lighthouse audit follow-up.

## Not implemented (intentionally)

- Newsletter / email signup
- Online reservations (client doesn't take them)
- CMS / admin panel (static site by design)
- Multi-language (Spanish-only, local Venezuelan market)

## Backup / recovery

Git tags exist for rollback:
- `backup-pre-logo-20260521-092605` — before logo + kanji navbar changes
- `backup-20260523-062040` — current snapshot

Restore with: `git reset --hard <tag>`
