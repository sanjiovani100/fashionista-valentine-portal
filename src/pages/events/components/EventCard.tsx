import React from 'react';
import { format } from 'date-fns';
import { OptimizedImage } from '@/components/cloudinary/components/CloudinaryImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';

interface EventCardProps {
  event: any; // Type will be properly defined once we have the full schema
  viewMode: 'grid' | 'list';
}

export const EventCard = ({ event, viewMode }: EventCardProps) => {
  const imageUrl = event.fashion_images?.[0]?.url;
  const price = event.event_tickets?.[0]?.price;

  return (
    <div className={`group bg-gray-500/5 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
      viewMode === 'list' ? 'flex gap-6' : ''
    }`}>
      {/* Image */}
      <div className={viewMode === 'list' ? 'w-1/3' : 'w-full'}>
        <OptimizedImage
          publicId={imageUrl || ''}
          alt={event.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <Badge>{event.subtype}</Badge>
          {price && (
            <span className="text-lg font-semibold text-primary">
              ${price}
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>

        <div className="space-y-2 mb-4 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(event.start_time), 'PPP')}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.venue}</span>
          </div>
        </div>

        <Button className="w-full">Get Tickets</Button>
      </div>
    </div>
  );
};