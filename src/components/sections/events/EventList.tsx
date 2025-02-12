import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { EventSubtype } from '@/types/supabase/enums.types';
import { useEventQuery } from '@/features/events/hooks/useEventQuery';
import { EventGrid } from '@/features/events/components/EventGrid';
import { LoadingState, ErrorState, EmptyState } from '@/features/events/components/EventListStates';

interface EventFilters {
  search: string;
  dateRange?: Date;
  priceRange?: [number, number];
  categories: EventSubtype[];
  location: string;
}

interface EventListProps {
  filters: EventFilters;
  sortBy: 'date' | 'price-asc' | 'price-desc';
  viewMode: 'grid' | 'list';
}

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

export const EventList = ({ filters, sortBy, viewMode }: EventListProps) => {
  const prefersReducedMotion = useReducedMotion();
  const { data: events, isLoading, error } = useEventQuery(filters, sortBy);

  if (isLoading) {
    return <LoadingState viewMode={viewMode} />;
  }

  if (error) {
    return <ErrorState />;
  }

  if (!events?.length) {
    return <EmptyState />;
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={listVariants}
    >
      <EventGrid events={events} viewMode={viewMode} />
    </motion.div>
  );
};


