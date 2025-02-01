import { OptimizedImage } from "@/components/cloudinary/OptimizedImage";
import { motion } from "framer-motion";

interface HeroBackgroundProps {
  imageUrl: string;
}

export const HeroBackground = ({ imageUrl }: HeroBackgroundProps) => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <OptimizedImage
          src={imageUrl}
          alt="Fashion event background"
          className="object-cover w-full h-full"
          loading="eager"
          priority={true}
        />
      </motion.div>
      
      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10 text-6xl"
            initial={{ y: 0, x: Math.random() * 100 - 50 }}
            animate={{
              y: [-20, 20],
              x: Math.random() * 40 - 20,
            }}
            transition={{
              y: {
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              x: {
                duration: 5 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
            }}
          >
            ❤
          </motion.div>
        ))}
      </div>
    </>
  );
};