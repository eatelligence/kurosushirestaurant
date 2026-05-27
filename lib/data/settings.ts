import "server-only";
import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { Settings } from "./types";

const CACHE_TAG = "settings";

async function fetchSettings(): Promise<Settings> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("restaurant_settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error || !data) {
    throw new Error(`Failed to load settings: ${error?.message ?? "no row"}`);
  }

  const phoneHref = `tel:${data.phone.replace(/\s+/g, "")}`;
  const baseWa = `https://wa.me/${data.whatsapp_number}`;
  const waText = encodeURIComponent(`Hola, quiero contactarme con ${data.name}`);
  const waMenuText = encodeURIComponent("Hola, tengo una pregunta sobre el menú");

  return {
    name: data.name,
    tagline: data.tagline,
    phone: data.phone,
    phoneHref,
    whatsappNumber: data.whatsapp_number,
    whatsappUrl: `${baseWa}?text=${waText}`,
    whatsappMenuUrl: `${baseWa}?text=${waMenuText}`,
    email: data.email,
    address: {
      street: data.address_street,
      city: data.address_city,
      country: data.address_country,
      coords: { lat: data.lat, lng: data.lng },
    },
    payments: data.payments ?? [],
    social: {
      instagram: data.instagram_url,
      tiktok: data.tiktok_url,
      instagramHandle: data.instagram_handle,
    },
    banner: { active: data.banner_active, text: data.banner_text },
  };
}

export const getSettings = unstable_cache(fetchSettings, ["settings"], {
  tags: [CACHE_TAG],
  revalidate: 60,
});

export const SETTINGS_TAG = CACHE_TAG;
