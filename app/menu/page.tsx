"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { menuData, RESTAURANT } from "@/lib/constants";
import { MenuCategory } from "@/components/menu/MenuCategory";
import { MessageCircle } from "lucide-react";

export default function MenuPage() {
  const [active, setActive] = useState<string>("all");
  const visible = active === "all" ? menuData : menuData.filter((m) => m.id === active);

  return (
    <>
      <section className="relative h-[58svh] min-h-[420px] w-full overflow-hidden bg-kuro-black">
        <Image
          src="https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=2000&q=85"
          alt="Menú Kuro Sushi"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,1) 100%)",
          }}
        />
        <div className="relative z-10 h-full flex flex-col justify-end px-gutter pb-16 md:pb-24 max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="h-px w-10 bg-kuro-gold" />
            <span className="label-tracked">Carta · Kuro Sushi</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="text-h1 text-kuro-cream max-w-3xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            Nuestra <span className="display-italic text-kuro-red">Carta</span>.
            <br />
            Una declaración de intenciones.
          </motion.h1>
        </div>
      </section>

      <div className="sticky top-20 md:top-24 z-30 bg-kuro-black/85 backdrop-blur-xl border-b border-kuro-smoke/60">
        <div className="max-w-[1280px] mx-auto px-gutter">
          <div className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar py-4 snap-x">
            <FilterPill active={active === "all"} onClick={() => setActive("all")} label="Todos" />
            {menuData.map((m) => (
              <FilterPill
                key={m.id}
                active={active === m.id}
                onClick={() => setActive(m.id)}
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
            href={RESTAURANT.whatsappMenu}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-7 py-4 bg-[#25D366] hover:bg-[#1da851] text-white text-[12px] uppercase tracking-[0.2em] font-medium transition-colors"
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
      className={`shrink-0 snap-start whitespace-nowrap px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] border transition-all duration-300 ${
        active
          ? "bg-kuro-red border-kuro-red text-kuro-cream"
          : "border-kuro-smoke text-kuro-stone hover:text-kuro-cream hover:border-kuro-gold/40"
      }`}
    >
      {label}
    </button>
  );
}
