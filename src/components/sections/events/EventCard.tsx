import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { FashionEvent } from '@/types/database';
import { format } from 'date-fns';

interface EventCardProps {
  event: FashionEvent;
  onRegister?: () => void;
}

export const EventCard = ({ event, onRegister }: EventCardProps) => {
  return (
    <Card className="group h-full overflow-hidden bg-black/40 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300">
      <CardHeader>
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
            <MapPin className="w-4 h-4 text-pink-magenta" />
            <span>{event.venue}</span>
          </div>
          
          <div className="flex items-center space-x-2 group-hover:text-white/80 transition-colors">
            <Users className="w-4 h-4 text-pink-magenta" />
            <span>Capacity: {event.capacity}</span>
          </div>
        </div>

        <Button 
          onClick={onRegister}
          className="w-full bg-gradient-to-r from-pink-magenta to-purple-vivid hover:opacity-90 transition-opacity"
        >
          Register Now
        </Button>
      </CardContent>
    </Card>
  );
};