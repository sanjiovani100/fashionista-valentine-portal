import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EventList } from './EventList';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const EventsSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      className="relative py-20 overflow-hidden"
      aria-labelledby="events-title"
    >
      {/* Background with gradient and blur effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-maroon/20 via-black to-black pointer-events-none" />
      <div className="absolute inset-0 backdrop-blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.p 
            variants={itemVariants}
            className="text-sm font-medium tracking-widest text-white/60 uppercase mb-4"
          >
            Mark Your Calendar
          </motion.p>
          
          <motion.h2 
            id="events-title"
            variants={itemVariants}
            className="text-4xl md:text-5xl font-playfair mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
          >
            Upcoming Fashion Events
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Join us for exclusive fashion shows and events throughout the year
          </motion.p>
        </motion.div>

        <EventList />
      </div>
    </section>
  );
};