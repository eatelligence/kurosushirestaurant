"use client";

import { useState } from "react";
import { m as motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { MenuCategory } from "@/components/menu/MenuCategory";
import type { MenuSectionRow } from "@/lib/data/types";

export function MenuPageClient({
  menu,
  whatsappUrl,
}: {
  menu: MenuSectionRow[];
  whatsappUrl: string;
}) {
  const [active, setActive] = useState<string>("all");
  const visible = active === "all" ? menu : menu.filter((m) => m.slug === active);

  return (
    <>
      <section className="pt-36 md:pt-44 pb-12 bg-kuro-black">
        <div className="max-w-[1280px] mx-auto px-gutter">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-10 bg-kuro-graphite" />
            <span className="label-tracked">Menú · 御品書</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-h1 text-kuro-cream max-w-3xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            La carta,
            <br />
            <span className="display-italic text-kuro-stone">de hoy.</span>
          </motion.h1>
        </div>
      </section>

      <div className="sticky top-20 md:top-24 z-30 bg-kuro-black/90 backdrop-blur-xl border-b border-kuro-smoke/60">
        <div className="max-w-[1280px] mx-auto px-gutter">
          <div className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar py-4 snap-x">
            <FilterPill active={active === "all"} onClick={() => setActive("all")} label="Todos" />
            {menu.map((m) => (
              <FilterPill
                key={m.slug}
                active={active === m.slug}
                onClick={() => setActive(m.slug)}
                label={m.title}
              />
            ))}
          </div>
        </div>
      </div>

      <section className="max-w-[1280px] mx-auto px-gutter py-section">
        {visible.map((s) => (
          <MenuCategory key={s.id} section={s} />
        ))}

        <div className="mt-16 border-t border-kuro-smoke pt-12 flex flex-col items-center text-center gap-5">
          <p
            className="text-kuro-cream text-xl md:text-2xl max-w-2xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "italic" }}
          >
            ¿Tienes alguna pregunta sobre el menú?
            <br />
            Escríbenos directamente por WhatsApp.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-7 py-4 bg-[#075E54] hover:bg-[#0a7a6e] text-white text-[11px] uppercase tracking-[0.28em] font-medium transition-colors min-h-[44px]"
          >
            <MessageCircle size={16} strokeWidth={1.6} />
            Preguntar por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 snap-start whitespace-nowrap px-5 py-2.5 text-[11px] uppercase tracking-[0.28em] border transition-all duration-300 ${
        active
          ? "bg-kuro-cream border-kuro-cream text-kuro-black"
          : "border-kuro-smoke text-kuro-stone hover:text-kuro-cream hover:border-kuro-graphite"
      }`}
    >
      {label}
    </button>
  );
}
