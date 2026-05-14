import Link from "next/link";
import { Instagram, MessageCircle, Music2 } from "lucide-react";
import { RESTAURANT } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-black border-t border-kuro-gold/25 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px hairline-x" />
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
              <div className="text-[12px] md:text-[10px] uppercase tracking-[0.3em] text-kuro-stone mt-1">
                Sushi Restaurant
              </div>
            </Link>
            <p
              className="mt-8 text-kuro-stone text-lg leading-relaxed max-w-sm"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "italic" }}
            >
              "El arte japonés en el corazón de Caracas."
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="label-tracked-stone mb-5">Navegación</h2>
            <ul className="space-y-3">
              {[
                { href: "/menu", label: "Menú" },
                { href: "/about", label: "Nuestra Historia" },
                { href: "/reservations", label: "Reservaciones" },
                { href: "#location", label: "Contacto" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-kuro-cream/80 hover:text-kuro-gold text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="label-tracked-stone mb-5">Horarios</h2>
            <ul className="space-y-3 text-sm text-kuro-cream/80">
              {RESTAURANT.hours.map((h) => (
                <li key={h.days} className="flex flex-col">
                  <span className="text-kuro-stone text-[12px] md:text-[11px] uppercase tracking-[0.18em]">
                    {h.days}
                  </span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="label-tracked-stone mb-5">Contacto</h2>
            <ul className="space-y-3 text-sm text-kuro-cream/80">
              <li>
                <a href={RESTAURANT.phoneHref} className="hover:text-kuro-gold transition-colors">
                  {RESTAURANT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${RESTAURANT.email}`}
                  className="hover:text-kuro-gold transition-colors break-all"
                >
                  {RESTAURANT.email}
                </a>
              </li>
              <li className="text-kuro-stone leading-relaxed pt-2">
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
                className="w-10 h-10 border border-kuro-smoke flex items-center justify-center text-kuro-stone hover:text-kuro-gold hover:border-kuro-gold/60 transition-colors"
              >
                <Instagram size={16} strokeWidth={1.4} />
              </a>
              <a
                href={RESTAURANT.social.tiktok}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 border border-kuro-smoke flex items-center justify-center text-kuro-stone hover:text-kuro-gold hover:border-kuro-gold/60 transition-colors"
              >
                <Music2 size={16} strokeWidth={1.4} />
              </a>
              <a
                href={RESTAURANT.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 border border-kuro-smoke flex items-center justify-center text-kuro-stone hover:text-kuro-gold hover:border-kuro-gold/60 transition-colors"
              >
                <MessageCircle size={16} strokeWidth={1.4} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-kuro-smoke/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-[12px] md:text-[11px] uppercase tracking-[0.2em] text-kuro-stone">
          <p>© {new Date().getFullYear()} Kuro Sushi Restaurant · Los Palos Grandes, Caracas</p>
          <p className="flex items-center gap-3">
            <span>Todos los derechos reservados</span>
            <span className="w-1 h-1 rounded-full bg-kuro-red inline-block" />
            <span>Hecho con obsesión</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
