import React from 'react';
import { OptimizedImage } from '@/components/cloudinary/OptimizedImage';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Sun, Waves } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import type { FashionEvent } from '@/types/event.types';

interface SwimwearHeroProps {
  event: FashionEvent;
}

export const SwimwearHero = ({ event }: SwimwearHeroProps) => {
  const heroImage = event.fashion_images?.find(img => img.category === 'event_hero')?.url;

  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Hero Image with Overlay */}
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
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-3xl space-y-6">
            {/* Event Type Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm 
                         text-blue-200 px-4 py-2 rounded-full"
            >
              <Waves className="w-4 h-4" />
              <span className="text-sm font-medium">Swimwear Show</span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {event.title}
            </motion.h1>

            {/* Event Details */}
            <motion.div 
              className="flex flex-wrap gap-6 text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{format(new Date(event.start_time), 'PPP')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5" />
                <span>Beachside Event</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                size="lg" 
                className="bg-blue-500 hover:bg-blue-600 text-white min-w-[200px]
                         transition-all duration-300 ease-out transform hover:scale-105"
              >
                Get Tickets
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10 min-w-[200px]
                         transition-all duration-300 ease-out transform hover:scale-105"
              >
                View Schedule
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};