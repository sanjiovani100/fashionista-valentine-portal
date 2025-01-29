import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/cloudinary";

interface HeroProps {
  headline: string;
  subheading: string;
  backgroundImage?: string;
}

export const Hero = ({ headline, subheading, backgroundImage = "hero-red-bg_spclrx" }: HeroProps) => {
  const scrollToContent = () => {
    const contentSection = document.getElementById("event-highlights");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-maroon to-black"
      aria-labelledby="hero-title"
      role="banner"
    >
      {/* Background with enhanced overlay */}
      <div className="absolute inset-0">
        <OptimizedImage
          publicId={backgroundImage}
          alt="Valentine's Fashion Event Background"
          className="w-full h-full object-cover"
          aspectRatio="video"
          priority={true}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-[2px]"
          aria-hidden="true"
        />
      </div>
      
      <div className="container relative z-20 mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12 md:space-y-8 text-center"
        >
          <motion.h1 
            id="hero-title"
            variants={itemVariants}
            className="font-montserrat text-4xl sm:text-5xl md:text-hero font-bold text-shadow-xl"
          >
            {headline.split(" ").map((word, index) => (
              <span 
                key={index} 
                className={index === 1 ? "block text-red-accent mt-4 drop-shadow-glow" : "text-white drop-shadow-glow"}
              >
                {word}{" "}
              </span>
            ))}
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="font-inter text-xl md:text-2xl max-w-2xl mx-auto text-white-secondary leading-relaxed drop-shadow-md"
          >
            {subheading}
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12"
          >
            <Button 
              size="lg" 
              className="bg-red-accent hover:bg-red-accent/90 text-white min-w-[200px]
                       transition-all duration-300 transform hover:scale-105
                       hover:shadow-[0_0_20px_rgba(255,51,102,0.3)]
                       focus:ring-2 focus:ring-red-accent focus:outline-none"
              aria-label="Get your tickets now"
            >
              Get Tickets
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-red-accent text-red-accent hover:bg-red-accent/10
                       min-w-[200px] transition-all duration-300
                       transform hover:scale-105
                       focus:ring-2 focus:ring-red-accent focus:outline-none"
              aria-label="View event date and calendar"
            >
              <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
              February 14, 2024
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.button
            onClick={scrollToContent}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer
                     flex flex-col items-center text-white-secondary hover:text-white
                     transition-colors duration-300
                     focus:outline-none focus:ring-2 focus:ring-red-accent focus:ring-offset-2 focus:ring-offset-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            aria-label="Scroll to explore content"
          >
            <span className="text-sm mb-2 font-inter">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-6 w-6" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};