import React from 'react';
import { format } from 'date-fns';
import { OptimizedImage } from '@/components/cloudinary/components/CloudinaryImage';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import type { FashionEvent } from '@/types/database';
import { motion } from 'framer-motion';

interface EventCardProps {
  event: FashionEvent;
  viewMode: 'grid' | 'list';
}

export const EventCard = ({ event, viewMode }: EventCardProps) => {
  const heroImage = event.fashion_images?.find(img => img.category === 'event_hero');
  const isUpcoming = new Date(event.start_time) > new Date();

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
        {heroImage ? (
          <OptimizedImage
            publicId={heroImage.url}
            alt={heroImage.alt_text || event.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-48 bg-gray-800 animate-pulse" />
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1">
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
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-pink-magenta to-purple-vivid hover:opacity-90 transition-opacity"
          disabled={!isUpcoming}
          aria-label={!isUpcoming ? 'Event has ended' : `Get tickets for ${event.title}`}
        >
          Get Tickets
        </Button>
      </div>
    </motion.div>
  );
};