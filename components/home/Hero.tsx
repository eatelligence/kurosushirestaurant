"use client";

import { m as motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-kuro-black">
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1553621042-f6e147245754?w=2400&q=85"
          alt="Sushi premium en Kuro Caracas"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.1) 38%, rgba(10,10,10,0.7) 82%, rgba(10,10,10,1) 100%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-overlay opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(192,57,43,0.3), transparent 50%), radial-gradient(circle at 80% 70%, rgba(201,169,110,0.18), transparent 55%)",
          }}
        />
      </motion.div>

      {/* Side rails — Japanese editorial markers */}
      <div className="hidden md:flex absolute top-0 bottom-0 left-6 lg:left-10 flex-col items-center pointer-events-none">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, ease, delay: 0.4 }}
          style={{ transformOrigin: "top" }}
          className="w-px flex-1 bg-gradient-to-b from-transparent via-kuro-gold/40 to-transparent"
        />
      </div>
      <div className="hidden md:flex absolute top-0 bottom-0 right-6 lg:right-10 flex-col items-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-32 text-[12px] md:text-[10px] uppercase tracking-[0.4em] text-kuro-stone vertical-rl"
          style={{ writingMode: "vertical-rl" }}
        >
          黒 · Caracas · 2024
        </motion.div>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1" />
        <div className="px-gutter pb-20 md:pb-28 max-w-[1280px] w-full mx-auto">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, ease, delay: 0.3 }}
            style={{ transformOrigin: "top" }}
            className="vert-line mb-8"
          />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="h-px w-10 bg-kuro-gold" />
            <span className="label-tracked">
              Gastronomía Japonesa · Los Palos Grandes
            </span>
            <span className="hidden sm:block h-px w-10 bg-kuro-gold" />
          </motion.div>

          <h1 className="text-display text-kuro-cream max-w-[14ch]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease, delay: 0.9 }}
                className="block display-italic"
              >
                El arte de
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease, delay: 1.1 }}
                className="block display-italic text-kuro-red"
              >
                lo oscuro.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.4 }}
            className="mt-8 text-kuro-ivory/80 text-lg md:text-xl max-w-md leading-relaxed"
            style={{ fontWeight: 300 }}
          >
            Sushi contemporáneo en el corazón de Caracas. Un ritual de
            precisión, fuego y silencio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.7 }}
            className="mt-10 flex flex-col xs:flex-row gap-3"
          >
            <Link href="/reservations" className="btn-primary group">
              <span>Reservar mesa</span>
              <span className="block w-2 h-2 rounded-full bg-kuro-cream/80 group-hover:scale-150 transition-transform" />
            </Link>
            <Link href="/menu" className="btn-outline-cream group">
              <span>Ver menú</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-kuro-stone"
        >
          <span className="text-[12px] md:text-[10px] uppercase tracking-[0.32em]">Desliza</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={14} strokeWidth={1.4} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
