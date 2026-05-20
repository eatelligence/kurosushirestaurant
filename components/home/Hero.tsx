import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-kuro-black grain">
      {/* Vertical hairlines flanking the wordmark */}
      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1480px] pointer-events-none">
        <div className="absolute top-0 bottom-0 left-6 lg:left-10 w-px bg-gradient-to-b from-transparent via-kuro-graphite to-transparent opacity-0 animate-[heroFade_1.2s_ease-out_0.3s_forwards]" />
        <div className="absolute top-0 bottom-0 right-6 lg:right-10 w-px bg-gradient-to-b from-transparent via-kuro-graphite to-transparent opacity-0 animate-[heroFade_1.2s_ease-out_0.3s_forwards]" />
      </div>

      {/* Vertical context label, top-right */}
      <div
        className="hidden md:block absolute right-10 lg:right-14 top-28 text-[10px] uppercase tracking-[0.4em] text-kuro-ash pointer-events-none opacity-0 animate-[heroFade_1.2s_ease-out_1s_forwards]"
        style={{ writingMode: "vertical-rl" }}
      >
        Caracas · Los Palos Grandes
      </div>

      {/* Vertical kanji, bottom-left */}
      <div
        className="hidden md:block absolute left-10 lg:left-14 bottom-32 text-[11px] uppercase tracking-[0.4em] text-kuro-ash pointer-events-none opacity-0 animate-[heroFade_1.2s_ease-out_1s_forwards]"
        style={{ writingMode: "vertical-rl" }}
      >
        黒 · 寿司
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-gutter">
        {/* Top thin vertical line + eyebrow */}
        <div className="flex flex-col items-center gap-6 mb-10 md:mb-14">
          <div className="vert-line origin-top scale-y-0 animate-[heroLine_1s_cubic-bezier(0.22,1,0.36,1)_0.2s_forwards]" />
          <span className="label-tracked opacity-0 animate-[heroFade_0.9s_ease-out_0.8s_forwards]">
            Gastronomía Japonesa · Est. 2024
          </span>
        </div>

        {/* The wordmark */}
        <h1
          className="text-display text-kuro-cream text-center opacity-0 translate-y-2 animate-[heroFadeUp_1.1s_cubic-bezier(0.22,1,0.36,1)_0.5s_forwards]"
          style={{ fontWeight: 300, letterSpacing: "0.04em" }}
        >
          KURO
        </h1>

        {/* Subtitle */}
        <div className="mt-6 md:mt-8 flex items-center gap-5 opacity-0 animate-[heroFade_0.9s_ease-out_1.1s_forwards]">
          <span className="h-px w-10 md:w-16 bg-kuro-graphite" />
          <span className="text-[11px] md:text-[12px] uppercase tracking-[0.5em] text-kuro-stone">
            Sushi Restaurant
          </span>
          <span className="h-px w-10 md:w-16 bg-kuro-graphite" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-kuro-ash opacity-0 animate-[heroFade_0.9s_ease-out_1.4s_forwards]">
        <span className="text-[10px] uppercase tracking-[0.4em]">Desliza</span>
        <ArrowDown size={14} strokeWidth={1.2} aria-hidden="true" className="animate-bounce" />
      </div>
    </section>
  );
}
