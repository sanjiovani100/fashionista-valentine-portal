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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden bg-black/40 backdrop-blur-md border-fashion-pink/20 hover:border-fashion-pink/40 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-playfair">{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">{event.description}</p>
          
          <div className="flex flex-col space-y-2 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-fashion-pink" />
              <span>{format(new Date(event.start_time), 'PPP')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-fashion-pink" />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-fashion-pink" />
              <span>Capacity: {event.capacity}</span>
            </div>
          </div>

          <Button 
            onClick={onRegister}
            className="w-full bg-gradient-to-r from-fashion-pink to-deep-purple hover:opacity-90"
          >
            Register Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};