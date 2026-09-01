"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { MENU_TAG } from "@/lib/data/menu";

function bump() {
  revalidateTag(MENU_TAG);
  revalidatePath("/menu");
  revalidatePath("/");
}

const SectionSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  title: z.string().min(1),
  kanji: z.string().nullable().optional(),
  romaji: z.string().nullable().optional(),
});

export async function createSection(input: unknown) {
  const parsed = SectionSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0].message };
  const supabase = await createClient();
  const { data: last } = await supabase
    .from("menu_sections")
    .select("sort")
    .order("sort", { ascending: false })
    .limit(1)
    .maybeSingle();
  const { error } = await supabase
    .from("menu_sections")
    .insert({ ...parsed.data, sort: (last?.sort ?? -1) + 1 });
  if (error) return { ok: false as const, error: error.message };
  bump();
  return { ok: true as const };
}

export async function updateSection(id: string, input: unknown) {
  const parsed = SectionSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0].message };
  const supabase = await createClient();
  const { error } = await supabase.from("menu_sections").update(parsed.data).eq("id", id);
  if (error) return { ok: false as const, error: error.message };
  bump();
  return { ok: true as const };
}

export async function deleteSection(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("menu_sections").delete().eq("id", id);
  if (error) return { ok: false as const, error: error.message };
  bump();
  return { ok: true as const };
}

export async function reorderSections(orderedIds: string[]) {
  const supabase = await createClient();
  const results = await Promise.all(
    orderedIds.map((id, i) =>
      supabase.from("menu_sections").update({ sort: i }).eq("id", id)
    )
  );
  const failure = results.find((r) => r.error);
  if (failure?.error) return { ok: false as const, error: failure.error.message };
  bump();
  return { ok: true as const };
}

const ItemSchema = z.object({
  section_id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  price: z.coerce.number().gte(0),
  spicy: z.boolean().default(false),
  signature: z.boolean().default(false),
  available: z.boolean().default(true),
});

export async function createItem(input: unknown) {
  const parsed = ItemSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0].message };
  const supabase = await createClient();
  const { data: last } = await supabase
    .from("menu_items")
    .select("sort")
    .eq("section_id", parsed.data.section_id)
    .order("sort", { ascending: false })
    .limit(1)
    .maybeSingle();
  const { error } = await supabase
    .from("menu_items")
    .insert({ ...parsed.data, sort: (last?.sort ?? -1) + 1 });
  if (error) return { ok: false as const, error: error.message };
  bump();
  return { ok: true as const };
}

export async function updateItem(id: string, input: unknown) {
  const parsed = ItemSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0].message };
  const supabase = await createClient();
  const { error } = await supabase.from("menu_items").update(parsed.data).eq("id", id);
  if (error) return { ok: false as const, error: error.message };
  bump();
  return { ok: true as const };
}

export async function toggleItemAvailable(id: string, available: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("menu_items").update({ available }).eq("id", id);
  if (error) return { ok: false as const, error: error.message };
  bump();
  return { ok: true as const };
}

export async function deleteItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("menu_items").delete().eq("id", id);
  if (error) return { ok: false as const, error: error.message };
  bump();
  return { ok: true as const };
}

export async function reorderItems(sectionId: string, orderedIds: string[]) {
  const supabase = await createClient();
  const results = await Promise.all(
    orderedIds.map((id, i) =>
      supabase.from("menu_items").update({ sort: i }).eq("id", id).eq("section_id", sectionId)
    )
  );
  const failure = results.find((r) => r.error);
  if (failure?.error) return { ok: false as const, error: failure.error.message };
  bump();
  return { ok: true as const };
}
