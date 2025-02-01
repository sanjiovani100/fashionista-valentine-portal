import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Calendar as CalendarIcon, Filter, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { EventSubtype } from '@/types/supabase/enums.types';
import { useTranslation } from 'react-i18next';

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

const MAX_PRICE = 1000; // Maximum price for the slider

export const EventsSidebar = ({ filters, onFilterChange }: EventsSidebarProps) => {
  const { t } = useTranslation('home');

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

  const handlePriceRangeChange = (value: number[]) => {
    onFilterChange({ ...filters, priceRange: value as [number, number] });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      dateRange: undefined,
      priceRange: undefined,
      categories: [],
      location: ''
    });
  };

  const hasActiveFilters = filters.search || 
    filters.dateRange || 
    filters.priceRange || 
    filters.categories.length > 0 || 
    filters.location;

  return (
    <Card className="p-6 space-y-6 bg-black/40 backdrop-blur-md border-white/10">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{t('events.filters.title')}</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 px-2 lg:px-3"
          >
            {t('events.filters.clear')}
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="search">{t('events.filters.search')}</Label>
        <div className="relative">
          <Input
            id="search"
            placeholder={t('events.filters.search')}
            value={filters.search}
            onChange={handleSearchChange}
            className="bg-white/5 border-white/10 pl-9"
          />
          <Filter className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>{t('events.filters.date')}</Label>
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
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>{t('events.filters.priceRange')}</Label>
        <div className="pt-2 px-2">
          <Slider
            defaultValue={[0, MAX_PRICE]}
            max={MAX_PRICE}
            step={10}
            value={filters.priceRange || [0, MAX_PRICE]}
            onValueChange={handlePriceRangeChange}
            className="my-6"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange?.[0] || 0}</span>
            <span>${filters.priceRange?.[1] || MAX_PRICE}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">{t('events.filters.location')}</Label>
        <Input
          id="location"
          placeholder={t('events.filters.location')}
          value={filters.location}
          onChange={handleLocationChange}
          className="bg-white/5 border-white/10"
        />
      </div>

      <div className="space-y-2">
        <Label>{t('events.filters.categories')}</Label>
        <div className="grid grid-cols-1 gap-2">
          {EVENT_CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={filters.categories.includes(category) ? "default" : "outline"}
              className="w-full justify-start capitalize"
              onClick={() => handleCategoryToggle(category)}
            >
              {t(`events.categories.${category}`)}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};