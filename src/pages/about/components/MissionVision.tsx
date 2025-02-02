import React from 'react';
import { motion } from 'framer-motion';

interface MissionVisionProps {
  mission: string;
  vision: string;
}

export const MissionVision = ({ mission, vision }: MissionVisionProps) => {
  return (
    <section className="py-16 bg-gradient-to-b from-black/40 to-black/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-fashion-pink">Our Mission</h3>
            <p className="text-gray-200 leading-relaxed">{mission}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-fashion-pink">Our Vision</h3>
            <p className="text-gray-200 leading-relaxed">{vision}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};