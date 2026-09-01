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
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Plato de autor en Kuro Sushi Restaurant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuro Sushi Restaurant",
    description: "Gastronomía japonesa contemporánea en Los Palos Grandes, Caracas.",
    images: ["/images/og-cover.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-180.png", sizes: "180x180" }],
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
    image: ["https://kurosushirestaurant.com/images/og-cover.jpg"],
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
        <link
          rel="preconnect"
          href="https://akskncluulypikjywzml.supabase.co"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://akskncluulypikjywzml.supabase.co" />
        <link rel="preconnect" href="https://server.arcgisonline.com" crossOrigin="anonymous" />
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
