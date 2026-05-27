import { Hero } from "@/components/home/Hero";
import { DishesStrip } from "@/components/home/DishesStrip";
import { Location } from "@/components/home/Location";
import { getSettings } from "@/lib/data/settings";
import { getHoursGrouped } from "@/lib/data/hours";
import { getGallery } from "@/lib/data/gallery";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, hours, gallery] = await Promise.all([
    getSettings(),
    getHoursGrouped(),
    getGallery(),
  ]);

  return (
    <>
      <Hero />
      <DishesStrip photos={gallery.filter((p) => p.featured).length > 0 ? gallery.filter((p) => p.featured) : gallery} />
      <Location settings={settings} hours={hours} />
    </>
  );
}
