# Kuro Sushi — Project Status

Last updated: 2026-09-01

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
- Navbar wordmark: kanji 黒 (mincho stack).

### Public pages
- `/` — Hero (KURO wordmark + fish logo + "Sushi Restaurant") → DishesStrip (featured photos) → Location (B&W map + info)
- `/nosotros` — about page, slimmer copy, 4-value grid (技 / 鮮 / 間 / 黒)
- `/ubicacion` — map + contact info + WhatsApp form (replaces `/contacto`)
- `/galeria` — bento grid of photos
- `/menu` — sections + dishes with filter pills, "Agotado" label for unavailable
- `/not-found` — minimal 404
- 301 redirects from `/about`, `/contacto`, `/reservations`
- ISR `revalidate=60` on all public routes; on-demand `revalidatePath` from admin saves → updates appear in seconds.
- `<SiteBanner />` strip above Navbar when `banner_active=true`.
- JSON-LD `Restaurant` schema generated dynamically from DB.

### Fotografía real y SEO (2026-09-01)
El cliente entregó 59 fotos profesionales (`SELECCION WEB - KURO/`, ~1.1 GB, ignorada por git).
- Convertidas a webp 2000px/q80 → 14 MB totales. Set curado de 27 en `_WEB-OPTIMIZADAS/`,
  numerado según el orden sugerido de galería (las 6 primeras van marcadas `featured`, que es
  lo que `DishesStrip` muestra en la home; sin destacadas cae a las 6 primeras por `sort`).
- Reemplazadas las 3 imágenes Unsplash hardcodeadas por assets locales:
  `public/images/{salon-mesa.webp, atmosfera.webp, og-cover.jpg}`.
- Ya no queda ninguna referencia a `images.unsplash.com` en el código.
- Iconos: `public/icon-{32,180,512}.png` generados desde el logo del pez.
  Eliminado `public/favicon.svg`, que era la "K" roja de la marca anterior.
- Añadidos `app/sitemap.ts` y `app/robots.ts` (el segundo excluye `/admin`).
- `preconnect` apunta ahora al Storage de Supabase en vez de a Unsplash.

**Nota de dirección de arte**: las fotos 37–55 están sobre granito cobrizo con luz ámbar y
rompen el monocromo. Quedaron fuera del set curado.

### CMS — Supabase-backed admin (commit `f70c568`)
All editable content moved from `lib/constants.ts` to Supabase. Static `lib/constants.ts` now holds only `navLinks`.

**Infra**
- Supabase project `akskncluulypikjywzml`, org `imiliswmimdyrrcxegdl` (region: **ap-southeast-1 / Singapore**, free tier)
  - ⚠️ Free tier **auto-pausa** el proyecto tras inactividad. Cuando pasa a `INACTIVE` el DB deja de
    responder: hay que hacer *Restore* desde el dashboard. Ya ocurrió una vez (2026-09-01).
- Schema: `restaurant_settings` (single row), `opening_hours` (7 rows), `menu_sections`, `menu_items`, `gallery_photos`, `audit_log`
- RLS: public SELECT, authenticated INSERT/UPDATE/DELETE
- Storage bucket `kuro-photos` (public read, authenticated write)
- Auth: Supabase Auth email+password, single admin user

**Code structure**
- `lib/supabase/{server,client,public,admin}.ts` — clients (cookie-based for SSR, cookie-less for cached reads, service-role for seed)
- `lib/data/{settings,hours,menu,gallery}.ts` — cached getters with `unstable_cache` + tags
- `lib/actions/{settings,hours,menu,gallery,auth}.ts` — server actions with `revalidatePath`/`revalidateTag`
- `middleware.ts` — gates `/admin/*` via Supabase Auth session check
- `scripts/seed.ts` — one-shot seed of DB + admin user

**Admin pages** (all Spanish, palette matches public site)
- `/admin/login` — email+password, redirects to `?next`
- `/admin/dashboard` — counts + quick links + banner status
- `/admin/info` — full restaurant settings (name, contact, address, coords, social, payments)
- `/admin/horarios` — 7-day grid with closed toggle and time pickers
- `/admin/banner` — text + active toggle with live preview (max 140 chars)
- `/admin/menu` — sections list with dnd-kit reorder + new-section form
- `/admin/menu/[sectionId]` — section edit + items list with inline edit, availability toggle, dnd reorder, delete confirm
- `/admin/galeria` — multi-upload with `browser-image-compression` (max 1MB / 2000px / webp), Supabase Storage, dnd reorder, alt edit, featured toggle, delete

**Deps added**: `@supabase/{supabase-js,ssr}`, `@dnd-kit/{core,sortable}`, `browser-image-compression`, `sonner`; dev: `tsx`, `dotenv`.

## Open / to-do

### Security (do soon)
- **Rotate `SUPABASE_SERVICE_ROLE_KEY`** — Supabase Dashboard → Settings → API → Reset → update on Vercel. The current key was pasted in a chat transcript.
- **Change admin password** — Supabase Auth → Users → reset password (initial temp password was used in setup).

### Confirmed real (no longer placeholder)
- Phone `+58 412 685 0612` and WhatsApp number `584126850612`
- Email `info@kurosushirestaurant.com`
- Address "CC El Patio, Local 6 — Los Palos Grandes, Caracas"
- Map coords `lat 10.49465, lng -66.85017`
- Hours: Domingo–Miércoles 12:00–22:00 · Jueves–Sábado 12:00–24:00

### Still placeholder (now editable from /admin)
- Social handles `@kurosushicaracas` (Instagram, TikTok)
- **Galería**: el DB sigue con stock de Unsplash. Falta subir las 27 fotos de
  `SELECCION WEB - KURO/_WEB-OPTIMIZADAS/`, en orden numérico, marcando las 6 primeras
  como destacadas, y borrar las 12 de stock de Unsplash.
- Menu items, descriptions and prices were seeded as demo — client to edit via `/admin/menu`
- Logo `public/logopesce.jpg` sigue siendo un JPG con `mix-blend-screen`. Los iconos PNG ya
  están generados, pero un SVG con transparencia del cliente sería mejor.

### Robustez (no implementado, decidido posponer)
- Los getters de `lib/data/*` hacen `throw` si Supabase no responde, así que **un deploy con el
  DB pausado falla en build** en vez de servir contenido stale. Un fallback degradado evitaría
  que una pausa del free tier tumbe el despliegue.

### Post-deploy verification
- Confirm CMS save → public update propagation under 10s (test by changing a price).
- Responsive sanity check below 360px on admin pages.
- Optional Lighthouse audit follow-up.

## Not implemented (intentionally)

- Newsletter / email signup
- Online reservations (client doesn't take them)
- Multi-language (Spanish-only, local Venezuelan market)
- Multi-role auth (single admin for v1; RLS ready to extend)

## Backup / recovery

Git tags exist for rollback:
- `backup-pre-logo-20260521-092605` — before logo + kanji navbar changes
- `backup-20260523-062040` — pre-content-updates snapshot
- `backup-pre-cms-20260527-100240` — pre-CMS snapshot
- `backup-cms-live-20260527-105342` — CMS live and verified

Restore with: `git reset --hard <tag>`
