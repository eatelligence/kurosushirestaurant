import { Hero } from "@/components/home/Hero";
import { DishesStrip } from "@/components/home/DishesStrip";
import { Location } from "@/components/home/Location";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DishesStrip />
      <Location />
    </>
  );
}
