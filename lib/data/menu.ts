import "server-only";
import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { MenuSectionRow } from "./types";

const CACHE_TAG = "menu";

async function fetchMenu(): Promise<MenuSectionRow[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("menu_sections")
    .select(
      "id, slug, title, kanji, romaji, sort, items:menu_items(id,name,description,price,spicy,signature,available,sort)"
    )
    .order("sort", { ascending: true })
    .order("sort", { foreignTable: "menu_items", ascending: true });

  if (error) throw new Error(`Failed to load menu: ${error.message}`);

  return (data ?? []).map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    kanji: s.kanji,
    romaji: s.romaji,
    sort: s.sort,
    items: (s.items ?? []).map((it) => ({
      ...it,
      price: Number(it.price),
    })),
  }));
}

export const getMenu = unstable_cache(fetchMenu, ["menu"], {
  tags: [CACHE_TAG],
  revalidate: 60,
});

export const MENU_TAG = CACHE_TAG;
