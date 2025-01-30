import React, { useState } from 'react';
import { EventsSidebar } from './EventsSidebar';
import { EventsGrid } from './EventsGrid';
import { EventsHeader } from './EventsHeader';
import type { EventSubtype } from '@/types/supabase/enums.types';

interface EventFilters {
  search: string;
  dateRange?: Date;
  priceRange?: [number, number];
  categories: EventSubtype[];
  location: string;
}

export const EventsContent = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<EventFilters>({
    search: '',
    dateRange: undefined,
    priceRange: undefined,
    categories: [],
    location: ''
  });
  const [sortBy, setSortBy] = useState<'date' | 'price-asc' | 'price-desc'>('date');

  const handleFilterChange = (newFilters: EventFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort: typeof sortBy) => {
    setSortBy(newSort);
  };

  return (
    <section className="bg-background py-12">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <EventsSidebar 
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <EventsHeader 
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              activeFilters={Object.entries(filters).filter(([_, value]) => {
                if (Array.isArray(value)) return value.length > 0;
                if (value instanceof Date) return true;
                return !!value;
              }).length}
              onClearFilters={() => setFilters({
                search: '',
                dateRange: undefined,
                priceRange: undefined,
                categories: [],
                location: ''
              })}
            />
            <EventsGrid 
              viewMode={viewMode} 
              filters={filters}
              sortBy={sortBy}
            />
          </div>
        </div>
      </div>
    </section>
  );
};