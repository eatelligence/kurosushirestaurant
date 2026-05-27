"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { GALLERY_BUCKET, GALLERY_TAG } from "@/lib/data/gallery";

function bump() {
  revalidateTag(GALLERY_TAG);
  revalidatePath("/galeria");
  revalidatePath("/");
}

const InsertSchema = z.object({
  storage_path: z.string().min(1),
  alt: z.string().nullable().optional(),
  width: z.number().int().positive().nullable().optional(),
  height: z.number().int().positive().nullable().optional(),
  featured: z.boolean().default(false),
});

export async function insertPhoto(input: unknown) {
  const parsed = InsertSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0].message };
  const supabase = await createClient();
  const { count } = await supabase.from("gallery_photos").select("id", { count: "exact", head: true });
  const { error } = await supabase
    .from("gallery_photos")
    .insert({ ...parsed.data, sort: count ?? 0 });
  if (error) return { ok: false as const, error: error.message };
  bump();
  return { ok: true as const };
}

export async function updatePhoto(id: string, alt: string | null, featured: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("gallery_photos").update({ alt, featured }).eq("id", id);
  if (error) return { ok: false as const, error: error.message };
  bump();
  return { ok: true as const };
}

export async function deletePhoto(id: string) {
  const supabase = await createClient();
  const { data: photo } = await supabase
    .from("gallery_photos")
    .select("storage_path")
    .eq("id", id)
    .single();

  // Only attempt storage delete if it's a bucket path (not an Unsplash URL).
  if (photo?.storage_path && !/^https?:\/\//.test(photo.storage_path)) {
    await supabase.storage.from(GALLERY_BUCKET).remove([photo.storage_path]);
  }

  const { error } = await supabase.from("gallery_photos").delete().eq("id", id);
  if (error) return { ok: false as const, error: error.message };
  bump();
  return { ok: true as const };
}

export async function reorderPhotos(orderedIds: string[]) {
  const supabase = await createClient();
  const results = await Promise.all(
    orderedIds.map((id, i) =>
      supabase.from("gallery_photos").update({ sort: i }).eq("id", id)
    )
  );
  const failure = results.find((r) => r.error);
  if (failure?.error) return { ok: false as const, error: failure.error.message };
  bump();
  return { ok: true as const };
}
