import React from 'react';
import { motion } from 'framer-motion';
import { EventList } from './EventList';

export const EventsSection = () => {
  return (
    <section 
      className="py-20 bg-gradient-to-b from-black to-deep-purple"
      aria-labelledby="events-title"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 
            id="events-title"
            className="text-4xl md:text-5xl font-playfair mb-4 text-white"
          >
            Upcoming Fashion Events
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join us for exclusive fashion shows and events throughout the year
          </p>
        </motion.div>

        <EventList />
      </div>
    </section>
  );
};