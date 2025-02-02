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
    <section className="py-16 bg-black/20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient"
        >
          Our Core Values
        </motion.h2>
        <motion.div
          ref={ref}
          variants={shouldAnimate ? containerVariants : {}}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((value, index) => {
            const IconComponent = iconMap[value.title as keyof typeof iconMap] || Star;
            
            return (
              <motion.div
                key={value.title}
                variants={shouldAnimate ? itemVariants : {}}
                whileHover={shouldAnimate ? { scale: 1.05, transition: { duration: 0.2 } } : {}}
                className="bg-black/30 backdrop-blur-sm rounded-lg p-6 hover:bg-black/40 transition-colors border border-white/10 hover:border-white/20"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 text-red-primary">
                    <IconComponent size={32} className="animate-glow" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-red-primary">{value.title}</h3>
                  <p className="text-gray-200">{value.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};