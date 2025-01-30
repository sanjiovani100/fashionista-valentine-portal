import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List, X } from 'lucide-react';

interface EventsHeaderProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortBy: 'date' | 'price-asc' | 'price-desc';
  onSortChange: (sort: 'date' | 'price-asc' | 'price-desc') => void;
  activeFilters: number;
  onClearFilters: () => void;
}

export const EventsHeader = ({
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
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
        
        <select 
          className="bg-background border rounded-md px-3 py-2"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as typeof sortBy)}
        >
          <option value="date">Sort by: Latest</option>
          <option value="price-asc">Sort by: Price (Low to High)</option>
          <option value="price-desc">Sort by: Price (High to Low)</option>
        </select>
      </div>

      {activeFilters > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {activeFilters} {activeFilters === 1 ? 'filter' : 'filters'} applied
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-auto py-1 px-2"
          >
            <X className="h-3 w-3 mr-1" />
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};