# KURO SUSHI RESTAURANT — Claude Code Prompt
## Website Development Brief: kurosushirestaurant.com

---

> **HOW TO USE THIS PROMPT**
> Copy everything below the divider line and paste it into Claude Code.
> This prompt is self-contained and gives Claude Code all the context it needs.

---

---

# BUILD THE KURO SUSHI RESTAURANT WEBSITE

## Project Overview

You are building the official website for **Kuro Sushi Restaurant**, located in **Los Palos Grandes, Caracas, Venezuela** (domain: `kurosushirestaurant.com`).

"Kuro" means **black** in Japanese — this is the conceptual anchor of the entire visual identity: darkness, precision, elegance, mystery. The restaurant is positioned as a **mid-premium Japanese restaurant** in one of Caracas's most vibrant gastronomic neighborhoods, targeting a class A/B clientele aged 25–45, digital-native, USD-spending.

This must be the **finest restaurant website in all of Caracas** — an art piece that communicates quality before a single dish arrives at the table. Every competitor in the Caracas sushi market (Bonsai, Omono, Taiko, Sushi Market, Hiromi) has a mediocre web presence. This site is the competitive weapon.

---

## Market Context (inform all design decisions)

- **Location:** Los Palos Grandes, Caracas — safe, walkable, cosmopolitan neighborhood; the historic birthplace of Caracas's sushi culture (Sushi Market opened here in 1998)
- **Target customer:** 25–45 years old, class A/B, income in USD, heavy Instagram/TikTok user, values aesthetics and experience over price
- **Competitors' weakness:** zero have a professional website; most rely purely on Instagram; none have a coherent brand system
- **Device reality:** 90%+ of Venezuelan internet traffic is mobile → mobile-first is non-negotiable
- **Language:** Spanish primary (Venezuelan market), English secondary (expat community: diplomats, NGO workers, international business)
- **Pricing context:** $12–30 per person; USD and Zelle payments accepted
- **Key neighborhood:** Los Palos Grandes — walkable, upscale, high foot traffic, close to Altamira and La Castellana

---

## Tech Stack

Use **Next.js 15** (App Router) with the following:

```
Framework:     Next.js 15 (App Router, TypeScript)
Styling:       Tailwind CSS v4
Animations:    Framer Motion
Icons:         Lucide React
Fonts:         Google Fonts — Cormorant Garamond (headings) + DM Sans (body)
Images:        Next/Image with blur placeholder
Forms:         React Hook Form + Zod validation
Maps:          Leaflet.js (open source, no API key needed)
Deployment:    Vercel-ready (vercel.json included)
```

### Project Structure
```
kuro-sushi/
├── app/
│   ├── layout.tsx          (root layout, fonts, metadata)
│   ├── page.tsx            (homepage)
│   ├── menu/
│   │   └── page.tsx        (full menu page)
│   ├── about/
│   │   └── page.tsx        (our story)
│   └── reservations/
│       └── page.tsx        (reservations page)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Philosophy.tsx
│   │   ├── FeaturedDishes.tsx
│   │   ├── Experience.tsx
│   │   ├── Testimonials.tsx
│   │   └── InstagramFeed.tsx
│   ├── menu/
│   │   ├── MenuCategory.tsx
│   │   └── DishCard.tsx
│   └── ui/
│       ├── Button.tsx
│       └── SectionHeader.tsx
├── public/
│   └── images/             (placeholder images via Unsplash URLs)
├── lib/
│   └── constants.ts        (menu data, restaurant info)
├── tailwind.config.ts
├── next.config.ts
└── vercel.json
```

---

## Design System

### Color Palette

```css
/* CORE IDENTITY — "Kuro" = Black */
--kuro-black:     #0A0A0A;   /* near-black, primary background */
--kuro-obsidian:  #111111;   /* card backgrounds */
--kuro-charcoal:  #1C1C1C;   /* elevated surfaces */
--kuro-smoke:     #2A2A2A;   /* borders, dividers */

/* ACCENT — Japanese Red */
--kuro-red:       #C0392B;   /* primary accent, CTAs, active states */
--kuro-red-light: #E74C3C;   /* hover states */
--kuro-red-muted: #7D241A;   /* subtle accent */

/* WARM NEUTRALS */
--kuro-cream:     #F5F0E8;   /* primary text on dark */
--kuro-ivory:     #E8DDD0;   /* secondary text */
--kuro-stone:     #9E9189;   /* muted text, captions */
--kuro-sand:      #C9B99A;   /* decorative, borders */

/* GOLD — premium touch */
--kuro-gold:      #C9A96E;   /* price tags, premium labels */
```

### Typography

```css
/* HEADINGS — Cormorant Garamond */
/* Evokes Japanese calligraphy, high fashion, editorial luxury */
font-family: 'Cormorant Garamond', Georgia, serif;
/* Weights used: 300 (light), 400 (regular), 600 (semibold) */
/* Always tracked (letter-spacing): 0.05em–0.15em for display sizes */

/* BODY — DM Sans */
/* Clean, modern, highly legible on mobile */
font-family: 'DM Sans', system-ui, sans-serif;
/* Weights: 300, 400, 500 */

/* ACCENT / LABELS — DM Sans uppercase tracked */
/* For category labels, section markers, price tags */
font-family: 'DM Sans';
text-transform: uppercase;
letter-spacing: 0.2em;
font-size: 11px;
font-weight: 500;
```

### Typography Scale
```
Display (hero):     clamp(52px, 8vw, 96px)  Cormorant 300 italic
H1:                 clamp(36px, 5vw, 64px)   Cormorant 400
H2:                 clamp(28px, 3.5vw, 44px) Cormorant 400
H3:                 clamp(20px, 2.5vw, 28px) Cormorant 300
Body large:         18px                      DM Sans 300
Body:               16px                      DM Sans 400
Caption/Label:      11–12px                   DM Sans 500 uppercase tracked
```

### Spacing & Layout
```
Max content width:  1280px
Section padding:    py-24 md:py-32 lg:py-40
Content gutter:     px-6 md:px-12 lg:px-20
Grid gap:           gap-6 md:gap-8 lg:gap-12
```

### Motion Design Principles

Use **Framer Motion** throughout. All animations must feel deliberate and elegant — never bouncy, never fast.

```javascript
// Standard page entrance
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
}

// Stagger children
const stagger = {
  animate: { transition: { staggerChildren: 0.12 } }
}

// Reveal on scroll — use Framer Motion's whileInView
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-80px" }}

// Image reveal — clip path wipe from bottom
const imageReveal = {
  initial: { clipPath: "inset(100% 0 0 0)" },
  animate: { clipPath: "inset(0% 0 0 0)" },
  transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
}
```

---

## Pages & Components — Detailed Specifications

---

### 1. ROOT LAYOUT (app/layout.tsx)

```typescript
// Metadata
title: "Kuro Sushi Restaurant | Los Palos Grandes, Caracas"
description: "Gastronomía japonesa contemporánea en el corazón de Los Palos Grandes. Reserva tu mesa en Kuro Sushi."
keywords: "sushi Caracas, restaurante japonés Caracas, sushi Los Palos Grandes, mejor sushi Caracas, kuro sushi"
openGraph: full og tags with restaurant image
```

- Dark scrollbar: `scrollbar-color: #C0392B #0A0A0A`
- Smooth scroll: `scroll-behavior: smooth`
- Selection color: `::selection { background: #C0392B; color: #F5F0E8; }`
- Custom cursor: small 8px circle `background: #C0392B`, grows to 40px on hover over clickable elements (desktop only)
- Body background: `#0A0A0A`

---

### 2. NAVBAR (components/layout/Navbar.tsx)

**Behavior:**
- Starts fully transparent over the hero
- After scrolling 80px: transitions to `background: rgba(10,10,10,0.92)` with `backdrop-filter: blur(20px)` and a 1px bottom border `border-color: rgba(201,169,110,0.15)` (subtle gold)
- Transition: `transition: all 0.4s ease`
- On mobile: hamburger menu with full-screen overlay (black, slides from right)

**Desktop layout:**
```
[KURO]                [Menu  Storia  Prenotazioni]  [Prenota ora →]
 logo left             nav links center              CTA button right
```

**Logo:** Text-based. "KURO" in Cormorant Garamond 400, `letter-spacing: 0.3em`, `font-size: 22px`, color: `#F5F0E8`. Below it, in DM Sans 300 uppercase 9px tracked: "SUSHI RESTAURANT".

**Nav links:** DM Sans 400, 13px, uppercase, letter-spacing 0.15em, color: `#9E9189`. On hover: color `#F5F0E8` with a 1px `#C0392B` underline that slides in from left.

**CTA Button:** "Reservar" — outlined style. Border: `1px solid #C0392B`. Text: `#C0392B`. On hover: `background: #C0392B`, text: `#F5F0E8`. Transition 0.3s.

**Mobile nav overlay:**
- Full screen black background
- Links stacked vertically in Cormorant Garamond 40px
- Social links at bottom
- Closes on link click or X button

---

### 3. HERO (components/home/Hero.tsx)

This is the most important section. It must be breathtaking.

**Structure:** Full viewport height (`100svh`). Dark background with a high-quality food photograph.

**Background image:** Use an Unsplash image of premium sushi/Japanese food. URL to use:
`https://images.unsplash.com/photo-1553621042-f6e147245754?w=1920&q=90`
(high-quality sushi photo, free license)

Overlay: `linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.1) 40%, rgba(10,10,10,0.7) 85%, rgba(10,10,10,1) 100%)`

**Content — centered, bottom-third of viewport:**

```
[Label]      GASTRONOMÍA JAPONESA  ·  LOS PALOS GRANDES
             (DM Sans, 11px, uppercase, tracked, #C9A96E, with decorative lines on sides)

[Headline]   El arte de                    (Cormorant 300 italic, display size)
             lo oscuro                     (Cormorant 300 italic, display size, in #C0392B)

[Subheading] Sushi contemporáneo en el    (DM Sans 300, 18px, #9E9189)
             corazón de Caracas

[CTAs]       [Reservar mesa]  [Ver menú]
             (primary red btn)  (ghost btn)

[Scroll indicator]  ↓  "Desliza"  (animates up-down, fades in after 2s)
```

**Animation sequence (on load):**
1. 0.0s: Background image fades in (0 → 1, duration 1.5s)
2. 0.6s: Label slides up + fades in
3. 0.9s: Headline line 1 slides up + fades in (stagger 0.15s per word)
4. 1.1s: Headline line 2 (red text) slides up + fades in
5. 1.4s: Subheading fades in
6. 1.7s: CTAs fade in
7. 2.5s: Scroll indicator appears

**Decorative element:** Thin horizontal line, `width: 1px`, `height: 80px`, `background: linear-gradient(to bottom, transparent, #C9A96E, transparent)`, centered above the label. Animate: clip-path from top to bottom on load.

---

### 4. PHILOSOPHY STRIP (components/home/Philosophy.tsx)

A full-width section between hero and dishes. Dark background (`#111111`).

**Three pillars in a horizontal row (3-col grid, responsive to 1-col):**

```
|      MA (間)       |    UMAMI (旨味)    |    SHOKUNIN (職人)  |
|  The Japanese art  |  The fifth taste   |  The master      |
|  of negative space |  of depth          |  craftsman       |
|                    |                    |                  |
|  We believe great  |  Every ingredient  |  Behind each     |
|  sushi begins with |  is selected at    |  roll: years of  |
|  silence: the      |  peak season,      |  practice, the   |
|  space between     |  prepared to       |  discipline of   |
|  flavors.          |  reveal its true   |  tradition.      |
|                    |  essence.          |                  |
```

Each pillar:
- Japanese character: Cormorant Garamond italic, 52px, `#C0392B`, centered
- Word (romanization): DM Sans uppercase 10px tracked, `#9E9189`
- Divider: 1px `#2A2A2A` horizontal line
- Body text: DM Sans 300, 15px, `#9E9189`, line-height 1.8

Animate: each pillar fades up with stagger 0.2s on scroll enter.

---

### 5. FEATURED DISHES (components/home/FeaturedDishes.tsx)

**Heading section:**
```
[label]     NUESTRAS CREACIONES
[H2]        Rolls que cuentan historias
[body]      Cada pieza es una decisión. Cada ingrediente, una convicción.
```

**Layout:** Asymmetric grid. 4 dishes displayed:

```
[ LARGE DISH — 2/3 width ]  [ SMALL DISH — 1/3 width ]
[ SMALL DISH — 1/3 width ]  [ LARGE DISH — 2/3 width ]
```

**Each dish card:**
- Full-bleed image (Next/Image, aspect ratio maintained)
- On hover: image scales to 1.05x (transform, overflow hidden)
- Bottom overlay gradient: text reveals on hover (desktop) / always visible (mobile)
- Content on card:
  - Category label (DM Sans uppercase, 10px, `#C9A96E`)
  - Dish name (Cormorant 400, 24px, `#F5F0E8`)
  - Brief description (DM Sans 300, 13px, `#9E9189`)
  - Price: `$XX` (Cormorant italic, 20px, `#C9A96E`)

**Dish data (use Unsplash images):**
```javascript
const dishes = [
  {
    name: "Kuro Dragon Roll",
    category: "Signature",
    description: "Langostino tempura, aguacate, salsa negra de tinta de calamar",
    price: "$18",
    image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800&q=80"
  },
  {
    name: "Omakase Nigiri",
    category: "Chef's Selection",
    description: "8 piezas seleccionadas por el chef. Varía según el mercado",
    price: "$24",
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&q=80"
  },
  {
    name: "Toro Tataki",
    category: "Clásicos",
    description: "Atún de aleta azul sellado, aceite de trufa, reducción de ponzu",
    price: "$22",
    image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=800&q=80"
  },
  {
    name: "Sake Aburi",
    category: "Maki Especial",
    description: "Salmón flameado, cream cheese ahumado, ikura, cebollín",
    price: "$16",
    image: "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=800&q=80"
  }
]
```

**CTA below grid:** "Explorar menú completo →" — outlined button, centered.

---

### 6. EXPERIENCE SECTION (components/home/Experience.tsx)

**Full-width dark section with a side-by-side layout:**

Left (60%): Large image — restaurant interior ambiance
`https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&q=80`

Right (40%): Text content
```
[label]    LA EXPERIENCIA KURO
[H2]       Más que una cena.
           Una memoria.
[body]     En Kuro hemos diseñado cada detalle:
           la penumbra cálida, la música que
           no interfiere, la distancia entre
           mesas que permite la conversación.
           
           El sushi es el protagonista.
           Todo lo demás, su marco.

[stats row]
  23+        4.9★        $12-30
  variedades  valoración   por persona
  en menú    promedio     desde
```

Stats: number in Cormorant italic 40px `#C9A96E`, label in DM Sans 10px uppercase `#9E9189`.

**Image reveal animation:** clip-path wipe from bottom when scrolled into view.

---

### 7. TESTIMONIALS (components/home/Testimonials.tsx)

Background: `#111111`. Subtle texture: very faint repeating pattern of tiny dots (`background-image: radial-gradient(#1C1C1C 1px, transparent 1px); background-size: 20px 20px;`).

**Large quote display** — one testimonial at a time with fade transition (auto-advance every 5s, or manual arrows):

```
        "               (oversized quote mark, Cormorant, 120px, #C0392B, opacity 0.3)
        
  El mejor sushi que he probado en Caracas.
  Una experiencia que no esperaba encontrar aquí.
  Volveré cada semana.
  
                    — María González, Los Palos Grandes
                    ★ ★ ★ ★ ★
```

Testimonials data:
```javascript
const testimonials = [
  {
    text: "El mejor sushi que he probado en Caracas. Una experiencia que no esperaba encontrar aquí. Volveré cada semana.",
    author: "María González",
    location: "Los Palos Grandes",
    rating: 5
  },
  {
    text: "El Kuro Dragon Roll es una obra maestra. El ambiente es perfecto para una cena romántica. Superó todas mis expectativas.",
    author: "Carlos Mendoza",
    location: "Altamira"
  },
  {
    text: "Como japonés viviendo en Caracas, este restaurante me recuerda a casa. La calidad del pescado y la técnica son excepcionales.",
    author: "Kenji Tanaka",
    location: "Expat community"
  },
  {
    text: "Vine por el omakase y me quedé sin palabras. El chef explica cada pieza. Una experiencia gastronómica completa.",
    author: "Valentina Ríos",
    location: "La Castellana"
  }
]
```

Navigation: Left/right arrows (minimal, `#9E9189` color) + dot indicators below.

---

### 8. LOCATION SECTION (components/home/Location.tsx)

**Two column layout:**

Left (50%): Info
```
[label]   ENCUÉNTRANOS
[H2]      En el corazón de
          Los Palos Grandes

[body]    Estamos en la 3ra Avenida de
          Los Palos Grandes, a una cuadra
          del parque. Fácil acceso y
          estacionamiento disponible.

[info list]
  📍  3ra Avenida, Los Palos Grandes
      Chacao, Caracas 1060

  ⏰  Lunes — Jueves    12:00 — 23:00
      Viernes — Sábado  12:00 — 01:00
      Domingo           12:00 — 22:00

  📞  +58 212 XXX XXXX
      WhatsApp disponible

  💳  Efectivo USD · Zelle · Pago Móvil
```

Right (50%): Interactive map using **Leaflet.js**
- Dark tile layer: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`
- Center: Los Palos Grandes coordinates (10.4910° N, 66.8490° W)
- Zoom level: 15
- Custom marker: red circle with "K" letter
- Map container: `border-radius: 12px`, `border: 1px solid #2A2A2A`

---

### 9. INSTAGRAM FEED STRIP (components/home/InstagramFeed.tsx)

**Horizontal scrolling strip** of 8 square images (simulated Instagram feed using Unsplash food photos):

```
[@kurosushicaracas]      [Follow us on Instagram →]
(DM Sans 13px, gold)     (outlined button)

[ img ] [ img ] [ img ] [ img ] [ img ] [ img ] [ img ] [ img ]
(horizontal scroll, touch-friendly, infinite loop on desktop)
```

Images fade in on scroll. On hover: subtle red overlay with Instagram icon.

Use these Unsplash URLs:
```javascript
const igImages = [
  "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80",
  "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&q=80",
  "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&q=80",
  "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=400&q=80",
  "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80",
  "https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?w=400&q=80",
  "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80",
  "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=400&q=80"
]
```

---

### 10. FOOTER (components/layout/Footer.tsx)

Background: `#000000` (pure black). Top border: 1px `#C9A96E` with 30% opacity.

**Layout:**
```
[Logo + tagline]    [Quick links]    [Horarios]      [Social]
KURO               Menú             L-J 12-23h       Instagram
SUSHI RESTAURANT   Nuestra Historia  V-S 12-01h       TikTok
                   Reservaciones    Dom 12-22h        WhatsApp
"El arte japonés   Contacto
en el corazón                       📞 +58 212 XXX
de Caracas"                         📧 info@kuro...

—————————————————————————————————————————————————————————
© 2025 Kuro Sushi Restaurant · Los Palos Grandes, Caracas · Todos los derechos reservados
```

---

### 11. MENU PAGE (app/menu/page.tsx)

**Hero:** Short hero with background image + overlay. Headline: "Nuestra Carta" in Cormorant 64px.

**Filter bar:** Sticky filter below hero with category pills:
```
[Todos] [Rolls Clásicos] [Rolls Especiales] [Nigiri & Sashimi] [Entradas] [Sopas & Arroz] [Postres] [Bebidas]
```
Active state: `background: #C0392B`, text `#F5F0E8`. Inactive: transparent, border `#2A2A2A`.

**Menu sections:** Each section has:
- Section title: Cormorant 40px + small kanji character in muted red
- Grid: 2-col on desktop, 1-col on mobile

**Each dish card:**
```
[ Optional image thumbnail, 80x80px, rounded ]
[ Dish name — Cormorant 22px ]
[ Description — DM Sans 300, 13px, stone color ]
[ Allergen icons if applicable ]                    [ $XX ]
```

Subtle divider line between dishes.

**Full menu data (lib/constants.ts):**
```typescript
export const menuData = {
  rollsClasicos: [
    { name: "California Roll", desc: "Cangrejo, aguacate, pepino, tobiko", price: 12, spicy: false },
    { name: "Spicy Tuna Roll", desc: "Atún picante, pepino, sriracha mayo", price: 14, spicy: true },
    { name: "Philadelphia Roll", desc: "Salmón, cream cheese, pepino", price: 13, spicy: false },
    { name: "Dragon Roll", desc: "Langostino tempura, aguacate, anguila", price: 16, spicy: false },
    { name: "Rainbow Roll", desc: "California roll cubierto con 5 pescados", price: 18, spicy: false },
  ],
  rollsEspeciales: [
    { name: "Kuro Dragon Roll", desc: "Langostino tempura, aguacate, salsa negra de tinta de calamar, tobiko negro", price: 18, signature: true },
    { name: "Caracas Roll", desc: "Atún, aguacate, plátano frito caramelizado, salsa teriyaki", price: 17, signature: true },
    { name: "Sake Aburi", desc: "Salmón flameado, cream cheese ahumado, ikura, cebollín", price: 16, spicy: false },
    { name: "Rock Shrimp Tempura", desc: "Camarones crocantes, spicy mayo, pepino", price: 15, spicy: true },
    { name: "Truffle Toro", desc: "Atún graso, aceite de trufa, láminas de oro comestible", price: 28, signature: true },
  ],
  nigiriSashimi: [
    { name: "Nigiri Salmón (2 pzas)", desc: "Salmón fresco premium sobre arroz de sushi", price: 9 },
    { name: "Nigiri Atún (2 pzas)", desc: "Atún rojo sobre arroz de sushi", price: 11 },
    { name: "Nigiri Camarón (2 pzas)", desc: "Camarón cocinado, arroz de sushi", price: 8 },
    { name: "Sashimi de Salmón (5 pzas)", desc: "Láminas de salmón premium, sin arroz", price: 16 },
    { name: "Sashimi Mixto (8 pzas)", desc: "Selección del chef: atún, salmón, pez blanco", price: 24 },
    { name: "Omakase Nigiri (8 pzas)", desc: "Selección del chef según el mercado del día", price: 28, signature: true },
  ],
  entradas: [
    { name: "Edamame", desc: "Vainas de soya al vapor con sal marina", price: 6 },
    { name: "Gyoza (6 pzas)", desc: "Empanadillas japonesas de cerdo y vegetales, salsa ponzu", price: 9 },
    { name: "Agedashi Tofu", desc: "Tofu frito en caldo dashi con cebollín y katsuobushi", price: 8 },
    { name: "Tempura Mixta", desc: "Selección de vegetales y langostinos en tempura ligera", price: 12 },
    { name: "Toro Tataki", desc: "Atún flameado, aceite de trufa, reducción ponzu, jalapeño", price: 22 },
  ],
  sopaArroz: [
    { name: "Ramen Tonkotsu", desc: "Caldo de hueso de cerdo 18h, chashu, huevo ajitsuke, nori", price: 14 },
    { name: "Miso Soup", desc: "Caldo miso tradicional, tofu, alga wakame, cebollín", price: 6 },
    { name: "Chirashi Don", desc: "Bol de arroz de sushi con sashimi mixto y vegetales", price: 22 },
    { name: "Chahan", desc: "Arroz frito japonés, huevo, cebollín, salsa de soya", price: 10 },
  ],
  postres: [
    { name: "Mochi Ice Cream (3 pzas)", desc: "Helado japonés: matcha, mango, fresa", price: 9 },
    { name: "Tempura de Plátano", desc: "Plátano en tempura, helado de vainilla, miel de jengibre", price: 8 },
    { name: "Cheesecake de Matcha", desc: "Tarta japonesa de queso con matcha ceremonial", price: 10 },
  ],
  bebidas: [
    { name: "Sake Caliente / Frío", desc: "Selección de sake premium japonés", price: 12 },
    { name: "Cerveza Sapporo", desc: "Cerveza japonesa importada", price: 6 },
    { name: "Matcha Latte", desc: "Matcha ceremonial con leche de avena", price: 7 },
    { name: "Limonada de Jengibre", desc: "Limonada artesanal con raíz de jengibre fresco", price: 6 },
    { name: "Agua Mineral", desc: "Con o sin gas", price: 4 },
  ]
}
```

**Bottom CTA:** "¿Tienes alguna pregunta sobre el menú? Escríbenos por WhatsApp" → green WhatsApp button.

---

### 12. RESERVATIONS PAGE (app/reservations/page.tsx)

**Layout:** Two columns — Form left (60%), Info right (40%).

**Form fields:**
```
Nombre completo*          [________________]
Correo electrónico*       [________________]
Número de WhatsApp*       [________________]
Fecha deseada*            [date picker]
Hora preferida*           [12:00 / 13:00 / ... / 22:00 dropdown]
Número de personas*       [1 / 2 / 3-4 / 5-6 / 7+]
Ocasión especial          [Ninguna / Cumpleaños / Aniversario / Cena de negocios / Otro]
Peticiones especiales     [textarea, optional]

[Solicitar Reservación →]  (full-width red button)
```

Validation: React Hook Form + Zod. Real-time inline validation errors.

On submit: `mailto:reservas@kurosushirestaurant.com` with pre-filled subject line and body, OR a simple success state showing "¡Reservación recibida! Te contactaremos por WhatsApp en menos de 2 horas para confirmar."

**Right panel info:**
- Hours
- Policies: "Reservamos mesas hasta 20 min después de la hora. Grupos de 7+ requieren reserva mínima 48h antes."
- WhatsApp direct link: `https://wa.me/58212XXXXXXX?text=Hola,%20quiero%20hacer%20una%20reservaci%C3%B3n`
- "Eventos privados" section with email contact

---

### 13. ABOUT / NUESTRA HISTORIA PAGE (app/about/page.tsx)

**Hero:** Full-width image of kitchen/chef hands. Minimal text overlay: "Nuestra Historia".

**Content sections:**

**Section 1: Origin story**
Large full-bleed text paragraph, Cormorant 24px, line-height 1.9:
```
"Kuro nació de una convicción simple:
que el mejor sushi del mundo puede prepararse
en Caracas, si se tiene la obsesión correcta."
```
Attribute to: "— El equipo de Kuro, 2024"

**Section 2: Grid with 3 value columns** (same format as Philosophy)

**Section 3: The team** (optional — chef photo placeholder + name/title)

**Section 4: Full-width ambient photo** with parallax scroll effect

---

## Performance & SEO Requirements

### Performance
```
Lighthouse target: 95+ on all metrics
Images:            All via Next/Image with WebP + blur placeholder
Fonts:             next/font/google (zero layout shift)
Code splitting:    Automatic via App Router
Lazy loading:      All below-fold images
```

### SEO (app/layout.tsx metadata)
```typescript
export const metadata: Metadata = {
  title: {
    default: "Kuro Sushi Restaurant | Los Palos Grandes, Caracas",
    template: "%s | Kuro Sushi"
  },
  description: "El mejor sushi de Caracas en Los Palos Grandes. Gastronomía japonesa contemporánea, rolls de autor y experiencia premium. Reserva tu mesa.",
  keywords: ["sushi Caracas", "restaurante japonés Caracas", "sushi Los Palos Grandes", "mejor sushi Venezuela", "kuro sushi", "omakase Caracas"],
  openGraph: {
    type: "restaurant",
    locale: "es_VE",
    url: "https://kurosushirestaurant.com",
    siteName: "Kuro Sushi Restaurant",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }]
  },
  robots: { index: true, follow: true },
}
```

### Schema.org structured data
Include JSON-LD in layout:
```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Kuro Sushi Restaurant",
  "servesCuisine": "Japanese",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3ra Avenida, Los Palos Grandes",
    "addressLocality": "Caracas",
    "addressCountry": "VE"
  },
  "openingHours": ["Mo-Th 12:00-23:00", "Fr-Sa 12:00-01:00", "Su 12:00-22:00"],
  "telephone": "+58212XXXXXXX",
  "url": "https://kurosushirestaurant.com"
}
```

---

## Mobile-Specific Requirements

These are critical — 90%+ of Venezuelan traffic is mobile:

1. **Touch targets:** All buttons/links minimum `44px` tall
2. **Tap highlight:** `webkit-tap-highlight-color: transparent`
3. **Horizontal scroll:** Only in the Instagram feed strip (intentional), nowhere else
4. **Hero text:** Reduce font size significantly on small screens (clamp values handle this)
5. **Navigation:** Full-screen overlay on mobile (not sidebar drawer)
6. **Menu filter:** Horizontal scroll on mobile, snap-scrolling pill row
7. **WhatsApp button:** Fixed bottom-right floating button on mobile only: green circle with WhatsApp icon, always visible
8. **Images:** Serve square crops on mobile, landscape on desktop (art-direction via Next/Image)
9. **Map:** Disable double-tap zoom, pinch-to-zoom enabled

---

## Additional Features

### WhatsApp Floating Button (mobile only)
```tsx
// Fixed bottom-right, only on mobile (md:hidden)
<a
  href="https://wa.me/58212XXXXXXX?text=Hola%2C%20quiero%20hacer%20una%20reservaci%C3%B3n"
  className="fixed bottom-6 right-6 z-50 md:hidden"
  target="_blank"
>
  <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg">
    <WhatsAppIcon className="w-7 h-7 text-white" />
  </div>
</a>
```

### Cookie/Privacy Notice
Simple bottom banner (EU standard, relevant for any international visitors):
"Usamos cookies para mejorar tu experiencia. [Aceptar] [Más info]"

### 404 Page
Custom 404 in the brand: dark background, "404" in Cormorant 200px `#C0392B`, witty message in Spanish, CTA back to home.

---

## Development Notes

1. **Start with:** `npx create-next-app@latest kuro-sushi --typescript --tailwind --eslint --app --src-dir=no`
2. **Install:** `npm install framer-motion lucide-react react-hook-form zod @hookform/resolvers leaflet react-leaflet @types/leaflet`
3. **Fonts:** Import Cormorant Garamond (weights: 300, 300i, 400, 400i, 600) and DM Sans (300, 400, 500) via `next/font/google`
4. **Tailwind config:** Extend with the custom color palette above
5. **All content in Spanish** by default; English available as secondary
6. **No placeholder "Lorem Ipsum"** — all copy must be real restaurant copy in Spanish
7. **Images:** Use Unsplash URLs provided; in production these would be replaced with real photography
8. **Git:** Initialize with sensible `.gitignore` and initial commit
9. **Vercel:** Include `vercel.json` for zero-config deployment

---

## Deliverable Checklist

- [ ] `app/layout.tsx` — root layout with fonts, metadata, JSON-LD
- [ ] `app/page.tsx` — homepage assembling all sections
- [ ] `app/menu/page.tsx` — full menu with filter
- [ ] `app/about/page.tsx` — brand story
- [ ] `app/reservations/page.tsx` — reservation form
- [ ] `app/not-found.tsx` — custom 404
- [ ] `components/layout/Navbar.tsx` — sticky transparent → solid navbar
- [ ] `components/layout/Footer.tsx` — full footer
- [ ] All home section components (Hero, Philosophy, FeaturedDishes, Experience, Testimonials, Location, InstagramFeed)
- [ ] `lib/constants.ts` — all restaurant data, menu
- [ ] `tailwind.config.ts` — extended palette
- [ ] `public/` — favicon (32x32 dark "K" monogram)
- [ ] `README.md` — local setup instructions

---

*Build it as if every pixel matters. Because in Caracas's sushi market, it does.*
