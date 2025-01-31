import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface HeroContentProps {
  headline: string;
  subheading: string;
}

export const HeroContent = ({ headline, subheading }: HeroContentProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        st.2,
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 md:space-y-12 text-center max-w-4xl mx-auto"
    >
      <motion.h1 
        variants={itemVariants}
        id="hero-title"
        className="font-montserrat text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-shadow-xl leading-tight"
      >
        {headline.split(" ").map((word, index) => (
          <span 
            key={index} 
            className={`block ${index === 1 ? "text-red-accent mt-4 drop-shadow-glow" : "text-white drop-shadow-glow"}`}
          >
            {word}{" "}
          </span>
        ))}
      </motion.h1>
      
      <motion.p 
        variants={itemVariants}
        className="font-inter text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto text-white/90 leading-relaxed drop-shadow-md"
      >
        {subheading}
      </motion.p>
      
      <motion.div 
        variants={itemVariants}
        className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12"
      >
        <Button 
          size="lg" 
          className="bg-white text-black hover:bg-white/90 min-w-[200px]
                   transition-all duration-300 transform hover:scale-105
                   hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]
                   focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Get your tickets now"
        >
          Get Tickets
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="border-white text-white hover:bg-white/10
                   min-w-[200px] transition-all duration-300
                   transform hover:scale-105
                   focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="View event date and calendar"
        >
          <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
          February 14, 2024
        </Button>
      </motion.div>
    </motion.div>
  );
};