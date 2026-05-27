import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const [sections, items, photos, settings] = await Promise.all([
    supabase.from("menu_sections").select("id", { count: "exact", head: true }),
    supabase.from("menu_items").select("id", { count: "exact", head: true }),
    supabase.from("gallery_photos").select("id", { count: "exact", head: true }),
    supabase.from("restaurant_settings").select("banner_active, banner_text, updated_at").eq("id", 1).single(),
  ]);

  const cards = [
    { label: "Secciones de menú", value: sections.count ?? 0, href: "/admin/menu" },
    { label: "Platos", value: items.count ?? 0, href: "/admin/menu" },
    { label: "Fotos en galería", value: photos.count ?? 0, href: "/admin/galeria" },
  ];

  return (
    <main className="pt-20 lg:pt-12 px-6 lg:px-10 pb-16 max-w-[1200px]">
      <header className="mb-10">
        <div className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-3">
          Panel
        </div>
        <h1 className="text-kuro-cream text-3xl md:text-4xl" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
          Bienvenido.
        </h1>
        <p className="text-kuro-stone mt-3 text-sm leading-relaxed max-w-prose">
          Desde aquí puedes actualizar el menú, las fotos, los horarios y la información del restaurante.
          Los cambios aparecen en el sitio público en pocos segundos.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group border border-kuro-smoke p-6 hover:border-kuro-graphite transition-colors"
          >
            <div className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-3">
              {c.label}
            </div>
            <div className="flex items-end justify-between gap-3">
              <span
                className="text-kuro-cream text-5xl leading-none"
                style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
              >
                {c.value}
              </span>
              <ArrowUpRight
                size={16}
                strokeWidth={1.4}
                className="text-kuro-ash group-hover:text-kuro-cream transition-colors"
              />
            </div>
          </Link>
        ))}
      </div>

      <section className="border border-kuro-smoke p-6 mb-6">
        <div className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-3">
          Anuncio del sitio
        </div>
        {settings.data?.banner_active ? (
          <p className="text-kuro-cream">
            <span className="inline-block w-2 h-2 rounded-full bg-kuro-cream mr-2 align-middle" />
            Activo: <span className="italic">{settings.data.banner_text}</span>
          </p>
        ) : (
          <p className="text-kuro-stone">No hay anuncio activo.</p>
        )}
        <Link
          href="/admin/banner"
          className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-kuro-stone hover:text-kuro-cream transition-colors"
        >
          Gestionar anuncio <ArrowUpRight size={12} strokeWidth={1.4} />
        </Link>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { href: "/admin/info", label: "Información del restaurante" },
          { href: "/admin/horarios", label: "Horarios de apertura" },
        ].map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="flex items-center justify-between border border-kuro-smoke px-6 py-5 hover:border-kuro-graphite transition-colors group"
          >
            <span className="text-[12px] uppercase tracking-[0.22em] text-kuro-cream">
              {q.label}
            </span>
            <ArrowUpRight size={14} strokeWidth={1.4} className="text-kuro-ash group-hover:text-kuro-cream transition-colors" />
          </Link>
        ))}
      </section>
    </main>
  );
}
