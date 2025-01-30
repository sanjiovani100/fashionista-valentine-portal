import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List, X } from 'lucide-react';

interface EventsHeaderProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  activeFilters: string[];
  onClearFilters: () => void;
}

export const EventsHeader = ({
  viewMode,
  onViewModeChange,
  activeFilters,
  onClearFilters
}: EventsHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => onViewModeChange('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => onViewModeChange('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        
        <select className="bg-background border rounded-md px-3 py-2">
          <option>Sort by: Latest</option>
          <option>Sort by: Price (Low to High)</option>
          <option>Sort by: Price (High to Low)</option>
        </select>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <span
              key={filter}
              className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center gap-1"
            >
              {filter}
              <X className="h-3 w-3 cursor-pointer" onClick={() => {
                const newFilters = activeFilters.filter(f => f !== filter);
                onClearFilters();
              }} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
};