import type { MetadataRoute } from "next";

const BASE_URL = "https://kurosushirestaurant.com";

// Rotte pubbliche statiche. Non legge dal DB di proposito: la sitemap deve
// generarsi anche se Supabase non risponde in fase di build.
const ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/menu", changeFrequency: "weekly", priority: 0.9 },
  { path: "/ubicacion", changeFrequency: "monthly", priority: 0.8 },
  { path: "/galeria", changeFrequency: "weekly", priority: 0.7 },
  { path: "/nosotros", changeFrequency: "monthly", priority: 0.6 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
