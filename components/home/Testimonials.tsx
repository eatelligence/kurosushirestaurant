"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/constants";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const next = () => setI((p) => (p + 1) % testimonials.length);
  const prev = () => setI((p) => (p - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[i];

  return (
    <section
      className="relative py-section bg-kuro-obsidian overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="absolute inset-0 opacity-[0.5] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#1C1C1C 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative max-w-[1080px] mx-auto px-gutter text-center">
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="h-px w-10 bg-kuro-gold/60" />
          <span className="label-tracked">Lo que dicen</span>
          <span className="h-px w-10 bg-kuro-gold/60" />
        </div>

        <div className="relative">
          <span
            aria-hidden
            className="absolute -top-12 left-1/2 -translate-x-1/2 text-kuro-red/25 select-none"
            style={{ fontFamily: "var(--font-display)", fontSize: "180px", lineHeight: 1, fontStyle: "italic" }}
          >
            "
          </span>

          <div className="relative min-h-[280px] md:min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <p
                  className="text-2xl md:text-[34px] leading-[1.35] text-kuro-cream max-w-3xl"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "italic" }}
                >
                  {t.text}
                </p>

                <div className="flex items-center gap-1.5 mt-10 text-kuro-red">
                  {Array.from({ length: t.rating ?? 5 }).map((_, k) => (
                    <Star key={k} size={12} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>

                <div className="mt-5 flex flex-col items-center gap-1">
                  <span className="text-kuro-cream text-sm tracking-[0.04em]">
                    — {t.author}
                  </span>
                  <span className="text-[12px] md:text-[10px] uppercase tracking-[0.28em] text-kuro-stone">
                    {t.location}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            onClick={prev}
            aria-label="Anterior"
            className="w-11 h-11 border border-kuro-smoke hover:border-kuro-gold/60 text-kuro-stone hover:text-kuro-gold transition-colors flex items-center justify-center"
          >
            <ChevronLeft size={16} strokeWidth={1.4} />
          </button>
          <div className="flex items-center gap-1">
            {testimonials.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Ver testimonio ${k + 1} de ${testimonials.length}`}
                aria-current={k === i ? "true" : undefined}
                className="relative w-11 h-11 flex items-center justify-center group"
              >
                <span
                  className={`block h-px transition-all duration-500 ${
                    k === i
                      ? "w-10 bg-kuro-red"
                      : "w-4 bg-kuro-smoke group-hover:bg-kuro-stone"
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Siguiente"
            className="w-11 h-11 border border-kuro-smoke hover:border-kuro-gold/60 text-kuro-stone hover:text-kuro-gold transition-colors flex items-center justify-center"
          >
            <ChevronRight size={16} strokeWidth={1.4} />
          </button>
        </div>
      </div>
    </section>
  );
}
