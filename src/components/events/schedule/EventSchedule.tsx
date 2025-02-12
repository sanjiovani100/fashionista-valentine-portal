import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { Section } from '@/components/layout/Section';
import { Grid, GridItem } from '@/components/layout/Grid';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Users, Star, Filter, CalendarPlus } from 'lucide-react';
import type { EventDetails, EventScheduleItem } from '@/types/event';

interface EventScheduleProps {
  event: EventDetails;
}

type CategoryFilter = 'all' | 'shows' | 'workshops' | 'networking' | string;

export const EventSchedule = ({ event }: EventScheduleProps) => {
  const [selectedDay, setSelectedDay] = useState<string>('day1');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [savedEvents, setSavedEvents] = useState<Set<string>>(new Set());

  // Group schedule items by day
  const scheduleByDay = useMemo(() => {
    const startDate = parseISO(event.start_time);
    const endDate = parseISO(event.end_time);
    const days: Record<string, EventScheduleItem[]> = {};
    
    event.schedule.forEach(item => {
      const itemDate = parseISO(item.time);
      const dayKey = format(itemDate, 'yyyy-MM-dd');
      if (!days[dayKey]) {
        days[dayKey] = [];
      }
      days[dayKey].push(item);
    });

    // Sort items within each day
    Object.keys(days).forEach(day => {
      days[day].sort((a, b) => parseISO(a.time).getTime() - parseISO(b.time).getTime());
    });

    return days;
  }, [event.schedule, event.start_time, event.end_time]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    event.schedule.forEach(item => {
      if (item.category) cats.add(item.category);
    });
    return ['all', ...Array.from(cats)];
  }, [event.schedule]);

  // Filter schedule items
  const filteredSchedule = useMemo(() => {
    if (categoryFilter === 'all') return scheduleByDay[selectedDay] || [];
    return (scheduleByDay[selectedDay] || []).filter(
      item => item.category?.toLowerCase() === categoryFilter.toLowerCase()
    );
  }, [scheduleByDay, selectedDay, categoryFilter]);

  // Toggle save event
  const toggleSaveEvent = (eventId: string) => {
    setSavedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  return (
    <Section
      variant="alternate"
      spacing="wide"
      className="bg-gradient-to-b from-black/40 to-black/20"
    >
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-fashion-pink font-montserrat">
            Event Schedule
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter">
            Plan your fashion week experience with our comprehensive schedule
          </p>
        </div>

        {/* Day Selection */}
        <Tabs
          defaultValue={selectedDay}
          onValueChange={setSelectedDay}
          className="w-full"
        >
          <TabsList className="w-full justify-start bg-black/20 p-1 overflow-x-auto">
            {Object.keys(scheduleByDay).map((day, index) => (
              <TabsTrigger
                key={day}
                value={day}
                className="flex items-center gap-2 data-[state=active]:bg-fashion-pink"
              >
                <Calendar className="w-4 h-4" />
                Day {index + 1}
                <span className="text-sm opacity-70">
                  {format(parseISO(day), 'MMM d')}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={categoryFilter === category ? 'default' : 'outline'}
              size="sm"
              className={`whitespace-nowrap ${
                categoryFilter === category
                  ? 'bg-fashion-pink hover:bg-fashion-pink/90'
                  : 'border-fashion-pink text-fashion-pink hover:bg-fashion-pink hover:text-white'
              }`}
              onClick={() => setCategoryFilter(category)}
            >
              <Filter className="w-4 h-4 mr-2" />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {filteredSchedule.map((item, index) => (
            <motion.div
              key={`${selectedDay}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Card className="bg-black/20 border-white/10 overflow-hidden">
                <div className="p-6 flex flex-col md:flex-row gap-6">
                  {/* Time Column */}
                  <div className="md:w-48 flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2 text-fashion-pink">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">
                        {format(parseISO(item.time), 'h:mm a')}
                      </span>
                    </div>
                    {item.duration && (
                      <Badge variant="outline" className="border-fashion-pink/30">
                        {item.duration}
                      </Badge>
                    )}
                  </div>

                  {/* Content Column */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {item.title}
                          {item.isHighlight && (
                            <Star className="w-5 h-5 text-yellow-400 inline ml-2" />
                          )}
                        </h3>
                        {item.category && (
                          <Badge className="mt-2 bg-fashion-pink/20 text-fashion-pink">
                            {item.category}
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`shrink-0 ${
                          savedEvents.has(item.title)
                            ? 'text-fashion-pink'
                            : 'text-white/50 hover:text-fashion-pink'
                        }`}
                        onClick={() => toggleSaveEvent(item.title)}
                      >
                        <CalendarPlus className="w-5 h-5" />
                      </Button>
                    </div>

                    <p className="text-white/70">{item.description}</p>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <div className="flex items-center gap-2 text-white/60">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </div>
                      {item.capacity && (
                        <div className="flex items-center gap-2 text-white/60">
                          <Users className="w-4 h-4" />
                          Capacity: {item.capacity}
                        </div>
                      )}
                      {item.speakers && item.speakers.length > 0 && (
                        <div className="flex items-center gap-2 text-white/60">
                          <div className="flex -space-x-2">
                            {item.speakers.map((speaker, idx) => (
                              <div
                                key={speaker}
                                className="w-6 h-6 rounded-full bg-fashion-pink/20 flex items-center justify-center text-xs font-medium text-fashion-pink ring-2 ring-black"
                              >
                                {speaker[0]}
                              </div>
                            ))}
                          </div>
                          <span>{item.speakers.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSchedule.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/50">
              No events found for the selected category on this day.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}; 


