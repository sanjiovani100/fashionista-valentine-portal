import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/cloudinary/components/CloudinaryImage";

interface HeroProps {
  headline: string;
  subheading: string;
  backgroundImage?: string;
}

export const Hero = ({ headline, subheading, backgroundImage = "hero-red-bg_spclrx" }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background image with Cloudinary optimization */}
      <div className="absolute inset-0">
        <OptimizedImage
          publicId={backgroundImage}
          alt="Valentine's Fashion Event Background"
          className="w-full h-full object-cover"
          aspectRatio="video"
          priority={true} // Load this image first as it's above the fold
        />
      </div>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 backdrop-blur-[2px]" />
      
      <div className="container relative z-20 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <h1 className="font-montserrat text-5xl md:text-7xl font-bold">
            {headline.split(" ").map((word, index) => (
              <span 
                key={index} 
                className={index === 1 ? "block text-red-soft mt-2" : ""}
              >
                {word}{" "}
              </span>
            ))}
          </h1>
          
          <p className="font-inter text-xl md:text-2xl max-w-2xl mx-auto text-gray-100">
            {subheading}
          </p>
          
          <motion.div 
            className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button 
              size="lg" 
              className="bg-red-deep hover:bg-red-dark text-white min-w-[200px]
                       transition-all duration-300 transform hover:scale-105
                       hover:shadow-[0_0_20px_rgba(128,0,0,0.3)]"
            >
              Get Tickets
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-red-soft text-red-soft hover:bg-red-soft/10
                       min-w-[200px] transition-all duration-300
                       transform hover:scale-105"
            >
              <Calendar className="mr-2 h-5 w-5" />
              February 14, 2024
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};