import { motion, useScroll, useTransform } from "framer-motion";
import { HeroBackground } from "./components/HeroBackground";
import { HeroContent } from "./components/HeroContent";
import { ScrollIndicator } from "./components/ScrollIndicator";
import { ScrollProgress } from "./components/ScrollProgress";
import { ImageErrorBoundary } from "@/components/cloudinary/components/ImageErrorBoundary";
import { CloudinaryImageError } from "@/components/cloudinary/components/CloudinaryImageError";

interface HeroProps {
  headline: string;
  subheading: string;
  backgroundImage?: string;
}

export const Hero = ({ 
  headline, 
  subheading, 
  backgroundImage = "hero-red-bg_spclrx" 
}: HeroProps) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 20]);

  const scrollToContent = () => {
    const contentSection = document.getElementById("event-highlights");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-maroon to-black"
      aria-labelledby="hero-title"
      role="banner"
    >
      <ImageErrorBoundary fallback={<CloudinaryImageError />}>
        <HeroBackground imageUrl={backgroundImage} />
      </ImageErrorBoundary>
      
      <motion.div 
        className="container relative z-20 mx-auto px-4 py-16 md:py-24 lg:py-32"
        style={{ opacity, scale, y }}
      >
        <HeroContent 
          headline={headline}
          subheading={subheading}
        />
      </motion.div>

      <ScrollIndicator onClick={scrollToContent} />
      <ScrollProgress />
    </section>
  );
};