import React from 'react';
import { motion } from 'framer-motion';

export const EventsHero = () => {
  return (
    <section className="relative bg-black py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Upcoming Fashion Events
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8">
            Discover and book exclusive fashion shows, showcases, and industry events
          </p>
          <div className="flex justify-center gap-6 text-white/60">
            <div>
              <span className="block text-2xl font-bold text-white">20+</span>
              <span>Upcoming Events</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">15</span>
              <span>Cities</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">5000+</span>
              <span>Attendees Expected</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


