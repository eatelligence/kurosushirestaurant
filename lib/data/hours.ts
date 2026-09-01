import "server-only";
import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { HoursGroup, HoursRow } from "./types";

const CACHE_TAG = "hours";
const DAY_NAMES_ES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function hhmm(t: string | null): string | null {
  if (!t) return null;
  // Supabase returns time as "HH:MM:SS"
  const [h, m] = t.split(":");
  return `${h}:${m}`;
}

function fmtRange(open: string | null, close: string | null) {
  return `${hhmm(open) ?? "—"} — ${hhmm(close) === "00:00" ? "24:00" : hhmm(close) ?? "—"}`;
}

async function fetchRawHours(): Promise<HoursRow[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("opening_hours")
    .select("*")
    .order("day", { ascending: true });
  if (error) throw new Error(`Failed to load hours: ${error.message}`);
  return (data ?? []).map((d) => ({
    day: d.day,
    open: d.open_time,
    close: d.close_time,
    closed: d.closed,
  }));
}

export const getHoursRaw = unstable_cache(fetchRawHours, ["hours-raw"], {
  tags: [CACHE_TAG],
  revalidate: 60,
});

// Group consecutive days with the same hours into ranges (e.g. "Domingo — Miércoles 12:00 — 22:00")
export async function getHoursGrouped(): Promise<HoursGroup[]> {
  const rows = await getHoursRaw();
  if (rows.length === 0) return [];

  const groups: HoursGroup[] = [];
  let start = 0;

  const sig = (r: HoursRow) => (r.closed ? "X" : `${r.open}-${r.close}`);

  for (let i = 1; i <= rows.length; i++) {
    const prev = rows[i - 1];
    const curr = rows[i];
    if (!curr || sig(curr) !== sig(prev)) {
      const r = prev;
      const days =
        start === i - 1
          ? DAY_NAMES_ES[r.day]
          : `${DAY_NAMES_ES[rows[start].day]} — ${DAY_NAMES_ES[r.day]}`;
      const time = r.closed ? "Cerrado" : fmtRange(r.open, r.close);
      groups.push({ days, time });
      start = i;
    }
  }
  return groups;
}

export const HOURS_TAG = CACHE_TAG;
