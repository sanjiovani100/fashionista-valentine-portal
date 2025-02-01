import React from 'react';
import { OptimizedImage } from '@/components/cloudinary';
import { motion } from 'framer-motion';

interface AboutOverviewProps {
  title: string;
  description: string;
  imageUrl: string;
}

export const AboutOverview = ({ title, description, imageUrl }: AboutOverviewProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 bg-black/20 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-fashion-pink">
              {title}
            </h2>
            <p className="text-gray-200 leading-relaxed">
              {description}
            </p>
          </div>
          <div className="relative">
            <OptimizedImage
              publicId={imageUrl}
              alt="About Fashionistas"
              width={600}
              height={400}
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};