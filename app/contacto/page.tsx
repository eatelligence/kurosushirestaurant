"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m as motion } from "framer-motion";
import { Check, Clock, MapPin, MessageCircle, Phone, CreditCard } from "lucide-react";
import { RESTAURANT } from "@/lib/constants";

const schema = z.object({
  name: z.string().min(2, "Por favor ingresa tu nombre completo"),
  phone: z.string().min(7, "Número de WhatsApp inválido"),
  date: z.string().min(1, "Selecciona una fecha"),
  time: z.string().min(1, "Selecciona una hora"),
  guests: z.string().min(1, "Indica el número de personas"),
  occasion: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const times = ["12:00","12:30","13:00","13:30","14:00","19:00","19:30","20:00","20:30","21:00","21:30","22:00"];
const guests = ["1","2","3-4","5-6","7+"];
const occasions = ["Ninguna","Cumpleaños","Aniversario","Cena de negocios","Otro"];

const WHATSAPP_NUMBER = "582125551234";

function buildWhatsAppLink(d: FormData) {
  const lines = [
    `*Reservación · Kuro Sushi*`,
    ``,
    `Nombre: ${d.name}`,
    `WhatsApp: ${d.phone}`,
    `Fecha: ${d.date}`,
    `Hora: ${d.time}`,
    `Personas: ${d.guests}`,
    d.occasion && d.occasion !== "Ninguna" ? `Ocasión: ${d.occasion}` : null,
    d.notes ? `Notas: ${d.notes}` : null,
  ].filter(Boolean);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { occasion: "Ninguna" },
  });

  const onSubmit = (data: FormData) => {
    const url = buildWhatsAppLink(data);
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <>
      <section className="relative pt-36 md:pt-44 pb-12 bg-kuro-black overflow-hidden">
        <div className="absolute -top-32 right-0 w-[420px] h-[420px] rounded-full bg-kuro-red/15 blur-[120px] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-gutter">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-kuro-gold" />
            <span className="label-tracked">Contacto · 連絡</span>
          </div>
          <h1
            className="text-h1 text-kuro-cream max-w-3xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            Contáctanos
            <br />
            <span className="display-italic text-kuro-red">por WhatsApp.</span>
          </h1>
          <p className="mt-6 text-kuro-stone text-base md:text-lg max-w-xl leading-relaxed">
            Reservas, pedidos y consultas: todo se gestiona en tiempo real por
            WhatsApp. Te respondemos en menos de dos horas.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={RESTAURANT.whatsappReservation}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#075E54] hover:bg-[#0a7a6e] text-white text-[12px] uppercase tracking-[0.2em] font-medium transition-colors min-h-[48px]"
            >
              <MessageCircle size={16} strokeWidth={1.6} aria-hidden="true" />
              Reservar por WhatsApp
            </a>
            <a
              href={RESTAURANT.phoneHref}
              className="btn-outline-cream"
            >
              <Phone size={14} strokeWidth={1.5} aria-hidden="true" />
              <span>Llamar al restaurante</span>
            </a>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32 lg:pb-40 bg-kuro-black">
        <div className="max-w-[1280px] mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-kuro-gold/60" />
              <span className="label-tracked">Formulario rápido</span>
            </div>
            <p className="text-kuro-stone text-sm leading-relaxed mb-6 max-w-xl">
              Si prefieres, completa los datos abajo y al enviar abrimos
              WhatsApp con tu mensaje listo.
            </p>

            {submitted ? (
              <div className="bg-kuro-obsidian border border-kuro-gold/30 p-10 md:p-14 text-center">
                <div className="w-14 h-14 rounded-full border border-kuro-gold/40 flex items-center justify-center text-kuro-gold mx-auto mb-6">
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
                  y te confirmaremos la reserva en menos de 2 horas.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-[12px] uppercase tracking-[0.22em] text-kuro-gold hover:text-kuro-red transition-colors"
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Field label="Fecha" error={errors.date?.message} required>
                    <input type="date" {...register("date")} className="input" />
                  </Field>
                  <Field label="Hora" error={errors.time?.message} required>
                    <select {...register("time")} className="input" defaultValue="">
                      <option value="" disabled>Seleccionar</option>
                      {times.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Personas" error={errors.guests?.message} required>
                    <select {...register("guests")} className="input" defaultValue="">
                      <option value="" disabled>Seleccionar</option>
                      {guests.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Ocasión especial">
                  <select {...register("occasion")} className="input">
                    {occasions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Mensaje (opcional)">
                  <textarea
                    {...register("notes")}
                    rows={4}
                    placeholder="Alergias, preferencias, asientos, pedido especial…"
                    className="input resize-none"
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-3 w-full px-7 py-4 bg-[#075E54] hover:bg-[#0a7a6e] text-white text-[12px] uppercase tracking-[0.2em] font-medium transition-colors min-h-[48px] disabled:opacity-60"
                >
                  <MessageCircle size={16} strokeWidth={1.6} aria-hidden="true" />
                  {isSubmitting ? "Abriendo WhatsApp…" : "Enviar por WhatsApp"}
                </button>

                <p className="text-[12px] md:text-[11px] text-kuro-stone leading-relaxed">
                  Al enviar abriremos WhatsApp con tu mensaje pre-cargado.
                  Tus datos no se almacenan en este sitio.
                </p>
              </form>
            )}
          </motion.div>

          <aside className="lg:col-span-5 flex flex-col gap-8">
            <InfoBlock icon={Clock} title="Horarios">
              <ul className="space-y-2 text-sm">
                {RESTAURANT.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4">
                    <span className="text-kuro-stone">{h.days}</span>
                    <span className="text-kuro-cream">{h.time}</span>
                  </li>
                ))}
              </ul>
            </InfoBlock>

            <InfoBlock icon={MapPin} title="Ubicación">
              <p className="text-sm text-kuro-cream/90 leading-relaxed">
                {RESTAURANT.address.street}<br />
                {RESTAURANT.address.city}
              </p>
            </InfoBlock>

            <InfoBlock icon={Phone} title="Contacto directo">
              <ul className="text-sm text-kuro-cream/90 leading-relaxed space-y-2">
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
              </ul>
            </InfoBlock>

            <InfoBlock icon={CreditCard} title="Pagos aceptados">
              <p className="text-sm text-kuro-cream/90 leading-relaxed">
                {RESTAURANT.payments.join(" · ")}
              </p>
            </InfoBlock>

            <InfoBlock icon={MessageCircle} title="Políticas">
              <ul className="text-sm text-kuro-stone leading-relaxed space-y-2">
                <li>· Mantenemos las mesas hasta 20 min después de la hora.</li>
                <li>· Grupos de 7+ personas: reserva mínima 48 h antes.</li>
                <li>· Eventos privados: <a href={`mailto:${RESTAURANT.email}`} className="text-kuro-gold hover:text-kuro-red transition-colors">{RESTAURANT.email}</a></li>
              </ul>
            </InfoBlock>
          </aside>
        </div>
      </section>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          background: transparent;
          border: 1px solid #2A2A2A;
          color: #F5F0E8;
          padding: 14px 16px;
          min-height: 48px;
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 300;
          outline: none;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        :global(.input:focus) {
          border-color: #C9A96E;
          background: rgba(28, 28, 28, 0.4);
        }
        :global(.input::placeholder) {
          color: #6c625b;
        }
        :global(select.input option) {
          background: #111111;
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
        {label}{required && <span className="text-kuro-red ml-1" aria-hidden="true">*</span>}
      </span>
      {children}
      {error && (
        <span role="alert" className="block mt-1.5 text-[12px] md:text-[11px] text-kuro-red-light">
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
    <div className="border-l border-kuro-gold/30 pl-6 py-2">
      <div className="flex items-center gap-3 mb-3">
        <Icon size={14} strokeWidth={1.5} className="text-kuro-gold" aria-hidden="true" />
        <span className="label-tracked-stone">{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
