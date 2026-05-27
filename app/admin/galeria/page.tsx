import { getGallery } from "@/lib/data/gallery";
import { GalleryEditor } from "./GalleryEditor";

export const dynamic = "force-dynamic";

export default async function GaleriaAdminPage() {
  const photos = await getGallery();
  return (
    <main className="pt-20 lg:pt-12 px-6 lg:px-10 pb-16 max-w-5xl">
      <header className="mb-10">
        <div className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-3">
          Galería
        </div>
        <h1 className="text-kuro-cream text-3xl md:text-4xl" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
          Galería de fotos
        </h1>
        <p className="text-kuro-stone mt-3 text-sm leading-relaxed max-w-prose">
          Sube fotos del restaurante y los platos. Las imágenes se comprimen automáticamente (máx. 1 MB / 2000 px) antes de
          subirse. Arrastra para reordenar; marca como <strong className="text-kuro-cream">Destacada</strong> las que aparecen en la home.
        </p>
      </header>
      <GalleryEditor photos={photos} />
    </main>
  );
}
