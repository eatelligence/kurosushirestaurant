import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/nosotros", permanent: true },
      { source: "/contacto", destination: "/ubicacion", permanent: true },
      { source: "/reservations", destination: "/ubicacion", permanent: true },
    ];
  },
};

export default config;
