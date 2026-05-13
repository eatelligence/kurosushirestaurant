"use client";

import { motion } from "framer-motion";
import type { MenuSection } from "@/lib/constants";
import { DishCard } from "./DishCard";

export function MenuCategory({ section }: { section: MenuSection }) {
  return (
    <section id={section.id} className="scroll-mt-32 mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="flex items-end justify-between gap-6 border-b border-kuro-gold/30 pb-6 mb-2"
      >
        <div className="flex items-baseline gap-5">
          <span
            className="text-kuro-red/70 text-[44px] md:text-[56px] leading-none"
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300 }}
          >
            {section.kanji}
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.32em] text-kuro-gold mb-1">
              {section.romanji}
            </span>
            <h3
              className="text-kuro-cream text-[28px] md:text-[40px] leading-none"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              {section.title}
            </h3>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-[0.22em] text-kuro-stone hidden sm:block">
          {section.items.length} platos
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
        {section.items.map((item, i) => (
          <DishCard key={item.name} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
