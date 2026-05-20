import Image from "next/image";
import type { Metadata } from "next";
import { featuredDishes, igImages } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Galería",
  description:
    "Galería visual de Kuro Sushi: piezas, rolls y atmósfera del restaurante.",
};

const photos = [
  { src: featuredDishes[0].image, alt: featuredDishes[0].name, span: "col-span-2 row-span-2 aspect-square" },
  { src: featuredDishes[1].image, alt: featuredDishes[1].name, span: "aspect-square" },
  { src: featuredDishes[2].image, alt: featuredDishes[2].name, span: "aspect-square" },
  { src: featuredDishes[3].image, alt: featuredDishes[3].name, span: "col-span-2 aspect-[2/1]" },
  { src: igImages[0], alt: "Plato Kuro", span: "aspect-square" },
  { src: igImages[1], alt: "Plato Kuro", span: "aspect-square" },
  { src: igImages[2], alt: "Plato Kuro", span: "row-span-2 aspect-[1/2]" },
  { src: igImages[3], alt: "Plato Kuro", span: "aspect-square" },
  { src: igImages[4], alt: "Plato Kuro", span: "aspect-square" },
  { src: igImages[5], alt: "Plato Kuro", span: "col-span-2 aspect-[2/1]" },
  { src: igImages[6], alt: "Plato Kuro", span: "aspect-square" },
  { src: igImages[7], alt: "Plato Kuro", span: "aspect-square" },
];

export default function GaleriaPage() {
  return (
    <>
      <section className="pt-36 md:pt-44 pb-12 bg-kuro-black">
        <div className="max-w-[1480px] mx-auto px-gutter">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-kuro-graphite" />
            <span className="label-tracked">Galería · 写真</span>
          </div>
          <h1
            className="text-h1 text-kuro-cream max-w-3xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            La cocina,
            <br />
            <span className="display-italic text-kuro-stone">en imágenes.</span>
          </h1>
        </div>
      </section>

      <section className="pb-section bg-kuro-black">
        <div className="max-w-[1480px] mx-auto px-gutter">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-auto">
            {photos.map((p, i) => (
              <figure
                key={`${p.src}-${i}`}
                className={`relative overflow-hidden bg-kuro-charcoal ${p.span}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.04]"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
