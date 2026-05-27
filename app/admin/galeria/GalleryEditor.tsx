"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Star, StarOff, Trash2, Upload } from "lucide-react";
import imageCompression from "browser-image-compression";
import { SortableList } from "@/components/admin/SortableList";
import { createClient } from "@/lib/supabase/client";
import { deletePhoto, insertPhoto, reorderPhotos, updatePhoto } from "@/lib/actions/gallery";
import type { GalleryPhoto } from "@/lib/data/types";

const BUCKET = "kuro-photos";

export function GalleryEditor({ photos }: { photos: GalleryPhoto[] }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onPickFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const arr = Array.from(files);
    setUploading(true);
    setProgress({ done: 0, total: arr.length });
    const supabase = createClient();

    for (let i = 0; i < arr.length; i++) {
      const original = arr[i];
      try {
        const compressed = await imageCompression(original, {
          maxSizeMB: 1,
          maxWidthOrHeight: 2000,
          useWebWorker: true,
          fileType: "image/webp",
        });
        const ext = "webp";
        const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, compressed, {
          contentType: "image/webp",
          upsert: false,
        });
        if (upErr) throw upErr;

        // Read dimensions
        const dims = await new Promise<{ w: number; h: number }>((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve({ w: img.width, h: img.height });
          img.onerror = () => resolve({ w: 0, h: 0 });
          img.src = URL.createObjectURL(compressed);
        });

        const ins = await insertPhoto({
          storage_path: path,
          alt: original.name.replace(/\.[^.]+$/, ""),
          width: dims.w || null,
          height: dims.h || null,
          featured: false,
        });
        if (!ins.ok) throw new Error(ins.error);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error";
        toast.error(`Error subiendo ${original.name}: ${msg}`);
      } finally {
        setProgress({ done: i + 1, total: arr.length });
      }
    }

    toast.success(`${arr.length} foto(s) procesadas`);
    setUploading(false);
    setProgress(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="space-y-6">
      <div className="border border-dashed border-kuro-smoke p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <Upload size={28} strokeWidth={1.3} className="text-kuro-mist shrink-0" />
        <div className="flex-1 text-center sm:text-left">
          <div className="text-kuro-cream text-base mb-1">Subir fotos</div>
          <div className="text-[12px] text-kuro-ash">
            JPG, PNG o WebP. Se comprimen automáticamente.
          </div>
          {progress && (
            <div className="mt-2 text-[11px] uppercase tracking-[0.28em] text-kuro-mist">
              {progress.done} / {progress.total}…
            </div>
          )}
        </div>
        <label className="admin-btn-primary cursor-pointer">
          {uploading ? "Subiendo…" : "Seleccionar"}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            disabled={uploading}
            onChange={(e) => onPickFiles(e.target.files)}
            className="hidden"
          />
        </label>
      </div>

      <PhotoGrid photos={photos} />
    </div>
  );
}

function PhotoGrid({ photos }: { photos: GalleryPhoto[] }) {
  if (photos.length === 0) {
    return (
      <div className="border border-dashed border-kuro-smoke p-8 text-center text-kuro-ash">
        Aún no hay fotos.
      </div>
    );
  }
  return (
    <SortableList
      items={photos}
      onReorder={async (ids) => {
        const res = await reorderPhotos(ids);
        if (!res.ok) toast.error(res.error);
      }}
      renderItem={(p, handle) => <PhotoRow photo={p} handle={handle} />}
    />
  );
}

function PhotoRow({ photo, handle }: { photo: GalleryPhoto; handle: React.ReactNode }) {
  const [pending, start] = useTransition();
  const [del, startDel] = useTransition();
  const [featured, setFeatured] = useState(photo.featured);
  const [alt, setAlt] = useState(photo.alt ?? "");

  return (
    <div className="flex items-center gap-3 border border-kuro-smoke pl-2 pr-4 py-3">
      {handle}
      <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-kuro-charcoal">
        <Image src={photo.url} alt={photo.alt ?? ""} fill sizes="64px" className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <input
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          onBlur={() => {
            if (alt === (photo.alt ?? "")) return;
            start(async () => {
              const res = await updatePhoto(photo.id, alt || null, featured);
              if (!res.ok) toast.error(res.error);
            });
          }}
          placeholder="Descripción (alt)"
          className="admin-input"
        />
        <div className="text-[10px] text-kuro-ash mt-1 truncate">
          {photo.storagePath}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          const next = !featured;
          setFeatured(next);
          start(async () => {
            const res = await updatePhoto(photo.id, alt || null, next);
            if (res.ok) toast.success(next ? "Marcada como destacada" : "Quitada de destacadas");
            else {
              toast.error(res.error);
              setFeatured(!next);
            }
          });
        }}
        disabled={pending}
        aria-label={featured ? "Quitar destacada" : "Marcar destacada"}
        className={`w-10 h-10 flex items-center justify-center border transition-colors ${
          featured ? "border-kuro-cream text-kuro-cream" : "border-kuro-smoke text-kuro-ash hover:text-kuro-cream"
        }`}
      >
        {featured ? <Star size={14} strokeWidth={1.5} /> : <StarOff size={14} strokeWidth={1.5} />}
      </button>

      <button
        type="button"
        disabled={del}
        onClick={() => {
          if (!confirm("¿Eliminar esta foto?")) return;
          startDel(async () => {
            const res = await deletePhoto(photo.id);
            if (!res.ok) toast.error(res.error);
            else toast.success("Foto eliminada");
          });
        }}
        aria-label="Eliminar"
        className="w-10 h-10 flex items-center justify-center border border-kuro-smoke text-kuro-stone hover:text-kuro-cream hover:border-kuro-graphite transition-colors"
      >
        <Trash2 size={13} strokeWidth={1.5} />
      </button>
    </div>
  );
}
