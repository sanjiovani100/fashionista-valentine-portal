import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/cloudinary";

interface HeroProps {
  headline: string;
  subheading: string;
  backgroundImage?: string;
}

export const Hero = ({ headline, subheading, backgroundImage = "hero-red-bg_spclrx" }: HeroProps) => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
      aria-labelledby="hero-title"
      role="banner"
    >
      {/* Background image with Cloudinary optimization */}
      <div className="absolute inset-0">
        <OptimizedImage
          publicId={backgroundImage}
          alt="Valentine's Fashion Event Background"
          className="w-full h-full object-cover"
          aspectRatio="video"
          priority={true}
        />
      </div>
      
      {/* Enhanced gradient overlay for better text contrast */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80 backdrop-blur-[2px]"
        aria-hidden="true"
      />
      
      <div className="container relative z-20 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-12 md:space-y-8" // Improved spacing
        >
          <h1 
            id="hero-title"
            className="font-montserrat text-6xl md:text-7xl lg:text-8xl font-bold text-shadow-lg"
          >
            {headline.split(" ").map((word, index) => (
              <span 
                key={index} 
                className={index === 1 ? "block text-red-soft mt-4" : ""}
              >
                {word}{" "}
              </span>
            ))}
          </h1>
          
          <p className="font-inter text-xl md:text-2xl max-w-2xl mx-auto text-gray-100 leading-relaxed">
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
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            aria-hidden="true"
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};