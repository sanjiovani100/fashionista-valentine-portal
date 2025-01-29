import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/cloudinary";
import { ChevronDown } from "lucide-react";

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

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
      aria-labelledby="hero-title"
      role="banner"
    >
      {/* Background image with enhanced overlay */}
      <div className="absolute inset-0">
        <OptimizedImage
          publicId={backgroundImage}
          alt="Valentine's Fashion Event Background"
          className="w-full h-full object-cover"
          aspectRatio="video"
          priority={true}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 backdrop-blur-[2px]"
          aria-hidden="true"
        />
      </div>
      
      <div className="container relative z-20 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-12 md:space-y-8"
        >
          <h1 
            id="hero-title"
            className="font-montserrat text-6xl md:text-7xl lg:text-[5rem] font-bold text-shadow-xl"
          >
            {headline.split(" ").map((word, index) => (
              <span 
                key={index} 
                className={index === 1 ? "block text-red-soft mt-4 drop-shadow-lg" : "drop-shadow-lg"}
              >
                {word}{" "}
              </span>
            ))}
          </h1>
          
          <p className="font-inter text-xl md:text-2xl max-w-2xl mx-auto text-gray-100 leading-relaxed drop-shadow-md">
            {subheading}
          </p>
          
          <motion.div 
            className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button 
              size="lg" 
              className="bg-red-deep hover:bg-red-dark text-white min-w-[200px]
                       transition-all duration-300 transform hover:scale-105
                       hover:shadow-[0_0_20px_rgba(128,0,0,0.3)]
                       focus:ring-2 focus:ring-red-soft focus:outline-none"
              aria-label="Get your tickets now"
            >
              Get Tickets
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-red-soft text-red-soft hover:bg-red-soft/10
                       min-w-[200px] transition-all duration-300
                       transform hover:scale-105
                       focus:ring-2 focus:ring-red-soft focus:outline-none"
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
                     flex flex-col items-center text-white/80 hover:text-white
                     transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            aria-label="Scroll to content"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
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