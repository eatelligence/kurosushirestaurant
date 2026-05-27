"use client";

import Image from "next/image";
import Link from "next/link";
import { m as motion } from "framer-motion";
import type { GalleryPhoto } from "@/lib/data/types";

const ASPECTS = ["aspect-[4/5]", "aspect-square", "aspect-[4/5]", "aspect-square", "aspect-[4/5]", "aspect-square"] as const;

export function DishesStrip({ photos }: { photos: GalleryPhoto[] }) {
  const gallery = photos.slice(0, 6);
  if (gallery.length === 0) return null;

  return (
    <section className="py-section bg-kuro-black border-t border-kuro-smoke/40">
      <div className="max-w-[1280px] mx-auto px-gutter">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-kuro-graphite" />
              <span className="label-tracked">La carta</span>
            </div>
            <h2
              className="text-h1 text-kuro-cream max-w-2xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              Cocina del día,
              <br />
              <span className="display-italic text-kuro-stone">en imágenes.</span>
            </h2>
          </div>
          <Link
            href="/menu"
            className="text-[11px] uppercase tracking-[0.32em] text-kuro-stone hover:text-kuro-cream transition-colors inline-flex items-center gap-3 self-start md:self-end"
          >
            Ver el menú completo
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {gallery.map((img, i) => (
            <motion.figure
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
              className={`relative overflow-hidden bg-kuro-charcoal ${ASPECTS[i % ASPECTS.length]}`}
            >
              <Image
                src={img.url}
                alt={img.alt ?? "Kuro Sushi"}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.04]"
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
