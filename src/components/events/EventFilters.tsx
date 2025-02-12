import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Search } from 'lucide-react';

interface EventFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: EventFilters) => void;
}

export interface EventFilters {
  searchQuery: string;
  eventType: string;
  startDate: Date | null;
  endDate: Date | null;
}

export const EventFilters = ({ onSearch, onFilterChange }: EventFiltersProps) => {
  const [filters, setFilters] = useState<EventFilters>({
    searchQuery: '',
    eventType: 'all',
    startDate: null,
    endDate: null,
  });

  const handleFilterChange = (key: keyof EventFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search events..."
          value={filters.searchQuery}
          onChange={(e) => {
            handleFilterChange('searchQuery', e.target.value);
            onSearch(e.target.value);
          }}
          className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Event Type Filter */}
        <Select
          value={filters.eventType}
          onValueChange={(value) => handleFilterChange('eventType', value)}
        >
          <SelectTrigger className="bg-black/20 border-white/10 text-white">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="fashion_show">Fashion Shows</SelectItem>
            <SelectItem value="swimwear">Swimwear Events</SelectItem>
            <SelectItem value="runway">Runway Shows</SelectItem>
            <SelectItem value="exhibition">Exhibitions</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Range Filters */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-black/20 border-white/10 text-white w-full justify-start"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.startDate ? format(filters.startDate, 'PPP') : 'Start Date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={filters.startDate}
              onSelect={(date) => handleFilterChange('startDate', date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-black/20 border-white/10 text-white w-full justify-start"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.endDate ? format(filters.endDate, 'PPP') : 'End Date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={filters.endDate}
              onSelect={(date) => handleFilterChange('endDate', date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}; 


