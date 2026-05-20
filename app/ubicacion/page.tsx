"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m as motion } from "framer-motion";
import { Check, Clock, MapPin, MessageCircle, Phone, CreditCard } from "lucide-react";
import { RESTAURANT } from "@/lib/constants";

const LocationMap = dynamic(() => import("@/components/home/LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[440px] h-full border border-kuro-smoke bg-kuro-charcoal flex items-center justify-center">
      <span className="text-kuro-ash text-[10px] uppercase tracking-[0.32em]">
        Cargando mapa…
      </span>
    </div>
  ),
});

const schema = z.object({
  name: z.string().min(2, "Por favor ingresa tu nombre completo"),
  phone: z.string().min(7, "Número de WhatsApp inválido"),
  message: z.string().min(5, "Cuéntanos brevemente tu consulta"),
});

type FormData = z.infer<typeof schema>;

const WHATSAPP_NUMBER = "582125551234";

function buildWhatsAppLink(d: FormData) {
  const lines = [
    `*Contacto · Kuro Sushi*`,
    ``,
    `Nombre: ${d.name}`,
    `WhatsApp: ${d.phone}`,
    ``,
    d.message,
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function UbicacionPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const url = buildWhatsAppLink(data);
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <>
      <section className="pt-36 md:pt-44 pb-12 bg-kuro-black">
        <div className="max-w-[1280px] mx-auto px-gutter">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-kuro-graphite" />
            <span className="label-tracked">Ubicación · 場所</span>
          </div>
          <h1
            className="text-h1 text-kuro-cream max-w-3xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            Los Palos Grandes,
            <br />
            <span className="display-italic text-kuro-stone">Caracas.</span>
          </h1>
          <p className="mt-6 text-kuro-stone text-base md:text-lg max-w-xl leading-relaxed">
            3ra Avenida, a una cuadra del parque. Fácil acceso y estacionamiento
            disponible.
          </p>
        </div>
      </section>

      <section className="pb-section bg-kuro-black">
        <div className="max-w-[1280px] mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative min-h-[440px] lg:min-h-[560px]"
          >
            <LocationMap />
          </motion.div>

          <aside className="lg:col-span-5 flex flex-col gap-7">
            <InfoBlock icon={MapPin} title="Dirección">
              <p className="text-sm text-kuro-ivory leading-relaxed">
                {RESTAURANT.address.street}<br />
                {RESTAURANT.address.city}
              </p>
            </InfoBlock>

            <InfoBlock icon={Clock} title="Horarios">
              <ul className="space-y-2 text-sm">
                {RESTAURANT.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4">
                    <span className="text-kuro-ash">{h.days}</span>
                    <span className="text-kuro-cream">{h.time}</span>
                  </li>
                ))}
              </ul>
            </InfoBlock>

            <InfoBlock icon={Phone} title="Contacto directo">
              <ul className="text-sm text-kuro-ivory leading-relaxed space-y-2">
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
              </ul>
            </InfoBlock>

            <InfoBlock icon={CreditCard} title="Pagos aceptados">
              <p className="text-sm text-kuro-ivory leading-relaxed">
                {RESTAURANT.payments.join(" · ")}
              </p>
            </InfoBlock>
          </aside>
        </div>
      </section>

      <section className="py-section bg-kuro-black border-t border-kuro-smoke/40">
        <div className="max-w-[1280px] mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-kuro-graphite" />
              <span className="label-tracked">Escríbenos</span>
            </div>
            <h2
              className="text-h2 text-kuro-cream"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              Pedidos y consultas
              <br />
              <span className="display-italic text-kuro-stone">por WhatsApp.</span>
            </h2>
            <p className="mt-6 text-kuro-stone text-base leading-relaxed max-w-md">
              Te respondemos en menos de dos horas. Completa los datos abajo y
              al enviar abrimos WhatsApp con tu mensaje listo.
            </p>

            <a
              href={RESTAURANT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#075E54] hover:bg-[#0a7a6e] text-white text-[11px] uppercase tracking-[0.28em] font-medium transition-colors min-h-[48px]"
            >
              <MessageCircle size={16} strokeWidth={1.6} aria-hidden="true" />
              Abrir WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7"
          >
            {submitted ? (
              <div className="bg-kuro-obsidian border border-kuro-smoke p-10 md:p-14 text-center">
                <div className="w-14 h-14 rounded-full border border-kuro-graphite flex items-center justify-center text-kuro-cream mx-auto mb-6">
                  <Check size={22} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h2
                  className="text-h2 text-kuro-cream"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                >
                  ¡Listo!
                </h2>
                <p className="mt-4 text-kuro-stone max-w-md mx-auto leading-relaxed">
                  Hemos abierto WhatsApp con tu solicitud. Envíanos el mensaje
                  y te responderemos en menos de 2 horas.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-[11px] uppercase tracking-[0.28em] text-kuro-stone hover:text-kuro-cream transition-colors"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-kuro-obsidian/50 border border-kuro-smoke/60 p-6 md:p-10 space-y-6"
              >
                <Field label="Nombre completo" error={errors.name?.message} required>
                  <input
                    {...register("name")}
                    placeholder="María González"
                    className="input"
                    autoComplete="name"
                  />
                </Field>

                <Field label="WhatsApp" error={errors.phone?.message} required>
                  <input
                    {...register("phone")}
                    placeholder="+58 414 555 5555"
                    className="input"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </Field>

                <Field label="Mensaje" error={errors.message?.message} required>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Pedido, consulta sobre el menú, evento privado, alergias…"
                    className="input resize-none"
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-3 w-full px-7 py-4 bg-[#075E54] hover:bg-[#0a7a6e] text-white text-[11px] uppercase tracking-[0.28em] font-medium transition-colors min-h-[48px] disabled:opacity-60"
                >
                  <MessageCircle size={16} strokeWidth={1.6} aria-hidden="true" />
                  {isSubmitting ? "Abriendo WhatsApp…" : "Enviar por WhatsApp"}
                </button>

                <p className="text-[11px] text-kuro-ash leading-relaxed">
                  Al enviar abriremos WhatsApp con tu mensaje pre-cargado.
                  Tus datos no se almacenan en este sitio.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          background: transparent;
          border: 1px solid #2A2A2A;
          color: #F5F2EC;
          padding: 14px 16px;
          min-height: 48px;
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 300;
          outline: none;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        :global(.input:focus) {
          border-color: #8A8A8A;
          background: rgba(28, 28, 28, 0.4);
        }
        :global(.input::placeholder) {
          color: #5A5A5A;
        }
      `}</style>
    </>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block label-tracked-stone mb-2.5">
        {label}{required && <span className="text-kuro-cream ml-1" aria-hidden="true">*</span>}
      </span>
      {children}
      {error && (
        <span role="alert" className="block mt-1.5 text-[11px] text-kuro-stone">
          {error}
        </span>
      )}
    </label>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l border-kuro-graphite pl-6 py-2">
      <div className="flex items-center gap-3 mb-3">
        <Icon size={14} strokeWidth={1.5} className="text-kuro-stone" aria-hidden="true" />
        <span className="label-tracked-stone">{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
