import "server-only";
import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { GalleryPhoto } from "./types";

const CACHE_TAG = "gallery";
const BUCKET = "kuro-photos";

function publicUrl(supabaseUrl: string, path: string) {
  // Allow seeded rows to store an absolute URL (e.g. Unsplash) directly.
  if (/^https?:\/\//.test(path)) return path;
  return `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${path}`;
}

async function fetchGallery(): Promise<GalleryPhoto[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("gallery_photos")
    .select("*")
    .order("sort", { ascending: true });
  if (error) throw new Error(`Failed to load gallery: ${error.message}`);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return (data ?? []).map((p) => ({
    id: p.id,
    url: publicUrl(url, p.storage_path),
    storagePath: p.storage_path,
    alt: p.alt,
    sort: p.sort,
    featured: p.featured,
    width: p.width,
    height: p.height,
  }));
}

export const getGallery = unstable_cache(fetchGallery, ["gallery"], {
  tags: [CACHE_TAG],
  revalidate: 60,
});

export const GALLERY_TAG = CACHE_TAG;
export const GALLERY_BUCKET = BUCKET;
