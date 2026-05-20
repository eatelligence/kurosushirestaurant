import Link from "next/link";
import { Instagram, MessageCircle, Music2 } from "lucide-react";
import { RESTAURANT, navLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-black border-t border-kuro-smoke/60 relative overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-gutter pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Link href="/" className="block">
              <div
                className="text-kuro-cream text-[28px] tracking-[0.32em]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                KURO
              </div>
              <div className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mt-1">
                Sushi Restaurant
              </div>
            </Link>
            <p
              className="mt-8 text-kuro-stone text-lg leading-relaxed max-w-sm"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "italic" }}
            >
              "Cocina japonesa en el corazón de Caracas."
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="label-tracked-stone mb-5">Navegación</h2>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-kuro-ivory hover:text-kuro-cream text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="label-tracked-stone mb-5">Horarios</h2>
            <ul className="space-y-3 text-sm text-kuro-ivory">
              {RESTAURANT.hours.map((h) => (
                <li key={h.days} className="flex flex-col">
                  <span className="text-kuro-ash text-[10px] uppercase tracking-[0.28em]">
                    {h.days}
                  </span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="label-tracked-stone mb-5">Contacto</h2>
            <ul className="space-y-3 text-sm text-kuro-ivory">
              <li>
                <a href={RESTAURANT.phoneHref} className="hover:text-kuro-cream transition-colors">
                  {RESTAURANT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${RESTAURANT.email}`}
                  className="hover:text-kuro-cream transition-colors break-all"
                >
                  {RESTAURANT.email}
                </a>
              </li>
              <li className="text-kuro-ash leading-relaxed pt-2">
                {RESTAURANT.address.street}<br />
                {RESTAURANT.address.city}
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-4">
              <a
                href={RESTAURANT.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 border border-kuro-smoke flex items-center justify-center text-kuro-stone hover:text-kuro-cream hover:border-kuro-graphite transition-colors"
              >
                <Instagram size={16} strokeWidth={1.4} />
              </a>
              <a
                href={RESTAURANT.social.tiktok}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 border border-kuro-smoke flex items-center justify-center text-kuro-stone hover:text-kuro-cream hover:border-kuro-graphite transition-colors"
              >
                <Music2 size={16} strokeWidth={1.4} />
              </a>
              <a
                href={RESTAURANT.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 border border-kuro-smoke flex items-center justify-center text-kuro-stone hover:text-kuro-cream hover:border-kuro-graphite transition-colors"
              >
                <MessageCircle size={16} strokeWidth={1.4} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-kuro-smoke/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-kuro-ash">
          <p>© {new Date().getFullYear()} Kuro Sushi Restaurant · Los Palos Grandes, Caracas</p>
          <p>Todos los derechos reservados</p>
        </div>

        <div className="mt-4 text-[10px] tracking-[0.2em] text-kuro-ash text-center md:text-right">
          Proudly powered by{" "}
          <a
            href="https://www.eatelligence.au/"
            target="_blank"
            rel="noreferrer"
            className="text-kuro-stone hover:text-kuro-cream transition-colors"
          >
            Eatelligence
          </a>{" "}
          ·{" "}
          <a
            href="https://www.salvorincione.com/"
            target="_blank"
            rel="noreferrer"
            className="text-kuro-stone hover:text-kuro-cream transition-colors"
          >
            Salvo Rincione
          </a>
        </div>
      </div>
    </footer>
  );
}
