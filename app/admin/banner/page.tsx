import { getSettings } from "@/lib/data/settings";
import { BannerForm } from "./BannerForm";

export const dynamic = "force-dynamic";

export default async function BannerPage() {
  const settings = await getSettings();
  return (
    <main className="pt-20 lg:pt-12 px-6 lg:px-10 pb-16 max-w-2xl">
      <header className="mb-10">
        <div className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-3">
          Anuncio del sitio
        </div>
        <h1 className="text-kuro-cream text-3xl md:text-4xl" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
          Banner de avisos
        </h1>
        <p className="text-kuro-stone mt-3 text-sm leading-relaxed">
          Cuando está activo, aparece como franja sobre la barra de navegación en todo el sitio. Útil para anunciar cierres,
          eventos especiales o nuevos platos.
        </p>
      </header>
      <BannerForm initial={settings.banner} />
    </main>
  );
}
