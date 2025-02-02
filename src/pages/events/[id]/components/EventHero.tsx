import React from 'react';
import { OptimizedImage } from '@/components/cloudinary/OptimizedImage';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import type { FashionEvent } from '@/types/event.types';

interface EventHeroProps {
  event: FashionEvent;
}

export const EventHero = ({ event }: EventHeroProps) => {
  const heroImage = event.fashion_images?.find(img => img.category === 'event_hero')?.url;

  return (
    <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
      {heroImage && (
        <OptimizedImage
          publicId={heroImage}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{format(new Date(event.start_time), 'PPP')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{event.venue}</span>
              </div>
            </div>
            <Button size="lg" className="bg-maroon hover:bg-maroon-light">
              Get Tickets
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};