import type { MetadataRoute } from "next";

const BASE_URL = "https://kurosushirestaurant.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Il CMS è già protetto dal middleware, ma va tenuto fuori dall'indice.
      disallow: ["/admin", "/admin/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
