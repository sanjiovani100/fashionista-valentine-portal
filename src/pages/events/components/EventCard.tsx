import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { OptimizedImage } from '@/components/cloudinary';
import type { FashionEvent } from '@/types/event.types';

interface EventCardProps {
  event: FashionEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
  const heroImage = event.fashion_images?.find(img => img.category === 'event_hero')?.url;

  return (
    <Link to={`/events/${event.id}`} className="block">
      <Card className="overflow-hidden transition-transform hover:scale-[1.02]">
        <div className="relative aspect-[16/9]">
          {heroImage && (
            <OptimizedImage
              publicId={heroImage}
              alt={event.title}
              className="object-cover w-full h-full"
              width={400}
              height={225}
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{event.venue}</p>
        </div>
      </Card>
    </Link>
  );
};