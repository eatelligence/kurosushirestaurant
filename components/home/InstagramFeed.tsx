"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { igImages, RESTAURANT } from "@/lib/constants";

export function InstagramFeed() {
  const tiles = [...igImages, ...igImages]; // duplicate for marquee feel on desktop
  return (
    <section className="py-section bg-kuro-obsidian overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-gutter flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-kuro-gold/60" />
            <span className="label-tracked">Síguenos</span>
          </div>
          <h3
            className="text-h2 text-kuro-cream"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            <a
              href={RESTAURANT.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-kuro-gold transition-colors"
            >
              {RESTAURANT.social.instagramHandle}
            </a>
          </h3>
        </div>
        <a
          href={RESTAURANT.social.instagram}
          target="_blank"
          rel="noreferrer"
          className="btn-outline-cream"
        >
          <Instagram size={14} strokeWidth={1.4} />
          <span>Seguir en Instagram</span>
        </a>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-kuro-obsidian to-transparent z-10 pointer-events-none hidden md:block" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-kuro-obsidian to-transparent z-10 pointer-events-none hidden md:block" />

        <div className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar px-gutter snap-x snap-mandatory">
          {tiles.map((src, i) => (
            <motion.a
              key={i}
              href={RESTAURANT.social.instagram}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 8) * 0.05 }}
              className="relative shrink-0 w-[240px] sm:w-[260px] md:w-[280px] aspect-square overflow-hidden group snap-start"
            >
              <Image
                src={src}
                alt={`Kuro Sushi Instagram ${i + 1}`}
                fill
                sizes="280px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-kuro-red/0 group-hover:bg-kuro-red/35 transition-colors duration-500 flex items-center justify-center">
                <Instagram
                  size={32}
                  strokeWidth={1.2}
                  className="text-kuro-cream opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
