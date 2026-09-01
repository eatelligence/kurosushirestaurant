import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Kuro Sushi: cocina japonesa contemporánea en Los Palos Grandes, Caracas.",
};

export default function NosotrosPage() {
  return (
    <>
      <section className="pt-36 md:pt-44 pb-12 bg-kuro-black">
        <div className="max-w-[1280px] mx-auto px-gutter">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-kuro-graphite" />
            <span className="label-tracked">Nosotros · 黒</span>
          </div>
          <h1
            className="text-h1 text-kuro-cream max-w-3xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            Cocina japonesa,
            <br />
            <span className="display-italic text-kuro-stone">hecha en Caracas.</span>
          </h1>
        </div>
      </section>

      <section className="py-section bg-kuro-black">
        <div className="max-w-[1280px] mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/salon-mesa.webp"
                alt="Mesa comunal del salón de Kuro Sushi"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <p
              className="text-kuro-ivory text-lg md:text-xl leading-relaxed max-w-xl"
              style={{ fontWeight: 300 }}
            >
              Kuro nació de una convicción simple: que la mejor cocina japonesa
              puede prepararse aquí, en Caracas, con la misma obsesión por la
              precisión que existe en Tokio.
            </p>
            <p
              className="mt-6 text-kuro-stone text-base md:text-lg leading-relaxed max-w-xl"
              style={{ fontWeight: 300 }}
            >
              No copiamos Japón. Lo respetamos, y desde ese respeto construimos
              algo nuevo: una cocina japonesa que también es caraqueña, abierta
              al producto local y al ritmo de la ciudad.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-8 max-w-xl">
              {[
                { kanji: "技", romaji: "Waza", title: "Técnica", body: "Cortes precisos, arroz preparado tres veces al día." },
                { kanji: "鮮", romaji: "Sen", title: "Frescura", body: "Pescado de mercado, seleccionado cada mañana." },
                { kanji: "間", romaji: "Ma", title: "Pausa", body: "Espacios entre platos, tiempos respetados." },
                { kanji: "黒", romaji: "Kuro", title: "Negro", body: "El color del silencio, de la elegancia, del ritual." },
              ].map((p) => (
                <div key={p.romaji} className="border-t border-kuro-smoke/60 pt-5">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span
                      className="text-kuro-cream text-2xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {p.kanji}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash">
                      {p.romaji} · {p.title}
                    </span>
                  </div>
                  <p className="text-sm text-kuro-stone leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[60svh] min-h-[420px] w-full overflow-hidden bg-kuro-black">
        <Image
          src="/images/atmosfera.webp"
          alt="Salón de Kuro Sushi con muro de piedra retroiluminado"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.65) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-center px-gutter">
          <h3
            className="text-kuro-cream text-3xl md:text-5xl max-w-3xl leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "italic" }}
          >
            "El sushi es el protagonista.
            <br />
            Todo lo demás, su marco."
          </h3>
        </div>
      </section>
    </>
  );
}
