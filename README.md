# Kuro Sushi Restaurant

Sitio oficial de **Kuro Sushi Restaurant** — CC El Patio, Local 6, Los Palos Grandes, Caracas.
Next.js 15 (App Router) con CMS propio sobre Supabase: el cliente edita menú, horarios, galería
y datos de contacto desde `/admin`, sin tocar código.

## Desarrollo local

```bash
npm install
cp .env.local.example .env.local   # y rellenar con los valores reales
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Sin `.env.local` el build **falla**: todas las páginas públicas leen del DB y los getters
lanzan error si Supabase no responde.

### Variables de entorno

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública (RLS aplica) |
| `SUPABASE_SERVICE_ROLE_KEY` | Solo para `scripts/seed.ts`. Nunca en el browser |
| `ADMIN_EMAIL` | Usuario admin creado por el seed |

## Stack

- **Next.js 15** (App Router, TypeScript, React 19)
- **Tailwind CSS v4** — configuración vía `@theme` en `app/globals.css`
- **Supabase** — Postgres + Auth + Storage, con RLS
- **Framer Motion** (LazyMotion + componentes `m`) — animaciones
- **Leaflet** (dinámico, client-only) — mapa con tiles Esri Canvas Dark Gray.
  Sin API key. Las tiles existen hasta z16, por eso `maxNativeZoom: 16`:
  más allá Esri sirve un placeholder claro *"Map data not yet available"*.
  El CSS de Leaflet se importa del paquete, no de un CDN.
- **dnd-kit** — reordenamiento en el admin
- **React Hook Form + Zod**, **sonner** (toasts), **lucide-react** (íconos)

## Estructura

```
app/
  layout.tsx              metadata, fuentes, JSON-LD Restaurant (desde DB)
  page.tsx                home: Hero → DishesStrip → Location
  menu/                   menú con filtros
  nosotros/               historia + 4 valores (技 / 鮮 / 間 / 黒)
  ubicacion/              mapa, contacto y formulario WhatsApp
  galeria/                bento grid
  sitemap.ts robots.ts    SEO
  admin/                  CMS protegido por middleware
components/
  layout/  home/  menu/  public/  admin/
lib/
  supabase/{server,client,public,admin}.ts   clientes
  data/{settings,hours,menu,gallery}.ts      getters cacheados (unstable_cache + tags)
  actions/*.ts                               server actions + revalidate
  constants.ts                               solo navLinks
supabase/migrations/0001_init.sql            esquema, RLS y bucket
scripts/seed.ts                              carga inicial del DB y del usuario admin
```

### Flujo de datos

Público → `lib/data/*` (cache con tag, `revalidate: 60`) → Supabase con rol anónimo.
Admin → `lib/actions/*` → escribe con sesión autenticada y dispara `revalidateTag` /
`revalidatePath`, así el cambio aparece en el sitio público en segundos.

## CMS

`/admin` está protegido por [`middleware.ts`](middleware.ts), que valida la sesión de
Supabase Auth y redirige a `/admin/login?next=…`.

| Ruta | Qué edita |
|---|---|
| `/admin/dashboard` | Resumen y accesos rápidos |
| `/admin/info` | Nombre, contacto, dirección, coordenadas, redes, pagos |
| `/admin/horarios` | Los 7 días, con toggle de cerrado |
| `/admin/banner` | Franja de aviso sobre el navbar (máx. 140 caracteres) |
| `/admin/menu` | Secciones y platos, con reordenamiento y disponibilidad |
| `/admin/galeria` | Subida múltiple, orden, alt y destacados |

> **La galería define la home.** `DishesStrip` muestra las fotos marcadas como **destacadas**
> (`featured`), recortadas a 6. Si no hay ninguna destacada, cae de vuelta a las 6 primeras
> por orden. Ver [`app/page.tsx`](app/page.tsx).

Las imágenes se comprimen en el browser antes de subir (`browser-image-compression`:
máx. 1 MB / 2000 px / webp) y van al bucket `kuro-photos`.

## Identidad visual

- **Monocromo**: negro `#0A0A0A`, blancos y grises. Sin rojo ni oro — el color lo pone
  únicamente la fotografía de los platos.
- Tipografía: Cormorant Garamond (display) + DM Sans (texto), vía `next/font`.
- Wordmark del navbar: kanji 黒 (*kuro*, negro).
- Idioma: español (es-VE), mercado local. Sin multi-idioma.

## Fotografía

Los originales del cliente viven en `SELECCION WEB - KURO/` (ignorada por git, ~1 GB).
Las versiones optimizadas para subir al CMS están en `SELECCION WEB - KURO/_WEB-OPTIMIZADAS/`,
numeradas según el orden sugerido de galería.

Tres imágenes son estáticas y viven en el repo, porque no salen del DB:

| Archivo | Dónde se usa |
|---|---|
| `public/images/salon-mesa.webp` | Retrato 4:5 en `/nosotros` |
| `public/images/atmosfera.webp` | Franja full-bleed en `/nosotros` |
| `public/images/og-cover.jpg` | Open Graph / Twitter card |

Para regenerar desde un original:

```bash
cwebp -q 82 -m 6 -resize 0 2000 origen.jpg -o destino.webp
```

## Despliegue

Auto-deploy en Vercel al hacer push a `main`. `vercel.json` fija la región `iad1` y las
cabeceras de seguridad. Las variables de entorno se configuran en el dashboard de Vercel.

---

© Kuro Sushi Restaurant · Los Palos Grandes, Caracas.
