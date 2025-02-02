import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { OptimizedImage } from '@/components/cloudinary/OptimizedImage';
import type { FashionEvent } from '@/types/database';

interface EventHeroProps {
  event: FashionEvent;
}

export const EventHero = ({ event }: EventHeroProps) => {
  const heroImage = event.fashion_images?.find(img => img.category === 'event_hero');

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          publicId={heroImage?.url || ''}
          alt={heroImage?.alt_text || event.title}
          className="w-full h-full object-cover"
          aspectRatio="video"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="font-montserrat text-4xl md:text-6xl font-bold mb-4">
          {event.title}
        </h1>
        <p className="font-inter text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          {event.description}
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
            Get Tickets
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
            <Calendar className="mr-2 h-5 w-5" />
            {new Date(event.start_time).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </Button>
        </div>
      </div>
    </section>
  );
};