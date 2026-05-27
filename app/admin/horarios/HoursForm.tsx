"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateHours } from "@/lib/actions/hours";
import type { HoursRow } from "@/lib/data/types";

const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

type FormRow = { day: number; open_time: string; close_time: string; closed: boolean };

export function HoursForm({ hours }: { hours: HoursRow[] }) {
  const [rows, setRows] = useState<FormRow[]>(() => {
    const seed: FormRow[] = [];
    for (let d = 0; d < 7; d++) {
      const found = hours.find((h) => h.day === d);
      seed.push({
        day: d,
        open_time: found?.open?.slice(0, 5) ?? "12:00",
        close_time: found?.close?.slice(0, 5) ?? "22:00",
        closed: found?.closed ?? false,
      });
    }
    return seed;
  });
  const [pending, start] = useTransition();

  function patch(day: number, change: Partial<FormRow>) {
    setRows((curr) => curr.map((r) => (r.day === day ? { ...r, ...change } : r)));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const payload = rows.map((r) => ({
          day: r.day,
          open_time: r.closed ? null : r.open_time,
          close_time: r.closed ? null : r.close_time,
          closed: r.closed,
        }));
        start(async () => {
          const res = await updateHours(payload);
          if (res.ok) toast.success("Horarios actualizados");
          else toast.error(res.error);
        });
      }}
      className="space-y-3"
    >
      {rows.map((r) => (
        <div
          key={r.day}
          className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 border border-kuro-smoke px-4 sm:px-6 py-4"
        >
          <div className="w-28 text-[12px] uppercase tracking-[0.22em] text-kuro-cream">
            {DAYS[r.day]}
          </div>

          <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-kuro-stone">
            <input
              type="checkbox"
              checked={r.closed}
              onChange={(e) => patch(r.day, { closed: e.target.checked })}
              className="accent-kuro-cream"
            />
            Cerrado
          </label>

          <div className="flex-1 flex items-center gap-3">
            <input
              type="time"
              value={r.open_time}
              onChange={(e) => patch(r.day, { open_time: e.target.value })}
              disabled={r.closed}
              className="admin-input flex-1 disabled:opacity-40"
            />
            <span className="text-kuro-ash">—</span>
            <input
              type="time"
              value={r.close_time}
              onChange={(e) => patch(r.day, { close_time: e.target.value })}
              disabled={r.closed}
              className="admin-input flex-1 disabled:opacity-40"
            />
          </div>
        </div>
      ))}

      <div className="pt-4 border-t border-kuro-smoke">
        <button type="submit" disabled={pending} className="admin-btn-primary">
          {pending ? "Guardando…" : "Guardar horarios"}
        </button>
      </div>
    </form>
  );
}
