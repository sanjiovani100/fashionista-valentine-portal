import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, useReducedMotion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { EventCard } from './EventCard';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { FashionEvent } from '@/types/database';
import { toast } from 'sonner';
import { CardSkeleton } from '@/components/ui/loading-skeleton/CardSkeleton';

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

interface EventFilters {
  search: string;
  dateRange?: Date;
  priceRange?: [number, number];
  categories: string[];
  location: string;
}

interface EventListProps {
  filters: EventFilters;
  sortBy: 'date' | 'price-asc' | 'price-desc';
  viewMode: 'grid' | 'list';
}

export const EventList = ({ filters, sortBy, viewMode }: EventListProps) => {
  const prefersReducedMotion = useReducedMotion();
  
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['events', filters, sortBy],
    queryFn: async () => {
      try {
        console.log('Fetching events with filters:', filters);
        let query = supabase
          .from('fashion_events')
          .select(`
            *,
            event_content (*),
            fashion_collections (*),
            fashion_images (*),
            event_tickets (*)
          `);

        // Apply filters
        if (filters.search) {
          query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
        }

        if (filters.dateRange) {
          query = query.gte('start_time', filters.dateRange.toISOString());
        }

        if (filters.location) {
          query = query.ilike('venue', `%${filters.location}%`);
        }

        if (filters.categories?.length) {
          query = query.in('subtype', filters.categories);
        }

        // Apply sorting
        switch (sortBy) {
          case 'date':
            query = query.order('start_time', { ascending: true });
            break;
          case 'price-asc':
          case 'price-desc':
            // We'll sort by price after fetching the data
            query = query.order('start_time', { ascending: true });
            break;
        }

        const { data, error } = await query;
        
        if (error) {
          console.error('Error fetching events:', error);
          toast.error('Failed to load events. Please try again.');
          throw error;
        }

        // Apply price range filter and sorting
        let filteredData = data as FashionEvent[];
        
        if (filters.priceRange) {
          const [minPrice, maxPrice] = filters.priceRange;
          filteredData = filteredData.filter(event => {
            const eventMinPrice = Math.min(...(event.event_tickets?.map(t => t.price) || [0]));
            return eventMinPrice >= minPrice && eventMinPrice <= maxPrice;
          });
        }

        // Sort by price if needed
        if (sortBy.includes('price')) {
          filteredData.sort((a, b) => {
            const aMinPrice = Math.min(...(a.event_tickets?.map(t => t.price) || [0]));
            const bMinPrice = Math.min(...(b.event_tickets?.map(t => t.price) || [0]));
            return sortBy === 'price-asc' ? aMinPrice - bMinPrice : bMinPrice - aMinPrice;
          });
        }

        console.log(`Found ${filteredData.length} events after filtering`);
        return filteredData;
      } catch (err) {
        console.error('Unexpected error:', err);
        toast.error('An unexpected error occurred. Please try again later.');
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false
  });

  if (isLoading) {
    return (
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
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
      className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}
    >
      {events.map((event) => (
        <motion.div 
          key={event.id} 
          variants={cardVariants}
          className="h-full"
        >
          <EventCard 
            event={event}
            onRegister={() => {
              console.log('Register for event:', event.id);
              toast.success(`Registration initiated for ${event.title}`);
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};