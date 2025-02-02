import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Shield, Lightbulb } from 'lucide-react';

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
  return (
    <section className="py-16 bg-black/20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient"
        >
          Our Core Values
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const IconComponent = iconMap[value.title as keyof typeof iconMap] || Star;
            
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
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
        </div>
      </div>
    </section>
  );
};