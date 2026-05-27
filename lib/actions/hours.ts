"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { HOURS_TAG } from "@/lib/data/hours";

const HoursRow = z.object({
  day: z.number().int().gte(0).lte(6),
  open_time: z.string().regex(/^\d{2}:\d{2}$/).nullable(),
  close_time: z.string().regex(/^\d{2}:\d{2}$/).nullable(),
  closed: z.boolean(),
});
const HoursSchema = z.array(HoursRow).length(7);

export async function updateHours(input: unknown) {
  const parsed = HoursSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("opening_hours").upsert(parsed.data, {
    onConflict: "day",
  });
  if (error) return { ok: false as const, error: error.message };

  revalidateTag(HOURS_TAG);
  revalidatePath("/", "layout");
  return { ok: true as const };
}
