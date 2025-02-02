import React from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/cloudinary';

interface AboutOverviewProps {
  title: string;
  description: string;
  imageUrl: string;
}

export const AboutOverview = ({ title, description, imageUrl }: AboutOverviewProps) => {
  return (
    <section className="relative min-h-[60vh] flex items-center py-16 bg-gradient-to-b from-black/40 to-black/20">
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          publicId={imageUrl}
          alt="About Us Hero"
          width={1920}
          height={1080}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};