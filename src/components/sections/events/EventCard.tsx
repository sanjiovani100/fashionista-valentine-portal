import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { FashionEvent } from '@/types/database';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

interface EventCardProps {
  event: FashionEvent;
  onRegister?: () => void;
  viewMode?: 'grid' | 'list';
}

export const EventCard = ({ event, onRegister, viewMode }: EventCardProps) => {
  const { t } = useTranslation('home');
  const isUpcoming = new Date(event.start_time) > new Date();
  const totalAvailableTickets = event.event_tickets?.reduce((sum, ticket) => sum + ticket.quantity_available, 0) || 0;
  const isSoldOut = totalAvailableTickets === 0;

  const eventStatus = isUpcoming ? t('events.card.upcomingEvent') : t('events.card.pastEvent');
  const buttonText = isSoldOut ? t('events.card.soldOut') : t('events.card.registerNow');
  const ariaLabel = isSoldOut 
    ? t('events.card.accessibility.soldOut')
    : !isUpcoming 
      ? t('events.card.accessibility.ended')
      : t('events.card.accessibility.register', { title: event.title });

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      role="article"
      aria-label={`${event.title} - ${eventStatus}`}
      className={viewMode === 'list' ? 'flex gap-6' : ''}
    >
      <Card className="group h-full overflow-hidden bg-black/40 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader className="space-y-2">
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
              <Clock className="w-4 h-4 text-pink-magenta" />
              <span>{format(new Date(event.start_time), 'p')} - {format(new Date(event.end_time), 'p')}</span>
            </div>
            
            <div className="flex items-center space-x-2 group-hover:text-white/80 transition-colors">
              <MapPin className="w-4 h-4 text-pink-magenta" />
              <span>{event.venue}</span>
            </div>
          </div>

          <Button 
            onClick={onRegister}
            className="w-full bg-gradient-to-r from-pink-magenta to-purple-vivid hover:opacity-90 transition-opacity"
            disabled={isSoldOut || !isUpcoming}
            aria-label={ariaLabel}
          >
            {buttonText}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};


