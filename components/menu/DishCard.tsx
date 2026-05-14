"use client";

import { m as motion } from "framer-motion";
import { Flame, Sparkle } from "lucide-react";
import type { MenuItem } from "@/lib/constants";

export function DishCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.05 }}
      className="group flex gap-5 py-6 border-b border-kuro-smoke/60 hover:border-kuro-gold/30 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3
            className="text-kuro-cream text-[20px] md:text-[22px] leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            {item.name}
          </h3>
          {item.signature && (
            <span className="inline-flex items-center gap-1 text-[12px] md:text-[10px] uppercase tracking-[0.22em] text-kuro-gold border border-kuro-gold/40 px-2 py-0.5">
              <Sparkle size={10} strokeWidth={1.5} />
              Signature
            </span>
          )}
          {item.spicy && (
            <span className="inline-flex items-center gap-1 text-[12px] md:text-[10px] uppercase tracking-[0.22em] text-kuro-red border border-kuro-red/40 px-2 py-0.5">
              <Flame size={10} strokeWidth={1.5} />
              Picante
            </span>
          )}
        </div>
        <p
          className="mt-2 text-kuro-stone text-[13px] md:text-sm leading-relaxed max-w-prose"
          style={{ fontWeight: 300 }}
        >
          {item.desc}
        </p>
      </div>

      <div className="shrink-0 flex flex-col items-end gap-1">
        <span
          className="text-kuro-gold text-xl md:text-2xl"
          style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400 }}
        >
          ${item.price}
        </span>
        <span className="h-px w-8 bg-kuro-smoke group-hover:w-12 group-hover:bg-kuro-red transition-all duration-500" />
      </div>
    </motion.div>
  );
}
