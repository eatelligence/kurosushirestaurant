import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { RESTAURANT } from "@/lib/constants";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kurosushirestaurant.com"),
  title: {
    default: "Kuro Sushi Restaurant | Los Palos Grandes, Caracas",
    template: "%s | Kuro Sushi",
  },
  description:
    "El mejor sushi de Caracas en Los Palos Grandes. Gastronomía japonesa contemporánea, rolls de autor y experiencia premium. Reserva tu mesa en Kuro Sushi.",
  keywords: [
    "sushi Caracas",
    "restaurante japonés Caracas",
    "sushi Los Palos Grandes",
    "mejor sushi Venezuela",
    "kuro sushi",
    "omakase Caracas",
  ],
  authors: [{ name: "Kuro Sushi Restaurant" }],
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: "https://kurosushirestaurant.com",
    siteName: "Kuro Sushi Restaurant",
    title: "Kuro Sushi Restaurant | Los Palos Grandes, Caracas",
    description:
      "Gastronomía japonesa contemporánea en el corazón de Los Palos Grandes. Reserva tu mesa en Kuro Sushi.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Kuro Sushi Restaurant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuro Sushi Restaurant",
    description: "Gastronomía japonesa contemporánea en Los Palos Grandes, Caracas.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Kuro Sushi Restaurant",
  servesCuisine: "Japanese",
  priceRange: "$$",
  image: [
    "https://images.unsplash.com/photo-1553621042-f6e147245754?w=1200&q=85",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: RESTAURANT.address.street,
    addressLocality: "Caracas",
    addressCountry: "VE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: RESTAURANT.address.coords.lat,
    longitude: RESTAURANT.address.coords.lng,
  },
  openingHours: ["Mo-Th 12:00-23:00", "Fr-Sa 12:00-01:00", "Su 12:00-22:00"],
  telephone: RESTAURANT.phone,
  url: "https://kurosushirestaurant.com",
  acceptsReservations: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-VE" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://a.basemaps.cartocdn.com" crossOrigin="anonymous" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
