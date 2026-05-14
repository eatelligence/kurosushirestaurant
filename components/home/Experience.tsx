"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { num: "23+", label: "Variedades en menú" },
  { num: "4.9", label: "Valoración promedio", suffix: "★" },
  { num: "$12—30", label: "Por persona, desde" },
];

export function Experience() {
  return (
    <section className="relative py-section bg-kuro-obsidian overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-kuro-red/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full bg-kuro-gold/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          className="lg:col-span-7 relative aspect-[5/6] lg:aspect-[4/5] overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1600&q=85"
            alt="Interior de Kuro Sushi"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-kuro-black/60 via-transparent to-transparent" />
          <div className="absolute top-6 left-6 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-kuro-red" />
            <span className="text-[12px] md:text-[10px] uppercase tracking-[0.32em] text-kuro-cream/80">
              Interior · Los Palos Grandes
            </span>
          </div>
        </motion.div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-kuro-gold/60" />
              <span className="label-tracked">La Experiencia Kuro</span>
            </div>
            <h2
              className="text-h1 text-kuro-cream"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              Más que una cena.
              <br />
              <span className="display-italic text-kuro-red">Una memoria.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-7 text-kuro-ivory/80 text-base md:text-lg leading-relaxed max-w-md"
            style={{ fontWeight: 300 }}
          >
            En Kuro hemos diseñado cada detalle: la penumbra cálida, la música
            que no interfiere, la distancia entre mesas que permite la
            conversación.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 text-kuro-stone text-base max-w-md leading-relaxed"
            style={{ fontWeight: 300, fontStyle: "italic", fontFamily: "var(--font-display)", fontSize: "18px" }}
          >
            El sushi es el protagonista. Todo lo demás, su marco.
          </motion.p>

          <div className="mt-12 grid grid-cols-3 gap-4 md:gap-6 border-t border-kuro-smoke/60 pt-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                className="flex flex-col gap-2"
              >
                <span
                  className="text-kuro-gold text-3xl md:text-4xl"
                  style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400 }}
                >
                  {s.num}
                  {s.suffix && <span className="text-kuro-red ml-1">{s.suffix}</span>}
                </span>
                <span className="text-[12px] md:text-[10px] uppercase tracking-[0.22em] text-kuro-stone leading-snug">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
