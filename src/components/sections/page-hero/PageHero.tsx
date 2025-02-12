import { motion } from "framer-motion";
import { cx } from "@/lib/utils";
import { HeroBackground } from "./components/HeroBackground";
import { HeroContent } from "./components/HeroContent";
import { AnimatedBackground } from "./components/AnimatedBackground";

interface PageHeroProps {
  role: "model" | "designer" | "sponsor";
  className?: string;
}

export const PageHero = ({ role, className }: PageHeroProps) => {
  const backgroundImage = role === "sponsor" 
    ? "/lovable-uploads/30ae724b-7186-449a-ba71-b9438b79458f.png"
    : "/fashionistas-logo.png";

  return (
    <section 
      className={cx(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        "bg-gradient-to-b from-pure-black to-deep-purple",
        className
      )}
      role="banner"
      aria-labelledby="hero-title"
    >
      <HeroBackground backgroundImage={backgroundImage} />
      <AnimatedBackground />
      <HeroContent role={role} />
    </section>
  );
};


