"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    kanji: "間",
    word: "Ma",
    sub: "El arte japonés del espacio",
    body:
      "Creemos que el gran sushi comienza con el silencio: el espacio entre los sabores, la pausa entre dos bocados.",
  },
  {
    kanji: "旨味",
    word: "Umami",
    sub: "El quinto sabor",
    body:
      "Cada ingrediente se elige en su punto exacto de temporada y se prepara para revelar su esencia verdadera.",
  },
  {
    kanji: "職人",
    word: "Shokunin",
    sub: "El maestro artesano",
    body:
      "Detrás de cada pieza: años de práctica, la disciplina de la tradición y la paciencia del oficio.",
  },
];

export function Philosophy() {
  return (
    <section className="relative bg-kuro-obsidian py-section overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#1C1C1C 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative max-w-[1280px] mx-auto px-gutter">
        <div className="mb-16 md:mb-24 flex items-end justify-between gap-8 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-kuro-gold/60" />
              <span className="label-tracked">Filosofía</span>
            </div>
            <h2
              className="text-h1 text-kuro-cream max-w-3xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              Tres principios.
              <br />
              <span className="display-italic text-kuro-red">Una obsesión.</span>
            </h2>
          </div>
          <p
            className="text-kuro-stone text-sm md:text-base max-w-md leading-relaxed"
            style={{ fontWeight: 300 }}
          >
            Kuro no es solo un restaurante. Es la traducción al español de una
            tradición milenaria que respetamos pieza por pieza.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-kuro-smoke/50">
          {pillars.map((p, i) => (
            <motion.article
              key={p.word}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-kuro-obsidian px-6 py-12 md:px-10 md:py-16 flex flex-col items-center text-center group hover:bg-kuro-charcoal transition-colors duration-700"
            >
              <div className="relative">
                <span
                  className="text-[80px] md:text-[96px] leading-none text-kuro-red/90 group-hover:text-kuro-red transition-colors"
                  style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300 }}
                >
                  {p.kanji}
                </span>
                <span className="absolute inset-0 flex items-center justify-center text-kuro-red blur-2xl opacity-30 text-[80px] md:text-[96px]" aria-hidden>
                  {p.kanji}
                </span>
              </div>
              <div className="mt-4 flex flex-col items-center gap-1">
                <span className="text-[11px] uppercase tracking-[0.32em] text-kuro-gold">
                  {p.word}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-kuro-stone">
                  {p.sub}
                </span>
              </div>
              <div className="my-7 w-10 h-px bg-kuro-smoke" />
              <p
                className="text-kuro-ivory/75 max-w-xs text-[15px] leading-[1.85]"
                style={{ fontWeight: 300 }}
              >
                {p.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
