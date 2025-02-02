import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { EventSubtype } from '@/types/supabase/enums.types';
import type { FashionEvent, VenueFeatures, EventHighlight } from '@/types/event.types';
import { isVenueFeatures, isEventHighlight } from '@/types/event.types';
import { toast } from 'sonner';

interface EventFilters {
  search: string;
  dateRange?: Date;
  priceRange?: [number, number];
  categories: EventSubtype[];
  location: string;
}

export const useEventQuery = (
  filters: EventFilters,
  sortBy: 'date' | 'price-asc' | 'price-desc'
) => {
  return useQuery({
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
            event_tickets (*),
            swimwear_event_details (*),
            event_sponsors (
              *,
              sponsor_profiles (*)
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

        // Transform and validate the data
        let events = (data as any[]).map(event => {
          const rawVenueFeatures = event.venue_features as unknown;
          const rawEventHighlights = event.event_highlights as unknown[];

          const venue_features: VenueFeatures = isVenueFeatures(rawVenueFeatures) 
            ? rawVenueFeatures 
            : { amenities: [], accessibility: [] };

          const event_highlights: EventHighlight[] = Array.isArray(rawEventHighlights) && 
            rawEventHighlights.every(isEventHighlight) 
            ? rawEventHighlights 
            : [];

          return {
            ...event,
            venue_features,
            event_highlights
          };
        }) as FashionEvent[];

        // Apply price range filter
        if (filters.priceRange) {
          const [minPrice, maxPrice] = filters.priceRange;
          events = events.filter(event => {
            const eventMinPrice = Math.min(...(event.event_tickets?.map(t => t.price) || [0]));
            return eventMinPrice >= minPrice && eventMinPrice <= maxPrice;
          });
        }

        // Sort by price if needed
        if (sortBy.includes('price')) {
          events.sort((a, b) => {
            const aMinPrice = Math.min(...(a.event_tickets?.map(t => t.price) || [0]));
            const bMinPrice = Math.min(...(b.event_tickets?.map(t => t.price) || [0]));
            return sortBy === 'price-asc' ? aMinPrice - bMinPrice : bMinPrice - aMinPrice;
          });
        }

        console.log(`Found ${events.length} events after filtering`);
        return events;
      } catch (err) {
        console.error('Unexpected error:', err);
        toast.error('An unexpected error occurred. Please try again later.');
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false
  });
};