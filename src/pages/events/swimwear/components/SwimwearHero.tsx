import React from 'react';
import { OptimizedImage } from '@/components/cloudinary/OptimizedImage';
import type { SwimwearEvent } from '@/types/swimwear.types';

interface SwimwearHeroProps {
  event: SwimwearEvent;
}

export const SwimwearHero = ({ event }: SwimwearHeroProps) => {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      <OptimizedImage
        publicId="fashion-events/hero-beach-paradise"
        alt="Luxury beach paradise"
        className="absolute inset-0 w-full h-full object-cover"
        aspectRatio="video"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
          {event.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl animate-slide-up">
          {event.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-scale-in">
          <button className="btn-primary px-8 py-3 rounded-full text-lg">
            Book Now
          </button>
          <button className="btn-secondary px-8 py-3 rounded-full text-lg">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};