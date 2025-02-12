import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EventList } from './EventList';
import type { EventSubtype } from '@/types/supabase/enums.types';
import { useTranslation } from 'react-i18next';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

export const EventsSection = () => {
  const { t } = useTranslation('home');
  const prefersReducedMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'price-asc' | 'price-desc'>('date');
  const [filters, setFilters] = useState({
    search: '',
    dateRange: undefined,
    priceRange: undefined as [number, number] | undefined,
    categories: [] as EventSubtype[],
    location: ''
  });

  return (
    <section 
      className="relative py-20 overflow-hidden"
      aria-labelledby="events-title"
    >
      {/* Background with gradient and blur effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-maroon/20 via-black to-black pointer-events-none" />
      <div className="absolute inset-0 backdrop-blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.p 
            variants={itemVariants}
            className="text-sm font-medium tracking-widest text-white/60 uppercase mb-4"
          >
            {t('events.subtitle')}
          </motion.p>
          
          <motion.h2 
            id="events-title"
            variants={itemVariants}
            className="text-4xl md:text-5xl font-playfair mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
          >
            {t('events.title')}
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            {t('events.description')}
          </motion.p>
        </motion.div>

        <EventList 
          filters={filters}
          sortBy={sortBy}
          viewMode={viewMode}
          translations={{
            search: t('events.filters.search'),
            viewMode: {
              grid: t('events.filters.viewMode.grid'),
              list: t('events.filters.viewMode.list')
            },
            sortBy: {
              date: t('events.filters.sortBy.date'),
              priceAsc: t('events.filters.sortBy.priceAsc'),
              priceDesc: t('events.filters.sortBy.priceDesc')
            }
          }}
        />
      </div>
    </section>
  );
};


