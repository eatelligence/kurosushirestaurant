"use client";

import { m as motion } from "framer-motion";
import { Flame, Sparkle } from "lucide-react";
import type { MenuItemRow } from "@/lib/data/types";

export function DishCard({ item, index }: { item: MenuItemRow; index: number }) {
  const unavailable = !item.available;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.05 }}
      className={`group flex gap-5 py-6 border-b border-kuro-smoke/60 hover:border-kuro-graphite transition-colors ${
        unavailable ? "opacity-50" : ""
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3
            className={`text-[20px] md:text-[22px] leading-tight ${
              unavailable ? "line-through text-kuro-mist" : "text-kuro-cream"
            }`}
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            {item.name}
          </h3>
          {unavailable && (
            <span className="inline-flex items-center text-[10px] uppercase tracking-[0.28em] text-kuro-stone border border-kuro-graphite px-2 py-0.5">
              Agotado
            </span>
          )}
          {item.signature && !unavailable && (
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.28em] text-kuro-stone border border-kuro-graphite px-2 py-0.5">
              <Sparkle size={10} strokeWidth={1.5} />
              Signature
            </span>
          )}
          {item.spicy && !unavailable && (
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.28em] text-kuro-stone border border-kuro-graphite px-2 py-0.5">
              <Flame size={10} strokeWidth={1.5} />
              Picante
            </span>
          )}
        </div>
        {item.description && (
          <p
            className="mt-2 text-kuro-ash text-[13px] md:text-sm leading-relaxed max-w-prose"
            style={{ fontWeight: 300 }}
          >
            {item.description}
          </p>
        )}
      </div>

      <div className="shrink-0 flex flex-col items-end gap-1">
        <span
          className="text-kuro-cream text-xl md:text-2xl"
          style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400 }}
        >
          ${item.price.toFixed(0)}
        </span>
        <span className="h-px w-8 bg-kuro-smoke group-hover:w-12 group-hover:bg-kuro-mist transition-all duration-500" />
      </div>
    </motion.div>
  );
}
