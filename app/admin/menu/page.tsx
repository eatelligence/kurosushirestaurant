import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { getMenu } from "@/lib/data/menu";
import { SectionsList } from "./SectionsList";
import { NewSectionForm } from "./NewSectionForm";

export const dynamic = "force-dynamic";

export default async function MenuAdminPage() {
  const menu = await getMenu();
  return (
    <main className="pt-20 lg:pt-12 px-6 lg:px-10 pb-16 max-w-4xl">
      <header className="mb-10">
        <div className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-3">
          Menú
        </div>
        <h1 className="text-kuro-cream text-3xl md:text-4xl" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
          Gestión del menú
        </h1>
        <p className="text-kuro-stone mt-3 text-sm leading-relaxed max-w-prose">
          Reordena las secciones arrastrándolas. Haz clic en una sección para editar sus platos.
        </p>
      </header>

      <SectionsList sections={menu} />

      <div className="mt-10 border-t border-kuro-smoke pt-8">
        <div className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-4">
          Nueva sección
        </div>
        <NewSectionForm />
      </div>
    </main>
  );
}
