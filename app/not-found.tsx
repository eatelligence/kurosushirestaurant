import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[100svh] bg-kuro-black flex flex-col items-center justify-center text-center px-gutter relative overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-kuro-red/15 blur-[160px] pointer-events-none" />

      <div className="relative">
        <span
          className="block text-[160px] sm:text-[220px] md:text-[280px] leading-none text-kuro-red"
          style={{ fontFamily: "var(--font-display)", fontWeight: 200, fontStyle: "italic" }}
        >
          404
        </span>
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center text-kuro-red blur-3xl opacity-40 text-[220px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          404
        </span>
      </div>

      <div className="relative mt-4 flex items-center gap-3">
        <span className="h-px w-10 bg-kuro-gold/60" />
        <span className="label-tracked">Página no encontrada</span>
        <span className="h-px w-10 bg-kuro-gold/60" />
      </div>

      <h1
        className="relative mt-6 text-h2 text-kuro-cream max-w-2xl"
        style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
      >
        Esta página se perdió
        <br />
        <span className="display-italic text-kuro-red">en la penumbra.</span>
      </h1>
      <p className="relative mt-5 text-kuro-stone max-w-md leading-relaxed">
        Pero el sushi te espera. Te llevamos de vuelta al comedor.
      </p>
      <div className="relative mt-10 flex flex-col xs:flex-row gap-3">
        <Link href="/" className="btn-primary">Volver al inicio</Link>
        <Link href="/menu" className="btn-outline-cream">Ver menú</Link>
      </div>
    </section>
  );
}
