import React, { useState } from 'react';
import { EventsSidebar } from './EventsSidebar';
import { EventsGrid } from './EventsGrid';
import { EventsHeader } from './EventsHeader';

export const EventsContent = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  return (
    <section className="bg-background py-12">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <EventsSidebar 
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
            />
          </div>
          
          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <EventsHeader 
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              activeFilters={activeFilters}
              onClearFilters={() => setActiveFilters([])}
            />
            <EventsGrid viewMode={viewMode} />
          </div>
        </div>
      </div>
    </section>
  );
};