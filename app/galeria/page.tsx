import Image from "next/image";
import type { Metadata } from "next";
import { getGallery } from "@/lib/data/gallery";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Galería",
  description:
    "Galería visual de Kuro Sushi: piezas, rolls y atmósfera del restaurante.",
};

const SPANS = [
  "col-span-2 row-span-2 aspect-square",
  "aspect-square",
  "aspect-square",
  "col-span-2 aspect-[2/1]",
  "aspect-square",
  "aspect-square",
  "row-span-2 aspect-[1/2]",
  "aspect-square",
  "aspect-square",
  "col-span-2 aspect-[2/1]",
  "aspect-square",
  "aspect-square",
];

export default async function GaleriaPage() {
  const photos = await getGallery();

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
                key={p.id}
                className={`relative overflow-hidden bg-kuro-charcoal ${SPANS[i % SPANS.length]}`}
              >
                <Image
                  src={p.url}
                  alt={p.alt ?? "Kuro Sushi"}
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
