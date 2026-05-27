import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MotionProvider } from "@/components/MotionProvider";
import { SiteBanner } from "@/components/public/SiteBanner";
import { getSettings } from "@/lib/data/settings";
import { getHoursGrouped, getHoursRaw } from "@/lib/data/hours";
import { Toaster } from "sonner";

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
    "Kuro Sushi: cocina japonesa contemporánea en Los Palos Grandes, Caracas. Rolls de autor, nigiri y omakase.",
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
    description: "Cocina japonesa contemporánea en Los Palos Grandes, Caracas.",
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
    icon: [{ url: "/logopesce.jpg", type: "image/jpeg" }],
    apple: [{ url: "/logopesce.jpg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

function dayCode(d: number) {
  return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][d];
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, hoursGrouped, hoursRaw] = await Promise.all([
    getSettings(),
    getHoursGrouped(),
    getHoursRaw(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: settings.name,
    servesCuisine: "Japanese",
    priceRange: "$$",
    image: [
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=1200&q=85",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address.street,
      addressLocality: "Caracas",
      addressCountry: "VE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: settings.address.coords.lat,
      longitude: settings.address.coords.lng,
    },
    openingHours: hoursRaw
      .filter((h) => !h.closed && h.open && h.close)
      .map((h) => `${dayCode(h.day)} ${h.open}-${h.close === "00:00:00" ? "24:00" : h.close?.slice(0, 5)}`),
    telephone: settings.phone,
    url: "https://kurosushirestaurant.com",
    acceptsReservations: false,
  };

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
        <MotionProvider>
          <SiteBanner banner={settings.banner} />
          <Navbar settings={settings} />
          <main>{children}</main>
          <Footer settings={settings} hours={hoursGrouped} />
          <WhatsAppButton href={settings.whatsappUrl} />
        </MotionProvider>
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
