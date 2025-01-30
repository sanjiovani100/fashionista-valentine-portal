import React from 'react';
import { format } from 'date-fns';
import { OptimizedImage } from '@/components/cloudinary/components/CloudinaryImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Ticket, Users } from 'lucide-react';
import type { FashionEvent } from '@/types/database';
import { motion } from 'framer-motion';

interface EventCardProps {
  event: FashionEvent;
  viewMode: 'grid' | 'list';
}

export const EventCard = ({ event, viewMode }: EventCardProps) => {
  const heroImage = event.fashion_images?.find(img => img.category === 'event_hero');
  const minPrice = Math.min(...(event.event_tickets?.map(t => t.price) || [0]));
  const maxPrice = Math.max(...(event.event_tickets?.map(t => t.price) || [0]));
  const totalAvailableTickets = event.event_tickets?.reduce((sum, ticket) => sum + ticket.quantity_available, 0) || 0;
  const isUpcoming = new Date(event.start_time) > new Date();
  const isSoldOut = totalAvailableTickets === 0;

  return (
    <motion.div 
      className={`group bg-black/40 backdrop-blur-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-white/10 hover:border-white/20 ${
        viewMode === 'list' ? 'flex gap-6' : ''
      }`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      <div className={viewMode === 'list' ? 'w-1/3' : 'w-full'}>
        <OptimizedImage
          publicId={heroImage?.url || ''}
          alt={heroImage?.alt_text || event.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <Badge variant={isUpcoming ? 'default' : 'secondary'} className="bg-pink-magenta/80">
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

        <h3 className="text-xl font-semibold mb-2 font-playfair bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
          {event.title}
        </h3>
        <p className="text-sm text-white/80 mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2 mb-4 text-sm text-white/60">
          <div className="flex items-center gap-2 group-hover:text-white/80 transition-colors">
            <Calendar className="h-4 w-4 text-pink-magenta" />
            <span>{format(new Date(event.start_time), 'PPP')}</span>
          </div>
          <div className="flex items-center gap-2 group-hover:text-white/80 transition-colors">
            <MapPin className="h-4 w-4 text-pink-magenta" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center gap-2 group-hover:text-white/80 transition-colors">
            <Users className="h-4 w-4 text-pink-magenta" />
            <span>Capacity: {event.capacity}</span>
          </div>
          <div className="flex items-center gap-2 group-hover:text-white/80 transition-colors">
            <Ticket className="h-4 w-4 text-pink-magenta" />
            <span>{totalAvailableTickets} tickets available</span>
          </div>
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-pink-magenta to-purple-vivid hover:opacity-90 transition-opacity"
          disabled={isSoldOut || !isUpcoming}
          aria-label={isSoldOut ? 'Event is sold out' : !isUpcoming ? 'Event has ended' : `Get tickets for ${event.title}`}
        >
          {isSoldOut ? 'Sold Out' : 'Get Tickets'}
        </Button>
      </div>
    </motion.div>
  );
};