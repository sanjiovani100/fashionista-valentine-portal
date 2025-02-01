import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EventList } from './EventList';
import type { EventSubtype } from '@/types/supabase/enums.types';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const EVENT_CATEGORIES: { label: string; value: EventSubtype }[] = [
  { label: 'Main Show', value: 'main_show' },
  { label: 'VIP Session', value: 'vip_session' },
  { label: 'Workshop', value: 'workshop' },
  { label: 'Networking', value: 'networking' },
  { label: 'Photo Session', value: 'photo_session' },
  { label: 'After Party', value: 'after_party' },
];

export const EventsSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'price-asc' | 'price-desc'>('date');
  const [selectedCategories, setSelectedCategories] = useState<EventSubtype[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    dateRange: undefined,
    priceRange: undefined as [number, number] | undefined,
    categories: [] as EventSubtype[],
    location: ''
  });

  const handleCategoryToggle = (category: EventSubtype, checked: boolean) => {
    let newCategories: EventSubtype[];
    if (checked) {
      newCategories = [...selectedCategories, category];
    } else {
      newCategories = selectedCategories.filter(c => c !== category);
    }
    setSelectedCategories(newCategories);
    setFilters(prev => ({ ...prev, categories: newCategories }));
  };

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
            Mark Your Calendar
          </motion.p>
          
          <motion.h2 
            id="events-title"
            variants={itemVariants}
            className="text-4xl md:text-5xl font-playfair mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
          >
            Upcoming Fashion Events
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Join us for exclusive fashion shows and events throughout the year
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-maroon hover:bg-maroon-light text-white border-white/20"
                  aria-label="Select event categories"
                >
                  Categories ({selectedCategories.length})
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="bg-gray-900/95 backdrop-blur-sm border-white/10 text-white"
                align="center"
              >
                <DropdownMenuLabel>Event Types</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {EVENT_CATEGORIES.map(({ label, value }) => (
                  <DropdownMenuCheckboxItem
                    key={value}
                    checked={selectedCategories.includes(value)}
                    onCheckedChange={(checked) => handleCategoryToggle(value, checked)}
                    className="hover:bg-maroon/20 focus:bg-maroon/20"
                  >
                    {label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </motion.div>

        <EventList 
          filters={filters}
          sortBy={sortBy}
          viewMode={viewMode}
        />
      </div>
    </section>
  );
};