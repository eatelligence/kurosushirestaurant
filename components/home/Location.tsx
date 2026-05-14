"use client";

import dynamic from "next/dynamic";
import { MapPin, Clock, Phone, CreditCard } from "lucide-react";
import { RESTAURANT } from "@/lib/constants";
import { m as motion } from "framer-motion";

const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[420px] h-full rounded-[12px] border border-kuro-smoke bg-kuro-charcoal flex items-center justify-center">
      <span className="text-kuro-stone text-[12px] md:text-[11px] uppercase tracking-[0.28em]">
        Cargando mapa…
      </span>
    </div>
  ),
});

export function Location() {
  return (
    <section id="location" className="py-section bg-kuro-black">
      <div className="max-w-[1280px] mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-kuro-gold/60" />
              <span className="label-tracked">Encuéntranos</span>
            </div>
            <h2
              className="text-h1 text-kuro-cream"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              En el corazón de
              <br />
              <span className="display-italic text-kuro-red">Los Palos Grandes.</span>
            </h2>
            <p
              className="mt-7 text-kuro-stone text-base leading-relaxed max-w-md"
              style={{ fontWeight: 300 }}
            >
              Estamos en la 3ra Avenida de Los Palos Grandes, a una cuadra del
              parque. Fácil acceso y estacionamiento disponible.
            </p>
          </motion.div>

          <div className="mt-10 space-y-7">
            {[
              {
                icon: MapPin,
                title: "Dirección",
                body: (
                  <>
                    {RESTAURANT.address.street}
                    <br />
                    {RESTAURANT.address.city}
                  </>
                ),
              },
              {
                icon: Clock,
                title: "Horarios",
                body: (
                  <ul className="space-y-1">
                    {RESTAURANT.hours.map((h) => (
                      <li key={h.days} className="flex justify-between gap-6">
                        <span className="text-kuro-stone">{h.days}</span>
                        <span>{h.time}</span>
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                icon: Phone,
                title: "Contacto",
                body: (
                  <>
                    <a href={RESTAURANT.phoneHref} className="hover:text-kuro-gold">
                      {RESTAURANT.phone}
                    </a>
                    <br />
                    <a
                      href={RESTAURANT.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="text-kuro-gold hover:text-kuro-red transition-colors"
                    >
                      WhatsApp disponible →
                    </a>
                  </>
                ),
              },
              {
                icon: CreditCard,
                title: "Pagos",
                body: RESTAURANT.payments.join(" · "),
              },
            ].map((row, i) => (
              <motion.div
                key={row.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-5 border-t border-kuro-smoke/60 pt-5"
              >
                <div className="shrink-0 w-10 h-10 border border-kuro-smoke flex items-center justify-center text-kuro-gold">
                  <row.icon size={16} strokeWidth={1.4} />
                </div>
                <div className="flex-1">
                  <div className="text-[12px] md:text-[10px] uppercase tracking-[0.28em] text-kuro-stone mb-2">
                    {row.title}
                  </div>
                  <div className="text-kuro-cream/90 text-[15px] leading-relaxed">
                    {row.body}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative min-h-[420px] lg:min-h-full"
        >
          <LocationMap />
          <div className="absolute -top-3 -left-3 w-12 h-12 border-l border-t border-kuro-gold/40 pointer-events-none" />
          <div className="absolute -bottom-3 -right-3 w-12 h-12 border-r border-b border-kuro-gold/40 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
