import React from 'react';
import { format } from 'date-fns';
import { OptimizedImage } from '@/components/cloudinary/components/CloudinaryImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Ticket, Users } from 'lucide-react';
import type { FashionEvent } from '@/types/database';

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
    <div className={`group bg-gray-500/5 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
      viewMode === 'list' ? 'flex gap-6' : ''
    }`}>
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
          <Badge variant={isUpcoming ? 'default' : 'secondary'}>
            {isUpcoming ? 'Upcoming' : 'Past Event'}
          </Badge>
          {isSoldOut ? (
            <Badge variant="destructive">Sold Out</Badge>
          ) : (
            <span className="text-lg font-semibold text-primary">
              ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2 mb-4 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{format(new Date(event.start_time), 'PPP')}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span>Capacity: {event.capacity}</span>
          </div>
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4 text-primary" />
            <span>{totalAvailableTickets} tickets available</span>
          </div>
        </div>

        <Button 
          className="w-full"
          disabled={isSoldOut || !isUpcoming}
        >
          {isSoldOut ? 'Sold Out' : 'Get Tickets'}
        </Button>
      </div>
    </div>
  );
};