# Kuro Sushi Restaurant

Sitio oficial de **Kuro Sushi Restaurant** — Los Palos Grandes, Caracas.
Construido con Next.js 15, Tailwind CSS v4 y Framer Motion.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4** (configuración via `@theme` en `globals.css`)
- **Framer Motion** — animaciones
- **Lucide React** — íconos
- **React Hook Form + Zod** — formulario de reservaciones
- **Leaflet** (carga dinámica client-only) — mapa con tiles CARTO dark

## Estructura

```
app/
  layout.tsx          metadata, fuentes, JSON-LD Schema.org
  page.tsx            homepage
  menu/page.tsx       menú completo con filtro sticky
  about/page.tsx      historia
  reservations/page.tsx
  not-found.tsx       404 a medida
components/
  layout/             Navbar, Footer, WhatsAppButton
  home/               Hero, Philosophy, FeaturedDishes, Experience,
                      Testimonials, Location (+ LocationMap), InstagramFeed
  menu/               MenuCategory, DishCard
  ui/                 Button, SectionHeader
lib/constants.ts      datos del restaurante + menú completo
```

## Despliegue (Vercel)

```bash
vercel
```

`vercel.json` ya está configurado.

## Identidad visual

- Paleta dominante: negro (`#0A0A0A`), rojo japonés (`#C0392B`), oro cálido (`#C9A96E`).
- Tipografía: Cormorant Garamond (display) + DM Sans (texto).
- Idioma principal: español (es-VE).

---

© Kuro Sushi Restaurant · Los Palos Grandes, Caracas.
