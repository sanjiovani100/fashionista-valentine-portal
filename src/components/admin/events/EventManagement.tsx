import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Calendar, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { EventDetails } from '@/types/event';

interface EventManagementProps {
  events: EventDetails[];
  onCreateEvent: () => void;
  onEditEvent: (eventId: string) => void;
  onDeleteEvent: (eventId: string) => void;
}

export const EventManagement = ({
  events,
  onCreateEvent,
  onEditEvent,
  onDeleteEvent
}: EventManagementProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    dateRange: null,
    status: 'all',
    capacity: 'all'
  });

  // Filter events based on active tab and search query
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const now = new Date();
    const eventDate = new Date(event.start_time);
    
    const matchesTab = activeTab === 'all' ||
                      (activeTab === 'upcoming' && eventDate > now) ||
                      (activeTab === 'past' && eventDate < now);
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Event Management</h1>
          <p className="text-white/70">Manage and monitor your fashion events</p>
        </div>
        <Button
          onClick={onCreateEvent}
          className="bg-fashion-pink hover:bg-fashion-pink/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-white/40"
          />
        </div>
        <Button variant="outline" className="border-fashion-pink text-fashion-pink">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
        <TabsList className="bg-black/20 border-b border-white/10">
          <TabsTrigger
            value="all"
            className={activeTab === 'all' ? 'text-fashion-pink' : 'text-white/60'}
          >
            All Events
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className={activeTab === 'upcoming' ? 'text-fashion-pink' : 'text-white/60'}
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className={activeTab === 'past' ? 'text-fashion-pink' : 'text-white/60'}
          >
            Past
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-black/20 border-white/10 hover:border-white/20 p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                  <p className="text-white/60 text-sm mt-1">{event.venue}</p>
                </div>
                <Badge
                  className={
                    new Date(event.start_time) > new Date()
                      ? 'bg-green-500/20 text-green-500'
                      : 'bg-gray-500/20 text-gray-400'
                  }
                >
                  {new Date(event.start_time) > new Date() ? 'Upcoming' : 'Past'}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-white/60">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {new Date(event.start_time).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center text-white/60">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{event.capacity} attendees</span>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-fashion-pink text-fashion-pink hover:bg-fashion-pink hover:text-white"
                  onClick={() => onEditEvent(event.id)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Manage
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/50">No events found matching your criteria</p>
        </div>
      )}
    </div>
  );
}; 