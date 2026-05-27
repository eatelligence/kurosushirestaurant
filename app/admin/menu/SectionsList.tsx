"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { SortableList } from "@/components/admin/SortableList";
import { reorderSections } from "@/lib/actions/menu";
import type { MenuSectionRow } from "@/lib/data/types";

export function SectionsList({ sections }: { sections: MenuSectionRow[] }) {
  if (sections.length === 0) {
    return (
      <div className="border border-dashed border-kuro-smoke p-8 text-center text-kuro-ash">
        Todavía no hay secciones. Crea la primera abajo.
      </div>
    );
  }

  return (
    <SortableList
      items={sections}
      onReorder={async (ids) => {
        const res = await reorderSections(ids);
        if (!res.ok) toast.error(res.error);
      }}
      renderItem={(s, handle) => (
        <div className="flex items-center gap-3 border border-kuro-smoke pl-2 pr-4 py-3 hover:border-kuro-graphite transition-colors">
          {handle}
          {s.kanji && (
            <span
              className="text-kuro-mist text-2xl leading-none w-9 text-center"
              style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
            >
              {s.kanji}
            </span>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-kuro-cream text-base" style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
              {s.title}
            </div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-kuro-ash mt-0.5">
              {s.items.length} platos · {s.romaji ?? "—"}
            </div>
          </div>
          <Link
            href={`/admin/menu/${s.id}`}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-kuro-stone hover:text-kuro-cream transition-colors"
          >
            Editar <ArrowUpRight size={12} strokeWidth={1.4} />
          </Link>
        </div>
      )}
    />
  );
}
