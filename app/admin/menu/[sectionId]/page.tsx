import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SectionEditor } from "./SectionEditor";
import { ItemsList } from "./ItemsList";
import { NewItemForm } from "./NewItemForm";

export const dynamic = "force-dynamic";

export default async function SectionPage({
  params,
}: {
  params: Promise<{ sectionId: string }>;
}) {
  const { sectionId } = await params;
  const supabase = await createClient();
  const { data: section } = await supabase
    .from("menu_sections")
    .select("*, items:menu_items(*)")
    .eq("id", sectionId)
    .order("sort", { foreignTable: "menu_items", ascending: true })
    .single();

  if (!section) notFound();

  const items = (section.items ?? []).map((it: { id: string; section_id: string; name: string; description: string | null; price: number | string; spicy: boolean; signature: boolean; available: boolean; sort: number }) => ({
    ...it,
    price: Number(it.price),
  }));

  return (
    <main className="pt-20 lg:pt-12 px-6 lg:px-10 pb-16 max-w-4xl">
      <Link
        href="/admin/menu"
        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-kuro-ash hover:text-kuro-cream transition-colors mb-6"
      >
        <ArrowLeft size={12} strokeWidth={1.4} />
        Volver al menú
      </Link>

      <header className="mb-10">
        <div className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-3">
          Sección
        </div>
        <div className="flex items-baseline gap-5">
          {section.kanji && (
            <span className="text-kuro-mist text-5xl leading-none" style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
              {section.kanji}
            </span>
          )}
          <h1 className="text-kuro-cream text-3xl md:text-4xl" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
            {section.title}
          </h1>
        </div>
      </header>

      <SectionEditor section={section} />

      <div className="mt-12 border-t border-kuro-smoke pt-8">
        <h2 className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-5">
          Platos en esta sección
        </h2>
        <ItemsList sectionId={section.id} items={items} />
      </div>

      <div className="mt-10 border-t border-kuro-smoke pt-8">
        <h2 className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-4">
          Nuevo plato
        </h2>
        <NewItemForm sectionId={section.id} />
      </div>
    </main>
  );
}
