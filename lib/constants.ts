export const RESTAURANT = {
  name: "Kuro Sushi Restaurant",
  shortName: "Kuro",
  tagline: "El arte japonés en el corazón de Caracas",
  phone: "+58 212 555 1234",
  phoneHref: "tel:+582125551234",
  whatsapp: "https://wa.me/582125551234?text=Hola%2C%20quiero%20hacer%20una%20reservaci%C3%B3n%20en%20Kuro%20Sushi",
  whatsappReservation:
    "https://wa.me/582125551234?text=Hola%2C%20quiero%20hacer%20una%20reservaci%C3%B3n%20en%20Kuro%20Sushi",
  whatsappMenu:
    "https://wa.me/582125551234?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20el%20men%C3%BA",
  email: "info@kurosushirestaurant.com",
  reservationsEmail: "reservas@kurosushirestaurant.com",
  address: {
    street: "3ra Avenida, Los Palos Grandes",
    city: "Chacao, Caracas 1060",
    country: "Venezuela",
    coords: { lat: 10.4990, lng: -66.8420 },
  },
  hours: [
    { days: "Lunes — Jueves", time: "12:00 — 23:00" },
    { days: "Viernes — Sábado", time: "12:00 — 01:00" },
    { days: "Domingo", time: "12:00 — 22:00" },
  ],
  payments: ["Efectivo USD", "Zelle", "Pago Móvil", "Tarjetas"],
  social: {
    instagram: "https://instagram.com/kurosushicaracas",
    tiktok: "https://tiktok.com/@kurosushicaracas",
    instagramHandle: "@kurosushicaracas",
  },
};

export type Dish = {
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
};

export const featuredDishes: Dish[] = [
  {
    name: "Kuro Dragon Roll",
    category: "Signature",
    description:
      "Langostino tempura, aguacate, salsa negra de tinta de calamar",
    price: "$18",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&q=85",
  },
  {
    name: "Omakase Nigiri",
    category: "Selección del chef",
    description:
      "8 piezas seleccionadas por el chef. Varía según el mercado del día",
    price: "$24",
    image:
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=1200&q=85",
  },
  {
    name: "Toro Tataki",
    category: "Clásicos",
    description:
      "Atún de aleta azul sellado, aceite de trufa, reducción de ponzu",
    price: "$22",
    image:
      "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=1200&q=85",
  },
  {
    name: "Sake Aburi",
    category: "Maki especial",
    description:
      "Salmón flameado, cream cheese ahumado, ikura, cebollín",
    price: "$16",
    image:
      "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=1200&q=85",
  },
];

export const testimonials = [
  {
    text:
      "El mejor sushi que he probado en Caracas. Una experiencia que no esperaba encontrar aquí. Volveré cada semana.",
    author: "María González",
    location: "Los Palos Grandes",
    rating: 5,
  },
  {
    text:
      "El Kuro Dragon Roll es una obra maestra. El ambiente es perfecto para una cena romántica. Superó todas mis expectativas.",
    author: "Carlos Mendoza",
    location: "Altamira",
    rating: 5,
  },
  {
    text:
      "Como japonés viviendo en Caracas, este restaurante me recuerda a casa. La calidad del pescado y la técnica son excepcionales.",
    author: "Kenji Tanaka",
    location: "Comunidad expat",
    rating: 5,
  },
  {
    text:
      "Vine por el omakase y me quedé sin palabras. El chef explica cada pieza. Una experiencia gastronómica completa.",
    author: "Valentina Ríos",
    location: "La Castellana",
    rating: 5,
  },
];

export const igImages = [
  "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80",
  "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&q=80",
  "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&q=80",
  "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=600&q=80",
  "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80",
  "https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?w=600&q=80",
  "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80",
  "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=600&q=80",
];

export type MenuItem = {
  name: string;
  desc: string;
  price: number;
  spicy?: boolean;
  signature?: boolean;
};

export type MenuSection = {
  id: string;
  title: string;
  kanji: string;
  romanji: string;
  items: MenuItem[];
};

export const menuData: MenuSection[] = [
  {
    id: "rolls-clasicos",
    title: "Rolls Clásicos",
    kanji: "巻",
    romanji: "Maki",
    items: [
      { name: "California Roll", desc: "Cangrejo, aguacate, pepino, tobiko", price: 12 },
      { name: "Spicy Tuna Roll", desc: "Atún picante, pepino, sriracha mayo", price: 14, spicy: true },
      { name: "Philadelphia Roll", desc: "Salmón, cream cheese, pepino", price: 13 },
      { name: "Dragon Roll", desc: "Langostino tempura, aguacate, anguila", price: 16 },
      { name: "Rainbow Roll", desc: "California roll cubierto con 5 pescados", price: 18 },
    ],
  },
  {
    id: "rolls-especiales",
    title: "Rolls Especiales",
    kanji: "特",
    romanji: "Tokubetsu",
    items: [
      { name: "Kuro Dragon Roll", desc: "Langostino tempura, aguacate, salsa negra de tinta de calamar, tobiko negro", price: 18, signature: true },
      { name: "Caracas Roll", desc: "Atún, aguacate, plátano frito caramelizado, salsa teriyaki", price: 17, signature: true },
      { name: "Sake Aburi", desc: "Salmón flameado, cream cheese ahumado, ikura, cebollín", price: 16 },
      { name: "Rock Shrimp Tempura", desc: "Camarones crocantes, spicy mayo, pepino", price: 15, spicy: true },
      { name: "Truffle Toro", desc: "Atún graso, aceite de trufa, láminas de oro comestible", price: 28, signature: true },
    ],
  },
  {
    id: "nigiri-sashimi",
    title: "Nigiri & Sashimi",
    kanji: "握",
    romanji: "Nigiri",
    items: [
      { name: "Nigiri Salmón (2 pzas)", desc: "Salmón fresco premium sobre arroz de sushi", price: 9 },
      { name: "Nigiri Atún (2 pzas)", desc: "Atún rojo sobre arroz de sushi", price: 11 },
      { name: "Nigiri Camarón (2 pzas)", desc: "Camarón cocinado, arroz de sushi", price: 8 },
      { name: "Sashimi de Salmón (5 pzas)", desc: "Láminas de salmón premium, sin arroz", price: 16 },
      { name: "Sashimi Mixto (8 pzas)", desc: "Selección del chef: atún, salmón, pez blanco", price: 24 },
      { name: "Omakase Nigiri (8 pzas)", desc: "Selección del chef según el mercado del día", price: 28, signature: true },
    ],
  },
  {
    id: "entradas",
    title: "Entradas",
    kanji: "前",
    romanji: "Zensai",
    items: [
      { name: "Edamame", desc: "Vainas de soya al vapor con sal marina", price: 6 },
      { name: "Gyoza (6 pzas)", desc: "Empanadillas japonesas de cerdo y vegetales, salsa ponzu", price: 9 },
      { name: "Agedashi Tofu", desc: "Tofu frito en caldo dashi con cebollín y katsuobushi", price: 8 },
      { name: "Tempura Mixta", desc: "Selección de vegetales y langostinos en tempura ligera", price: 12 },
      { name: "Toro Tataki", desc: "Atún flameado, aceite de trufa, reducción ponzu, jalapeño", price: 22, signature: true },
    ],
  },
  {
    id: "sopas-arroz",
    title: "Sopas & Arroz",
    kanji: "汁",
    romanji: "Shiru",
    items: [
      { name: "Ramen Tonkotsu", desc: "Caldo de hueso de cerdo 18h, chashu, huevo ajitsuke, nori", price: 14 },
      { name: "Miso Soup", desc: "Caldo miso tradicional, tofu, alga wakame, cebollín", price: 6 },
      { name: "Chirashi Don", desc: "Bol de arroz de sushi con sashimi mixto y vegetales", price: 22 },
      { name: "Chahan", desc: "Arroz frito japonés, huevo, cebollín, salsa de soya", price: 10 },
    ],
  },
  {
    id: "postres",
    title: "Postres",
    kanji: "甘",
    romanji: "Amai",
    items: [
      { name: "Mochi Ice Cream (3 pzas)", desc: "Helado japonés: matcha, mango, fresa", price: 9 },
      { name: "Tempura de Plátano", desc: "Plátano en tempura, helado de vainilla, miel de jengibre", price: 8 },
      { name: "Cheesecake de Matcha", desc: "Tarta japonesa de queso con matcha ceremonial", price: 10 },
    ],
  },
  {
    id: "bebidas",
    title: "Bebidas",
    kanji: "酒",
    romanji: "Sake",
    items: [
      { name: "Sake Caliente / Frío", desc: "Selección de sake premium japonés", price: 12 },
      { name: "Cerveza Sapporo", desc: "Cerveza japonesa importada", price: 6 },
      { name: "Matcha Latte", desc: "Matcha ceremonial con leche de avena", price: 7 },
      { name: "Limonada de Jengibre", desc: "Limonada artesanal con raíz de jengibre fresco", price: 6 },
      { name: "Agua Mineral", desc: "Con o sin gas", price: 4 },
    ],
  },
];

export const navLinks = [
  { href: "/menu", label: "Menú" },
  { href: "/about", label: "Historia" },
  { href: "/reservations", label: "Reservaciones" },
];
