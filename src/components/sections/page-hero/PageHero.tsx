import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  headline: string;
  subheading: string;
  role: "model" | "designer" | "sponsor";
  className?: string;
}

export const PageHero = ({ headline, subheading, role, className }: PageHeroProps) => {
  return (
    <section className={cn(
      "relative min-h-[80vh] flex items-center justify-center overflow-hidden",
      "bg-gradient-to-b from-pure-black to-deep-purple",
      className
    )}>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
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

      {/* Content */}
      <div className="container relative z-20 text-center px-4">
        <motion.h1 
          className="font-playfair text-hero font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {headline}
        </motion.h1>
        
        <motion.p 
          className="font-montserrat text-h3 text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subheading}
        </motion.p>
      </div>
    </section>
  );
};