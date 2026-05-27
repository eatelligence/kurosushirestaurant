import { getSettings } from "@/lib/data/settings";
import { getHoursGrouped } from "@/lib/data/hours";
import { UbicacionPageClient } from "./UbicacionPageClient";

export const revalidate = 60;

export default async function UbicacionPage() {
  const [settings, hours] = await Promise.all([getSettings(), getHoursGrouped()]);
  return <UbicacionPageClient settings={settings} hours={hours} />;
}
