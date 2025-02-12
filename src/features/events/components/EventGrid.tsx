import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventCard } from '@/pages/events/components/EventCard';
import type { FashionEvent } from '@/types/database';
import { toast } from '@/hooks/use-toast';

interface EventGridProps {
  events: FashionEvent[];
  viewMode: 'grid' | 'list';
}

export const EventGrid = ({ events, viewMode }: EventGridProps) => {
  return (
    <AnimatePresence mode="wait">
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <EventCard 
              event={event} 
              viewMode={viewMode}
            />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};


