import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Shield, Lightbulb } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CoreValue {
  title: string;
  description: string;
}

interface CoreValuesProps {
  values: CoreValue[];
}

const iconMap = {
  'Passion': Heart,
  'Excellence': Star,
  'Trust': Shield,
  'Innovation': Lightbulb
};

export const CoreValues = ({ values }: CoreValuesProps) => {
  const { ref, inView, shouldAnimate } = useScrollAnimation(0.2);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section 
      className="py-8 md:py-16 bg-black/20"
      aria-labelledby="core-values-title"
      role="region"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          id="core-values-title"
          initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 text-gradient"
          tabIndex={0}
        >
          Our Core Values
        </motion.h2>
        <motion.div
          ref={ref}
          variants={shouldAnimate ? containerVariants : {}}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          role="list"
        >
          {values.map((value, index) => {
            const IconComponent = iconMap[value.title as keyof typeof iconMap] || Star;
            
            return (
              <motion.div
                key={value.title}
                variants={shouldAnimate ? itemVariants : {}}
                whileHover={shouldAnimate ? { scale: 1.03, transition: { duration: 0.2 } } : {}}
                className="bg-black/30 backdrop-blur-sm rounded-lg p-4 md:p-6 hover:bg-black/40 transition-colors border border-white/10 hover:border-white/20 focus-within:ring-2 focus-within:ring-red-primary focus-within:border-transparent"
                role="listitem"
                tabIndex={0}
                aria-label={`Core value: ${value.title}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div 
                    className="mb-3 md:mb-4 text-red-primary"
                    aria-hidden="true"
                  >
                    <IconComponent size={28} className="animate-glow" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-red-primary">
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-200">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};


