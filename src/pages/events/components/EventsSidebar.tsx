import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, MapPin } from 'lucide-react';

interface EventsSidebarProps {
  activeFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

export const EventsSidebar = ({ activeFilters, onFilterChange }: EventsSidebarProps) => {
  return (
    <div className="bg-gray-500/5 rounded-lg p-6 space-y-8 sticky top-24">
      {/* Search */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Search Events</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
          <Input 
            placeholder="Search events..." 
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Categories</h3>
        <div className="space-y-2">
          {['Fashion Shows', 'Showcases', 'Workshops', 'Networking'].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={category} />
              <label htmlFor={category} className="text-sm">{category}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Date Filter */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Date</h3>
        <Calendar mode="single" className="rounded-md border" />
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Price Range</h3>
        <Slider defaultValue={[0]} max={1000} step={10} />
        <div className="flex justify-between text-sm">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Location</h3>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
          <Input 
            placeholder="Enter location..." 
            className="pl-10"
          />
        </div>
      </div>

      {/* Clear Filters */}
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => onFilterChange([])}
      >
        Clear All Filters
      </Button>
    </div>
  );
};