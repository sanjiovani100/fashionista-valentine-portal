import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, Ticket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { FashionEvent } from '@/types/database';
import { format } from 'date-fns';

interface EventCardProps {
  event: FashionEvent;
  onRegister?: () => void;
  viewMode?: 'grid' | 'list';
}

export const EventCard = ({ event, onRegister, viewMode = 'grid' }: EventCardProps) => {
  // Calculate event status and price range
  const isUpcoming = new Date(event.start_time) > new Date();
  const minPrice = Math.min(...(event.event_tickets?.map(t => t.price) || [0]));
  const maxPrice = Math.max(...(event.event_tickets?.map(t => t.price) || [0]));
  const totalAvailableTickets = event.event_tickets?.reduce((sum, ticket) => sum + ticket.quantity_available, 0) || 0;
  const isSoldOut = totalAvailableTickets === 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      role="article"
      aria-label={`${event.title} - ${isUpcoming ? 'Upcoming Event' : 'Past Event'}`}
      className={viewMode === 'list' ? 'flex gap-6' : ''}
    >
      <Card className="group h-full overflow-hidden bg-black/40 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader className="space-y-2">
          <div className="flex justify-between items-start">
            <Badge 
              variant={isUpcoming ? "default" : "secondary"}
              className="bg-pink-magenta/80"
            >
              {isUpcoming ? 'Upcoming' : 'Past Event'}
            </Badge>
            {isSoldOut ? (
              <Badge variant="destructive">Sold Out</Badge>
            ) : (
              <span className="text-lg font-semibold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <CardTitle className="text-2xl font-playfair bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
            {event.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-white/80">{event.description}</p>
          
          <div className="space-y-3 text-sm text-white/60">
            <div className="flex items-center space-x-2 group-hover:text-white/80 transition-colors">
              <Calendar className="w-4 h-4 text-pink-magenta" />
              <span>{format(new Date(event.start_time), 'PPP')}</span>
            </div>
            
            <div className="flex items-center space-x-2 group-hover:text-white/80 transition-colors">
              <Clock className="w-4 h-4 text-pink-magenta" />
              <span>{format(new Date(event.start_time), 'p')} - {format(new Date(event.end_time), 'p')}</span>
            </div>
            
            <div className="flex items-center space-x-2 group-hover:text-white/80 transition-colors">
              <MapPin className="w-4 h-4 text-pink-magenta" />
              <span>{event.venue}</span>
            </div>
            
            <div className="flex items-center space-x-2 group-hover:text-white/80 transition-colors">
              <Users className="w-4 h-4 text-pink-magenta" />
              <span>Capacity: {event.capacity}</span>
            </div>

            <div className="flex items-center space-x-2 group-hover:text-white/80 transition-colors">
              <Ticket className="w-4 h-4 text-pink-magenta" />
              <span>{totalAvailableTickets} tickets available</span>
            </div>
          </div>

          <Button 
            onClick={onRegister}
            className="w-full bg-gradient-to-r from-pink-magenta to-purple-vivid hover:opacity-90 transition-opacity"
            disabled={isSoldOut || !isUpcoming}
            aria-label={isSoldOut ? 'Event is sold out' : !isUpcoming ? 'Event has ended' : `Register for ${event.title}`}
          >
            {isSoldOut ? 'Sold Out' : 'Register Now'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};