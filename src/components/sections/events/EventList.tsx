import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, useReducedMotion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { EventCard } from './EventCard';
import { Loader2 } from 'lucide-react';
import type { FashionEvent } from '@/types/database';

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const cardVariants = {
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

export const EventList = () => {
  const prefersReducedMotion = useReducedMotion();
  
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      console.log('Fetching events data...');
      const { data, error } = await supabase
        .from('fashion_events')
        .select(`
          *,
          event_content (*),
          fashion_collections (*),
          fashion_images (*),
          event_tickets (*)
        `)
        .order('start_time', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
        throw error;
      }
      
      console.log('Events data:', data);
      return data as FashionEvent[];
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-white/60" />
      </div>
    );
  }

  if (error) {
    console.error('Error in EventList:', error);
    return (
      <div className="text-red-500 text-center p-8 bg-black/40 backdrop-blur-sm rounded-lg border border-red-500/20">
        Failed to load events. Please try again later.
      </div>
    );
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={listVariants}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {events?.map((event) => (
        <motion.div key={event.id} variants={cardVariants}>
          <EventCard 
            event={event}
            onRegister={() => console.log('Register for event:', event.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};