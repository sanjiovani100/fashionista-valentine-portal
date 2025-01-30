import React from 'react';
import { motion } from 'framer-motion';
import { EventCard } from './EventCard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface EventsGridProps {
  viewMode: 'grid' | 'list';
}

export const EventsGrid = ({ viewMode }: EventsGridProps) => {
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fashion_events')
        .select(`
          *,
          event_tickets (
            price,
            quantity_available
          ),
          fashion_images (
            url,
            alt_text
          )
        `);
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`grid gap-6 ${
      viewMode === 'grid' 
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
        : 'grid-cols-1'
    }`}>
      {events?.map((event) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <EventCard event={event} viewMode={viewMode} />
        </motion.div>
      ))}
    </div>
  );
};