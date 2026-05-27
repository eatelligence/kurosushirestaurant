"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { SETTINGS_TAG } from "@/lib/data/settings";

const SettingsSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().nullable().optional(),
  phone: z.string().min(5),
  whatsapp_number: z.string().regex(/^\d{8,15}$/, "Solo dígitos, sin + ni espacios"),
  email: z.string().email(),
  address_street: z.string().min(2),
  address_city: z.string().min(2),
  address_country: z.string().min(2),
  lat: z.coerce.number().gte(-90).lte(90),
  lng: z.coerce.number().gte(-180).lte(180),
  payments: z.array(z.string()).default([]),
  instagram_url: z.string().url().nullable().optional(),
  tiktok_url: z.string().url().nullable().optional(),
  instagram_handle: z.string().nullable().optional(),
});

export async function updateSettings(input: unknown) {
  const parsed = SettingsSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("restaurant_settings")
    .update(parsed.data)
    .eq("id", 1);

  if (error) return { ok: false as const, error: error.message };

  revalidateTag(SETTINGS_TAG);
  revalidatePath("/", "layout");
  return { ok: true as const };
}

const BannerSchema = z.object({
  banner_active: z.boolean(),
  banner_text: z.string().max(140).nullable(),
});

export async function updateBanner(input: unknown) {
  const parsed = BannerSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase
    .from("restaurant_settings")
    .update(parsed.data)
    .eq("id", 1);

  if (error) return { ok: false as const, error: error.message };

  revalidateTag(SETTINGS_TAG);
  revalidatePath("/", "layout");
  return { ok: true as const };
}
