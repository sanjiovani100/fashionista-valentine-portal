import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PageHeroProps {
  headline: string;
  subheading: string;
  role: "model" | "designer" | "sponsor";
  className?: string;
}

export const PageHero = ({ headline, subheading, role, className }: PageHeroProps) => {
  const backgroundImage = role === "sponsor" 
    ? "/lovable-uploads/30ae724b-7186-449a-ba71-b9438b79458f.png"
    : "/fashionistas-logo.png";

  return (
    <section 
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        "bg-gradient-to-b from-pure-black to-deep-purple",
        className
      )}
      role="banner"
      aria-labelledby="hero-title"
    >
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s]
                   hover:scale-110"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black/90
                   backdrop-blur-sm"
        aria-hidden="true"
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-fashion-pink/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-deep-purple/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content Container */}
      <div className="container relative z-20 max-w-[800px] mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {/* Heading */}
          <motion.h1 
            id="hero-title"
            className="font-poppins text-hero font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {headline}
          </motion.h1>
          
          {/* Subheading */}
          <motion.p 
            className="font-montserrat text-body-large text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subheading}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            role="group"
            aria-label="Sponsorship actions"
          >
            <Button 
              size="lg"
              className="bg-primary-gradient hover:bg-hover-gradient active:bg-active-gradient
                       backdrop-blur-sm border border-white/10
                       min-w-[200px] h-[48px] px-8 font-medium
                       transition-all duration-300 ease-out transform hover:scale-105
                       hover:shadow-[0_0_20px_rgba(255,0,204,0.3)]"
            >
              Become a Sponsor
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="bg-black/20 backdrop-blur-sm border border-white/10
                       min-w-[200px] h-[48px] px-8 font-medium
                       transition-all duration-300 hover:bg-black/40
                       transform hover:scale-105
                       hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};