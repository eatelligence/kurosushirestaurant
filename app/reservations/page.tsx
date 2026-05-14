"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m as motion } from "framer-motion";
import { Check, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { RESTAURANT } from "@/lib/constants";

const schema = z.object({
  name: z.string().min(2, "Por favor ingresa tu nombre completo"),
  email: z.string().email("Correo electrónico inválido"),
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

export default function ReservationsPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { occasion: "Ninguna" },
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 700));
    const subject = encodeURIComponent(`Nueva reservación · ${data.name}`);
    const body = encodeURIComponent(
      `Nombre: ${data.name}\nEmail: ${data.email}\nWhatsApp: ${data.phone}\nFecha: ${data.date}\nHora: ${data.time}\nPersonas: ${data.guests}\nOcasión: ${data.occasion ?? "Ninguna"}\nNotas: ${data.notes ?? ""}`
    );
    window.location.href = `mailto:${RESTAURANT.reservationsEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      <section className="relative pt-36 md:pt-44 pb-12 bg-kuro-black overflow-hidden">
        <div className="absolute -top-32 right-0 w-[420px] h-[420px] rounded-full bg-kuro-red/15 blur-[120px] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-gutter">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-kuro-gold" />
            <span className="label-tracked">Reservaciones · 予約</span>
          </div>
          <h1
            className="text-h1 text-kuro-cream max-w-3xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            Reserva tu lugar
            <br />
            <span className="display-italic text-kuro-red">en la penumbra.</span>
          </h1>
          <p className="mt-6 text-kuro-stone text-base md:text-lg max-w-xl leading-relaxed">
            Confirmamos cada reservación personalmente por WhatsApp en menos de
            dos horas.
          </p>
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
            {submitted ? (
              <div className="bg-kuro-obsidian border border-kuro-gold/30 p-10 md:p-14 text-center">
                <div className="w-14 h-14 rounded-full border border-kuro-gold/40 flex items-center justify-center text-kuro-gold mx-auto mb-6">
                  <Check size={22} strokeWidth={1.5} />
                </div>
                <h2
                  className="text-h2 text-kuro-cream"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                >
                  ¡Reservación recibida!
                </h2>
                <p className="mt-4 text-kuro-stone max-w-md mx-auto leading-relaxed">
                  Te contactaremos por WhatsApp en menos de 2 horas para
                  confirmar todos los detalles.
                </p>
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
                  />
                </Field>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Correo electrónico" error={errors.email?.message} required>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="tu@correo.com"
                      className="input"
                    />
                  </Field>
                  <Field label="WhatsApp" error={errors.phone?.message} required>
                    <input
                      {...register("phone")}
                      placeholder="+58 414 555 5555"
                      className="input"
                    />
                  </Field>
                </div>

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

                <Field label="Peticiones especiales">
                  <textarea
                    {...register("notes")}
                    rows={4}
                    placeholder="Alergias, preferencias, asientos…"
                    className="input resize-none"
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center disabled:opacity-60"
                >
                  {isSubmitting ? "Enviando…" : "Solicitar reservación →"}
                </button>

                <p className="text-[12px] md:text-[11px] text-kuro-stone leading-relaxed">
                  Al solicitar tu reserva aceptas ser contactado por WhatsApp
                  para la confirmación. Tus datos no se comparten con terceros.
                </p>
              </form>
            )}
          </motion.div>

          <aside className="lg:col-span-5 flex flex-col gap-8">
            <InfoBlock icon={Clock} title="Horarios">
              <ul className="space-y-2 text-sm">
                {RESTAURANT.hours.map((h) => (
                  <li key={h.days} className="flex justify-between">
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

            <InfoBlock icon={MessageCircle} title="WhatsApp directo">
              <p className="text-sm text-kuro-stone leading-relaxed mb-3">
                Si prefieres, escríbenos directamente y reservamos por ti.
              </p>
              <a
                href={RESTAURANT.whatsappReservation}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#1da851] text-sm uppercase tracking-[0.2em]"
              >
                <MessageCircle size={14} strokeWidth={1.5} />
                Reservar por WhatsApp →
              </a>
            </InfoBlock>

            <InfoBlock icon={Phone} title="Políticas">
              <ul className="text-sm text-kuro-stone leading-relaxed space-y-2">
                <li>· Mantenemos las mesas hasta 20 minutos después de la hora.</li>
                <li>· Grupos de 7+ personas requieren reserva mínima 48 h antes.</li>
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
        {label}{required && <span className="text-kuro-red ml-1">*</span>}
      </span>
      {children}
      {error && (
        <span className="block mt-1.5 text-[12px] md:text-[11px] text-kuro-red-light">
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
        <Icon size={14} strokeWidth={1.5} className="text-kuro-gold" />
        <span className="label-tracked-stone">{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
