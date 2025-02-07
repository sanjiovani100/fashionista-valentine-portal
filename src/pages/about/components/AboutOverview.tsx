import React from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/cloudinary';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AboutOverviewProps {
  title: string;
  description: string;
  imageUrl: string;
}

export const AboutOverview = ({ title, description, imageUrl }: AboutOverviewProps) => {
  const { ref, inView, shouldAnimate } = useScrollAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section 
      className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-8 md:py-16 bg-gradient-to-b from-black/40 to-black/20"
      aria-labelledby="about-title"
      role="region"
    >
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          publicId={imageUrl}
          alt="About Us Background"
          width={1920}
          height={1080}
          className="w-full h-full object-cover opacity-40"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" aria-hidden="true" />
      </div>
      
      <motion.div
        ref={ref}
        variants={shouldAnimate ? containerVariants : {}}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            id="about-title"
            variants={shouldAnimate ? itemVariants : {}}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 text-gradient"
            tabIndex={0}
          >
            {title}
          </motion.h1>
          <motion.p
            variants={shouldAnimate ? itemVariants : {}}
            className="text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed px-4 md:px-0"
            tabIndex={0}
          >
            {description}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};