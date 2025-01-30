import React from 'react';
import { motion } from 'framer-motion';
import { EventCard } from './EventCard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import type { EventSubtype } from '@/types/supabase/enums.types';

interface EventFilters {
  search: string;
  dateRange?: Date;
  priceRange?: [number, number];
  categories: EventSubtype[];
  location: string;
}

interface EventsGridProps {
  viewMode: 'grid' | 'list';
  filters: EventFilters;
  sortBy: 'date' | 'price-asc' | 'price-desc';
}

export const EventsGrid = ({ viewMode, filters, sortBy }: EventsGridProps) => {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['events', filters, sortBy],
    queryFn: async () => {
      let query = supabase
        .from('fashion_events')
        .select(`
          *,
          event_tickets (
            price,
            quantity_available,
            ticket_type,
            benefits
          ),
          fashion_images (
            url,
            alt_text,
            category
          ),
          event_content (
            id,
            event_id,
            content_type,
            title,
            content,
            media_urls,
            publish_date,
            engagement_metrics,
            created_at,
            updated_at
          )
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
          // We'll sort by minimum ticket price in the frontend
          query = query.order('start_time', { ascending: true });
          break;
        case 'price-desc':
          // We'll sort by minimum ticket price in the frontend
          query = query.order('start_time', { ascending: true });
          break;
      }

      const { data, error } = await query;
      
      if (error) throw error;

      // Sort by price if needed (since we can't do it in the query due to the relationship)
      if (sortBy.includes('price')) {
        return data.sort((a, b) => {
          const aMinPrice = Math.min(...(a.event_tickets?.map(t => t.price) || [0]));
          const bMinPrice = Math.min(...(b.event_tickets?.map(t => t.price) || [0]));
          return sortBy === 'price-asc' ? aMinPrice - bMinPrice : bMinPrice - aMinPrice;
        });
      }

      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load events. Please try again later.</AlertDescription>
      </Alert>
    );
  }

  if (!events?.length) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>No events found matching your criteria.</AlertDescription>
      </Alert>
    );
  }

  return (
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
          transition={{ duration: 0.4 }}
        >
          <EventCard event={event} viewMode={viewMode} />
        </motion.div>
      ))}
    </div>
  );
};