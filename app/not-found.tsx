import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[100svh] bg-kuro-black flex flex-col items-center justify-center text-center px-gutter relative overflow-hidden">
      <span
        className="block text-[160px] sm:text-[220px] md:text-[280px] leading-none text-kuro-graphite"
        style={{ fontFamily: "var(--font-display)", fontWeight: 200, fontStyle: "italic" }}
      >
        404
      </span>

      <div className="mt-4 flex items-center gap-3">
        <span className="h-px w-10 bg-kuro-graphite" />
        <span className="label-tracked">Página no encontrada</span>
        <span className="h-px w-10 bg-kuro-graphite" />
      </div>

      <h1
        className="mt-6 text-h2 text-kuro-cream max-w-2xl"
        style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
      >
        Esta página se perdió
        <br />
        <span className="display-italic text-kuro-stone">en la penumbra.</span>
      </h1>
      <p className="mt-5 text-kuro-stone max-w-md leading-relaxed">
        Pero el sushi te espera. Te llevamos de vuelta al comedor.
      </p>
      <div className="mt-10 flex flex-col xs:flex-row gap-3">
        <Link href="/" className="btn-outline-cream">Volver al inicio</Link>
        <Link href="/menu" className="btn-outline-cream">Ver menú</Link>
      </div>
    </section>
  );
}
