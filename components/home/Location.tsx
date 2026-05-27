"use client";

import dynamic from "next/dynamic";
import { MapPin, Clock, Phone } from "lucide-react";
import { m as motion } from "framer-motion";
import type { Settings, HoursGroup } from "@/lib/data/types";

const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[440px] h-full border border-kuro-smoke bg-kuro-charcoal flex items-center justify-center">
      <span className="text-kuro-ash text-[10px] uppercase tracking-[0.32em]">
        Cargando mapa…
      </span>
    </div>
  ),
});

export function Location({
  settings,
  hours,
}: {
  settings: Settings;
  hours: HoursGroup[];
}) {
  return (
    <section id="ubicacion" className="py-section bg-kuro-black">
      <div className="max-w-[1280px] mx-auto px-gutter">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-kuro-graphite" />
            <span className="label-tracked">Dónde estamos</span>
          </div>
          <h2
            className="text-h1 text-kuro-cream max-w-3xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            Los Palos Grandes,
            <br />
            <span className="display-italic text-kuro-stone">Caracas.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative min-h-[440px] lg:min-h-[520px] order-2 lg:order-1"
          >
            <LocationMap
              lat={settings.address.coords.lat}
              lng={settings.address.coords.lng}
              street={settings.address.street}
              name={settings.name}
            />
          </motion.div>

          <div className="order-1 lg:order-2 space-y-8">
            {[
              {
                icon: MapPin,
                title: "Dirección",
                body: (
                  <>
                    {settings.address.street}
                    <br />
                    {settings.address.city}
                  </>
                ),
              },
              {
                icon: Clock,
                title: "Horarios",
                body: (
                  <ul className="space-y-1.5">
                    {hours.map((h) => (
                      <li key={h.days} className="flex justify-between gap-6">
                        <span className="text-kuro-ash">{h.days}</span>
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
                    <a href={settings.phoneHref} className="hover:text-kuro-cream transition-colors">
                      {settings.phone}
                    </a>
                    <br />
                    <a
                      href={settings.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-kuro-stone hover:text-kuro-cream transition-colors"
                    >
                      WhatsApp ↗
                    </a>
                  </>
                ),
              },
            ].map((row, i) => (
              <motion.div
                key={row.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-6 border-t border-kuro-smoke/60 pt-6"
              >
                <div className="shrink-0 w-10 h-10 border border-kuro-smoke flex items-center justify-center text-kuro-stone">
                  <row.icon size={16} strokeWidth={1.3} />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-2">
                    {row.title}
                  </div>
                  <div className="text-kuro-ivory text-[15px] leading-relaxed">
                    {row.body}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
