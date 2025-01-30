import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { EventSubtype } from '@/types/supabase/enums.types';

interface EventFilters {
  search: string;
  dateRange?: Date;
  priceRange?: [number, number];
  categories: EventSubtype[];
  location: string;
}

interface EventsSidebarProps {
  filters: EventFilters;
  onFilterChange: (filters: EventFilters) => void;
}

const EVENT_CATEGORIES: EventSubtype[] = [
  'main_show',
  'vip_session',
  'workshop',
  'networking',
  'photo_session',
  'after_party'
];

export const EventsSidebar = ({ filters, onFilterChange }: EventsSidebarProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, location: e.target.value });
  };

  const handleCategoryToggle = (category: EventSubtype) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  return (
    <Card className="p-6 space-y-6 bg-black/40 backdrop-blur-md border-white/10">
      <div className="space-y-2">
        <Label htmlFor="search">Search Events</Label>
        <Input
          id="search"
          placeholder="Search by name..."
          value={filters.search}
          onChange={handleSearchChange}
          className="bg-white/5 border-white/10"
        />
      </div>

      <div className="space-y-2">
        <Label>Event Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !filters.dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.dateRange ? format(filters.dateRange, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={filters.dateRange}
              onSelect={(date) => onFilterChange({ ...filters, dateRange: date || undefined })}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="Filter by location..."
          value={filters.location}
          onChange={handleLocationChange}
          className="bg-white/5 border-white/10"
        />
      </div>

      <div className="space-y-2">
        <Label>Categories</Label>
        <div className="space-y-2">
          {EVENT_CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={filters.categories.includes(category) ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => handleCategoryToggle(category)}
            >
              {category.replace('_', ' ').toUpperCase()}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};