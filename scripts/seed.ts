/**
 * One-shot seed: populates Supabase with the current static content
 * from lib/constants.ts + creates the admin auth user.
 *
 * Run:  npx tsx scripts/seed.ts
 *
 * Safe to re-run: uses upserts and skips creation if the admin user already exists.
 */
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import { RESTAURANT, menuData, featuredDishes, igImages } from "../lib/constants";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

if (!URL || !SERVICE || !ADMIN_EMAIL) {
  console.error("Missing env vars. Need NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAIL.");
  process.exit(1);
}

const supabase = createClient(URL, SERVICE, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function seedSettings() {
  const whatsappNumber = RESTAURANT.whatsapp.match(/wa\.me\/(\d+)/)?.[1] ?? "584126850612";
  const { error } = await supabase.from("restaurant_settings").upsert(
    {
      id: 1,
      name: RESTAURANT.name,
      tagline: RESTAURANT.tagline,
      phone: RESTAURANT.phone,
      whatsapp_number: whatsappNumber,
      email: RESTAURANT.email,
      address_street: RESTAURANT.address.street,
      address_city: RESTAURANT.address.city,
      address_country: RESTAURANT.address.country,
      lat: RESTAURANT.address.coords.lat,
      lng: RESTAURANT.address.coords.lng,
      payments: RESTAURANT.payments,
      instagram_url: RESTAURANT.social.instagram,
      tiktok_url: RESTAURANT.social.tiktok,
      instagram_handle: RESTAURANT.social.instagramHandle,
      banner_text: null,
      banner_active: false,
    },
    { onConflict: "id" }
  );
  if (error) throw error;
  console.log("✓ settings");
}

async function seedHours() {
  // Domingo-Miércoles 12:00-22:00, Jueves-Sábado 12:00-24:00 (stored as 00:00 next day)
  const rows = [
    { day: 0, open_time: "12:00", close_time: "22:00", closed: false }, // Sun
    { day: 1, open_time: "12:00", close_time: "22:00", closed: false }, // Mon
    { day: 2, open_time: "12:00", close_time: "22:00", closed: false }, // Tue
    { day: 3, open_time: "12:00", close_time: "22:00", closed: false }, // Wed
    { day: 4, open_time: "12:00", close_time: "00:00", closed: false }, // Thu
    { day: 5, open_time: "12:00", close_time: "00:00", closed: false }, // Fri
    { day: 6, open_time: "12:00", close_time: "00:00", closed: false }, // Sat
  ];
  const { error } = await supabase.from("opening_hours").upsert(rows, { onConflict: "day" });
  if (error) throw error;
  console.log("✓ hours");
}

async function seedMenu() {
  // Wipe & rewrite the menu (idempotent for re-seeds)
  await supabase.from("menu_items").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("menu_sections").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  for (let i = 0; i < menuData.length; i++) {
    const s = menuData[i];
    const { data: section, error: sErr } = await supabase
      .from("menu_sections")
      .insert({
        slug: s.id,
        title: s.title,
        kanji: s.kanji,
        romaji: s.romanji,
        sort: i,
      })
      .select("id")
      .single();
    if (sErr || !section) throw sErr ?? new Error("section insert failed");

    const items = s.items.map((it, idx) => ({
      section_id: section.id,
      name: it.name,
      description: it.desc,
      price: it.price,
      spicy: it.spicy ?? false,
      signature: it.signature ?? false,
      available: true,
      sort: idx,
    }));
    const { error: iErr } = await supabase.from("menu_items").insert(items);
    if (iErr) throw iErr;
  }
  console.log("✓ menu");
}

async function seedGallery() {
  await supabase.from("gallery_photos").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  // For seed we store the Unsplash absolute URLs in storage_path.
  // The getter detects http(s) and uses them as-is. When the client
  // uploads real photos via the dashboard, those will be stored
  // in the kuro-photos bucket and the path will be relative.
  const rows = [
    ...featuredDishes.map((d, i) => ({
      storage_path: d.image,
      alt: d.name,
      sort: i,
      featured: true,
    })),
    ...igImages.map((url, i) => ({
      storage_path: url,
      alt: "Kuro Sushi",
      sort: featuredDishes.length + i,
      featured: false,
    })),
  ];
  const { error } = await supabase.from("gallery_photos").insert(rows);
  if (error) throw error;
  console.log(`✓ gallery (${rows.length} photos)`);
}

async function seedAdminUser() {
  // List existing users (paginated; for our small case page 1 is fine)
  const { data: list } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 });
  const exists = list?.users?.some((u) => u.email === ADMIN_EMAIL);
  if (exists) {
    console.log(`✓ admin user exists: ${ADMIN_EMAIL}`);
    return;
  }
  const tempPassword = Math.random().toString(36).slice(2) + "Aa1!";
  const { error } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: tempPassword,
    email_confirm: true,
  });
  if (error) throw error;
  console.log(`✓ admin user created: ${ADMIN_EMAIL}`);
  console.log(`  Temporary password: ${tempPassword}`);
  console.log(`  → IMPORTANT: log in once and change it from the dashboard.`);
}

async function main() {
  await seedSettings();
  await seedHours();
  await seedMenu();
  await seedGallery();
  await seedAdminUser();
  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
