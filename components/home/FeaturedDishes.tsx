"use client";

import Image from "next/image";
import Link from "next/link";
import { m as motion } from "framer-motion";
import { featuredDishes, type Dish } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";

const layout = [
  "md:col-span-8 md:row-span-1 aspect-[16/10]",
  "md:col-span-4 md:row-span-1 aspect-[4/5]",
  "md:col-span-4 md:row-span-1 aspect-[4/5]",
  "md:col-span-8 md:row-span-1 aspect-[16/10]",
];

function DishTile({ dish, className, index }: { dish: Dish; className: string; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group overflow-hidden bg-kuro-charcoal ${className}`}
    >
      <Image
        src={dish.image}
        alt={dish.name}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
      />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.05) 0%, rgba(10,10,10,0.05) 40%, rgba(10,10,10,0.92) 100%)",
        }}
      />
      <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
        <span className="text-[12px] md:text-[10px] uppercase tracking-[0.28em] text-kuro-gold backdrop-blur-md bg-kuro-black/40 px-3 py-1.5 border border-kuro-gold/20">
          {dish.category}
        </span>
        <span
          className="text-kuro-gold text-xl"
          style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400 }}
        >
          {dish.price}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <h3
          className="text-kuro-cream text-2xl md:text-[28px] leading-tight"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        >
          {dish.name}
        </h3>
        <p
          className="mt-2 text-kuro-ivory/70 text-sm max-w-[40ch] leading-relaxed"
          style={{ fontWeight: 300 }}
        >
          {dish.description}
        </p>
        <div className="mt-5 h-px w-12 bg-kuro-red group-hover:w-24 transition-all duration-700" />
      </div>
    </motion.article>
  );
}

export function FeaturedDishes() {
  return (
    <section className="py-section bg-kuro-black">
      <div className="max-w-[1280px] mx-auto px-gutter">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-20">
          <SectionHeader
            label="Nuestras Creaciones"
            kanji="味"
            title={
              <>
                Rolls que cuentan
                <br />
                <span className="display-italic text-kuro-red">historias.</span>
              </>
            }
            description="Cada pieza es una decisión. Cada ingrediente, una convicción."
          />
          <Link href="/menu" className="btn-outline-cream self-start md:self-end shrink-0">
            Menú completo
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {featuredDishes.map((dish, i) => (
            <DishTile key={dish.name} dish={dish} className={layout[i]} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
