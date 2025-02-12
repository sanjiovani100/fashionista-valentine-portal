import React from 'react';
import { motion } from 'framer-motion';

export const ContactHero = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16" />
      
      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have questions about our fashion events? We'd love to hear from you.
            Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </div>
    </section>
  );
};


