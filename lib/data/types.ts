// Public-facing data shapes used by both data layer and components.

export type Settings = {
  name: string;
  tagline: string | null;
  phone: string;
  phoneHref: string;
  whatsappNumber: string;
  whatsappUrl: string;
  whatsappMenuUrl: string;
  email: string;
  address: {
    street: string;
    city: string;
    country: string;
    coords: { lat: number; lng: number };
  };
  payments: string[];
  social: {
    instagram: string | null;
    tiktok: string | null;
    instagramHandle: string | null;
  };
  banner: { active: boolean; text: string | null };
};

export type HoursRow = {
  day: number; // 0=Sun … 6=Sat
  open: string | null;
  close: string | null;
  closed: boolean;
};

// Grouped form ready to render in Footer / Location / ubicacion.
export type HoursGroup = { days: string; time: string };

export type MenuItemRow = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  spicy: boolean;
  signature: boolean;
  available: boolean;
  sort: number;
};

export type MenuSectionRow = {
  id: string;
  slug: string;
  title: string;
  kanji: string | null;
  romaji: string | null;
  sort: number;
  items: MenuItemRow[];
};

export type GalleryPhoto = {
  id: string;
  url: string;
  storagePath: string;
  alt: string | null;
  sort: number;
  featured: boolean;
  width: number | null;
  height: number | null;
};
