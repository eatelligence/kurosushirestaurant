"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Field } from "@/components/admin/Field";
import { updateBanner } from "@/lib/actions/settings";
import type { Settings } from "@/lib/data/types";

export function BannerForm({ initial }: { initial: Settings["banner"] }) {
  const [active, setActive] = useState(initial.active);
  const [text, setText] = useState(initial.text ?? "");
  const [pending, start] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const res = await updateBanner({ banner_active: active, banner_text: text || null });
          if (res.ok) toast.success(active ? "Anuncio activado" : "Anuncio guardado");
          else toast.error(res.error);
        });
      }}
      className="space-y-6"
    >
      <label className="flex items-center gap-3 border border-kuro-smoke px-5 py-4 cursor-pointer hover:border-kuro-graphite transition-colors">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          className="accent-kuro-cream w-4 h-4"
        />
        <span className="text-[12px] uppercase tracking-[0.22em] text-kuro-cream">
          {active ? "Anuncio activo en el sitio" : "Anuncio desactivado"}
        </span>
      </label>

      <Field
        label="Texto del anuncio"
        hint={`${text.length}/140 caracteres. Sé breve y directo.`}
      >
        <textarea
          rows={2}
          maxLength={140}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ej: Cerrado por feriado el 5 de julio."
          className="admin-textarea"
        />
      </Field>

      <div>
        <div className="text-[10px] uppercase tracking-[0.32em] text-kuro-ash mb-3">Vista previa</div>
        {active && text ? (
          <div className="bg-kuro-cream text-kuro-black border border-kuro-graphite text-center py-2.5 text-[11px] uppercase tracking-[0.32em] font-medium">
            {text}
          </div>
        ) : (
          <div className="border border-dashed border-kuro-smoke text-center py-2.5 text-[11px] uppercase tracking-[0.32em] text-kuro-ash">
            Sin anuncio
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-kuro-smoke">
        <button type="submit" disabled={pending} className="admin-btn-primary">
          {pending ? "Guardando…" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
