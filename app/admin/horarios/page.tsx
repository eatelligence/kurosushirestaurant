import { getHoursRaw } from "@/lib/data/hours";
import { HoursForm } from "./HoursForm";

export const dynamic = "force-dynamic";

export default async function HorariosPage() {
  const hours = await getHoursRaw();
  return (
    <main className="pt-20 lg:pt-12 px-6 lg:px-10 pb-16 max-w-3xl">
      <header className="mb-10">
        <div className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-3">
          Horarios
        </div>
        <h1 className="text-kuro-cream text-3xl md:text-4xl" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
          Horarios de apertura
        </h1>
        <p className="text-kuro-stone mt-3 text-sm leading-relaxed">
          Para los días que cierran después de medianoche, indica <strong className="text-kuro-cream">00:00</strong> como hora de cierre.
        </p>
      </header>
      <HoursForm hours={hours} />
    </main>
  );
}
