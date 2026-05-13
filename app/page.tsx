import { Hero } from "@/components/home/Hero";
import { Philosophy } from "@/components/home/Philosophy";
import { FeaturedDishes } from "@/components/home/FeaturedDishes";
import { Experience } from "@/components/home/Experience";
import { Testimonials } from "@/components/home/Testimonials";
import { Location } from "@/components/home/Location";
import { InstagramFeed } from "@/components/home/InstagramFeed";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <FeaturedDishes />
      <Experience />
      <Testimonials />
      <Location />
      <InstagramFeed />
    </>
  );
}
