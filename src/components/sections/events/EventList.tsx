import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, useReducedMotion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { EventCard } from './EventCard';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { FashionEvent } from '@/types/database';
import { toast } from 'sonner';

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
      try {
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
          toast.error('Failed to load events. Please try again.');
          throw error;
        }
        
        if (!data || data.length === 0) {
          console.info('No events found');
        } else {
          console.info(`Found ${data.length} events`);
        }
        
        return data as FashionEvent[];
      } catch (err) {
        console.error('Unexpected error:', err);
        toast.error('An unexpected error occurred. Please try again later.');
        throw err;
      }
    },
    retry: 2,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-white/60" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="bg-red-500/10 border-red-500/20">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load events. Please try refreshing the page.
        </AlertDescription>
      </Alert>
    );
  }

  if (!events?.length) {
    return (
      <Alert className="bg-white/5 backdrop-blur-sm border-white/10">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>No events found matching your criteria.</AlertDescription>
      </Alert>
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
      {events.map((event) => (
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