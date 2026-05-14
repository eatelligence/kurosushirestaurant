"use client";

import { m as motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { RESTAURANT } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

const HERO_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxMCI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEwIiBmaWxsPSIjMGEwYTBhIi8+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjUiIGZpbGw9IiMxYzFjMWMiIG9wYWNpdHk9IjAuNiIvPjwvc3ZnPg==";

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-kuro-black">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1553621042-f6e147245754?w=1280&q=70&auto=format&fit=crop"
          alt="Sushi premium en Kuro Caracas"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={HERO_BLUR}
          className="object-cover"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.1) 38%, rgba(10,10,10,0.75) 82%, rgba(10,10,10,1) 100%)",
          }}
        />
      </div>

      <div className="hidden md:block absolute top-0 bottom-0 left-6 lg:left-10 pointer-events-none">
        <div
          className="w-px h-full bg-gradient-to-b from-transparent via-kuro-gold/40 to-transparent opacity-0 animate-[heroFade_1s_ease-out_0.4s_forwards]"
        />
      </div>
      <div
        className="hidden md:block absolute right-6 lg:right-10 top-32 text-[10px] uppercase tracking-[0.4em] text-kuro-stone pointer-events-none opacity-0 animate-[heroFade_1s_ease-out_1.2s_forwards]"
        style={{ writingMode: "vertical-rl" }}
      >
        黒 · Caracas · 2024
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1" />
        <div className="px-gutter pb-20 md:pb-28 max-w-[1280px] w-full mx-auto">
          <div className="vert-line mb-8 origin-top scale-y-0 animate-[heroLine_0.9s_cubic-bezier(0.22,1,0.36,1)_0.2s_forwards]" />

          <div className="flex items-center gap-4 mb-8 opacity-0 translate-y-3 animate-[heroFadeUp_0.7s_cubic-bezier(0.22,1,0.36,1)_0.35s_forwards]">
            <span className="h-px w-10 bg-kuro-gold" />
            <span className="label-tracked">
              Gastronomía Japonesa · Los Palos Grandes
            </span>
            <span className="hidden sm:block h-px w-10 bg-kuro-gold" />
          </div>

          <h1 className="text-display text-kuro-cream max-w-[14ch]">
            <span className="block display-italic">El arte de</span>
            <span className="block display-italic text-kuro-red">lo oscuro.</span>
          </h1>

          <p
            className="mt-8 text-kuro-ivory/80 text-lg md:text-xl max-w-md leading-relaxed opacity-0 translate-y-3 animate-[heroFadeUp_0.7s_cubic-bezier(0.22,1,0.36,1)_0.95s_forwards]"
            style={{ fontWeight: 300 }}
          >
            Sushi contemporáneo en el corazón de Caracas. Un ritual de
            precisión, fuego y silencio.
          </p>

          <div className="mt-10 flex flex-col xs:flex-row gap-3 opacity-0 translate-y-3 animate-[heroFadeUp_0.7s_cubic-bezier(0.22,1,0.36,1)_1.15s_forwards]">
            <a
              href={RESTAURANT.whatsappReservation}
              target="_blank"
              rel="noreferrer"
              className="btn-primary group"
            >
              <span>Reservar por WhatsApp</span>
              <span className="block w-2 h-2 rounded-full bg-kuro-cream/80 group-hover:scale-150 transition-transform" />
            </a>
            <Link href="/menu" className="btn-outline-cream group">
              <span>Ver menú</span>
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-kuro-stone"
        >
          <span className="text-[12px] md:text-[10px] uppercase tracking-[0.32em]">Desliza</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={14} strokeWidth={1.4} aria-hidden="true" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
