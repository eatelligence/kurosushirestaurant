"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Field } from "@/components/admin/Field";
import { updateSettings } from "@/lib/actions/settings";
import type { Settings } from "@/lib/data/types";

const COMMON_PAYMENTS = ["Efectivo USD", "Zelle", "Pago Móvil", "Tarjetas", "Binance Pay", "Bolívares"];

export function InfoForm({ settings }: { settings: Settings }) {
  const [pending, start] = useTransition();
  const [payments, setPayments] = useState<string[]>(settings.payments);

  function togglePayment(p: string) {
    setPayments((curr) => (curr.includes(p) ? curr.filter((x) => x !== p) : [...curr, p]));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const payload = {
          name: String(fd.get("name") ?? ""),
          tagline: String(fd.get("tagline") ?? "") || null,
          phone: String(fd.get("phone") ?? ""),
          whatsapp_number: String(fd.get("whatsapp_number") ?? "").replace(/\D/g, ""),
          email: String(fd.get("email") ?? ""),
          address_street: String(fd.get("address_street") ?? ""),
          address_city: String(fd.get("address_city") ?? ""),
          address_country: String(fd.get("address_country") ?? ""),
          lat: Number(fd.get("lat")),
          lng: Number(fd.get("lng")),
          instagram_url: String(fd.get("instagram_url") ?? "") || null,
          tiktok_url: String(fd.get("tiktok_url") ?? "") || null,
          instagram_handle: String(fd.get("instagram_handle") ?? "") || null,
          payments,
        };
        start(async () => {
          const res = await updateSettings(payload);
          if (res.ok) toast.success("Información actualizada");
          else toast.error(res.error);
        });
      }}
      className="space-y-8"
    >
      <fieldset className="space-y-5">
        <legend className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-4">Identidad</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Nombre del restaurante">
            <input name="name" defaultValue={settings.name} required className="admin-input" />
          </Field>
          <Field label="Tagline / lema" hint="Frase corta que se muestra en el pie de página.">
            <input name="tagline" defaultValue={settings.tagline ?? ""} className="admin-input" />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-4">Contacto</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Teléfono visible" hint="Cómo se muestra al cliente, ej. +58 412 685 0612">
            <input name="phone" defaultValue={settings.phone} required className="admin-input" />
          </Field>
          <Field label="Número de WhatsApp (solo dígitos)" hint="Ej. 584126850612, sin + ni espacios.">
            <input name="whatsapp_number" defaultValue={settings.whatsappNumber} required className="admin-input" inputMode="numeric" />
          </Field>
          <Field label="Email">
            <input name="email" type="email" defaultValue={settings.email} required className="admin-input" />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-4">Dirección</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Calle / lugar">
            <input name="address_street" defaultValue={settings.address.street} required className="admin-input" />
          </Field>
          <Field label="Ciudad">
            <input name="address_city" defaultValue={settings.address.city} required className="admin-input" />
          </Field>
          <Field label="País">
            <input name="address_country" defaultValue={settings.address.country} required className="admin-input" />
          </Field>
          <div />
          <Field label="Latitud" hint="Coordenada exacta del local. Usa Google Maps → click derecho → copiar coordenadas.">
            <input name="lat" type="number" step="any" defaultValue={settings.address.coords.lat} required className="admin-input" />
          </Field>
          <Field label="Longitud">
            <input name="lng" type="number" step="any" defaultValue={settings.address.coords.lng} required className="admin-input" />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-4">Redes sociales</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Instagram URL">
            <input name="instagram_url" defaultValue={settings.social.instagram ?? ""} className="admin-input" placeholder="https://instagram.com/..." />
          </Field>
          <Field label="@ Instagram (handle)">
            <input name="instagram_handle" defaultValue={settings.social.instagramHandle ?? ""} className="admin-input" placeholder="@kurosushi" />
          </Field>
          <Field label="TikTok URL">
            <input name="tiktok_url" defaultValue={settings.social.tiktok ?? ""} className="admin-input" placeholder="https://tiktok.com/@..." />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-4">Pagos aceptados</legend>
        <div className="flex flex-wrap gap-2">
          {COMMON_PAYMENTS.map((p) => {
            const active = payments.includes(p);
            return (
              <button
                key={p}
                type="button"
                onClick={() => togglePayment(p)}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.22em] border transition-colors ${
                  active
                    ? "bg-kuro-cream text-kuro-black border-kuro-cream"
                    : "border-kuro-smoke text-kuro-stone hover:text-kuro-cream hover:border-kuro-graphite"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="flex items-center gap-3 pt-4 border-t border-kuro-smoke">
        <button type="submit" disabled={pending} className="admin-btn-primary">
          {pending ? "Guardando…" : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}
