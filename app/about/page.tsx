import Image from "next/image";
import type { Metadata } from "next";
import { Philosophy } from "@/components/home/Philosophy";

export const metadata: Metadata = {
  title: "Nuestra Historia",
  description:
    "Conoce la historia de Kuro Sushi: una obsesión por la precisión japonesa en el corazón de Caracas.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[60svh] min-h-[440px] w-full overflow-hidden bg-kuro-black">
        <Image
          src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=2000&q=85"
          alt="Manos de chef preparando sushi"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.35) 45%, rgba(10,10,10,1) 100%)",
          }}
        />
        <div className="relative z-10 h-full flex flex-col justify-end px-gutter pb-16 md:pb-24 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-kuro-gold" />
            <span className="label-tracked">Acerca de · 黒</span>
          </div>
          <h1
            className="text-h1 text-kuro-cream max-w-3xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            Nuestra <span className="display-italic text-kuro-red">Historia</span>.
          </h1>
        </div>
      </section>

      <section className="py-section bg-kuro-black">
        <div className="max-w-3xl mx-auto px-gutter text-center">
          <p
            className="text-kuro-cream text-2xl md:text-[34px] leading-[1.5]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "italic" }}
          >
            "Kuro nació de una convicción simple: que el mejor sushi del mundo
            puede prepararse en Caracas, si se tiene la obsesión correcta."
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-kuro-gold/60" />
            <span className="label-tracked-stone">El equipo de Kuro · 2024</span>
            <span className="h-px w-12 bg-kuro-gold/60" />
          </div>
        </div>
      </section>

      <Philosophy />

      <section className="py-section bg-kuro-black">
        <div className="max-w-[1280px] mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1607301406259-dfb186e15de8?w=1400&q=85"
              alt="Chef de Kuro Sushi"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-kuro-black/40 to-transparent" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-kuro-gold/60" />
              <span className="label-tracked">El Chef</span>
            </div>
            <h2
              className="text-h1 text-kuro-cream"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              La mano detrás de
              <br />
              <span className="display-italic text-kuro-red">cada pieza.</span>
            </h2>
            <p
              className="mt-7 text-kuro-ivory/80 text-base md:text-lg leading-relaxed max-w-md"
              style={{ fontWeight: 300 }}
            >
              Más de quince años de práctica diaria. Estudios en Tokio,
              residencias en Lima y São Paulo. Una sola obsesión: que el sushi
              llegue a la mesa exactamente como debe ser.
            </p>
            <p
              className="mt-5 text-kuro-stone text-base leading-relaxed max-w-md"
              style={{ fontWeight: 300 }}
            >
              En Kuro no copiamos Japón. Lo respetamos, y desde ese respeto
              construimos algo nuevo: una cocina japonesa que también es
              caraqueña.
            </p>
          </div>
        </div>
      </section>

      <section className="relative h-[70svh] min-h-[480px] w-full overflow-hidden bg-kuro-black">
        <Image
          src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=2400&q=85"
          alt="Atmósfera Kuro"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-kuro-black/40" />
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
