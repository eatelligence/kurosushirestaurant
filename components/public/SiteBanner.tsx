import type { Settings } from "@/lib/data/types";

export function SiteBanner({ banner }: { banner: Settings["banner"] }) {
  if (!banner.active || !banner.text) return null;
  return (
    <div className="relative z-50 bg-kuro-cream text-kuro-black border-b border-kuro-graphite">
      <div className="max-w-[1480px] mx-auto px-gutter py-2.5 text-center text-[11px] uppercase tracking-[0.32em] font-medium">
        {banner.text}
      </div>
    </div>
  );
}
