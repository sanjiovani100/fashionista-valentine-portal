import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  venue: string;
  startTime: string;
  capacity: number;
  eventType: string;
  registrationDeadline: string;
}

export const EventCard = ({
  id,
  title,
  description,
  imageUrl,
  venue,
  startTime,
  capacity,
  eventType,
  registrationDeadline
}: EventCardProps) => {
  const isEarlyBird = new Date(registrationDeadline) > new Date();
  // Clean up the event ID by removing any trailing periods
  const cleanEventId = id.replace(/\.$/, '');

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden bg-black/20 border-white/10 hover:border-white/20">
        {/* Image Section */}
        <div className="relative">
          <div 
            className="w-full h-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          {isEarlyBird && (
            <Badge 
              className="absolute top-4 right-4 bg-fashion-pink text-white"
            >
              Early Bird
            </Badge>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Event Type */}
          <Badge variant="outline" className="text-fashion-pink border-fashion-pink">
            {eventType}
          </Badge>

          {/* Title & Description */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-white/70 line-clamp-2">{description}</p>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-white/80">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(startTime), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-4 h-4" />
              <span>{venue}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Users className="w-4 h-4" />
              <span>{capacity} attendees</span>
            </div>
          </div>

          {/* CTA Button */}
          <Link to={`/events/${cleanEventId}`}>
            <Button 
              className="w-full bg-fashion-pink hover:bg-fashion-pink/90 mt-4"
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}; 