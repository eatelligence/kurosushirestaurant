import { getMenu } from "@/lib/data/menu";
import { getSettings } from "@/lib/data/settings";
import { MenuPageClient } from "./MenuPageClient";

export const revalidate = 60;

export default async function MenuPage() {
  const [menu, settings] = await Promise.all([getMenu(), getSettings()]);
  return <MenuPageClient menu={menu} whatsappUrl={settings.whatsappMenuUrl} />;
}
