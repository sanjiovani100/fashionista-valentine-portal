import { Hero } from "@/components/sections/hero/Hero";

interface HeroSectionProps {
  title: string;
  description: string;
  backgroundImage: string;
}

export const HeroSection = ({ title, description, backgroundImage }: HeroSectionProps) => {
  return (
    <section className="relative">
      <Hero 
        headline={title}
        subheading={description}
        backgroundImage={backgroundImage}
      />
    </section>
  );
};