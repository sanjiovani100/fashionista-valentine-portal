import React from 'react';
import { motion } from 'framer-motion';

interface MissionVisionProps {
  mission: string;
  vision: string;
}

export const MissionVision = ({ mission, vision }: MissionVisionProps) => {
  return (
    <section 
      className="py-16 bg-gradient-to-b from-black/40 to-black/20"
      aria-labelledby="mission-vision-title"
      role="region"
    >
      <div className="container mx-auto px-4">
        <h2 id="mission-vision-title" className="sr-only">Mission and Vision</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div 
            className="space-y-4"
            role="article"
            aria-labelledby="mission-title"
          >
            <h3 
              id="mission-title"
              className="text-2xl md:text-3xl font-bold text-fashion-pink"
              tabIndex={0}
            >
              Our Mission
            </h3>
            <p 
              className="text-gray-200 leading-relaxed"
              tabIndex={0}
            >
              {mission}
            </p>
          </div>
          <div 
            className="space-y-4"
            role="article"
            aria-labelledby="vision-title"
          >
            <h3 
              id="vision-title"
              className="text-2xl md:text-3xl font-bold text-fashion-pink"
              tabIndex={0}
            >
              Our Vision
            </h3>
            <p 
              className="text-gray-200 leading-relaxed"
              tabIndex={0}
            >
              {vision}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};