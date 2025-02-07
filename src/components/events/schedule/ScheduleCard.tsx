import { motion } from 'framer-motion';
import { Clock, MapPin, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { EventScheduleItem } from '@/types/event';

interface ScheduleCardProps {
  item: EventScheduleItem;
  isActive?: boolean;
  onClick?: () => void;
}

export const ScheduleCard = ({ item, isActive = false, onClick }: ScheduleCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card
        className={`
          cursor-pointer
          transition-colors duration-200
          ${isActive 
            ? 'bg-fashion-pink/20 border-fashion-pink' 
            : 'bg-black/20 border-white/10 hover:border-white/20'
          }
        `}
        onClick={onClick}
      >
        <div className="p-6 space-y-4">
          {/* Time and Category */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-fashion-pink" />
              <span className="text-lg font-semibold text-white">{item.time}</span>
            </div>
            {item.category && (
              <Badge 
                variant="outline" 
                className={`
                  ${isActive 
                    ? 'border-fashion-pink text-fashion-pink' 
                    : 'border-white/20 text-white/70'
                  }
                `}
              >
                {item.category}
              </Badge>
            )}
          </div>

          {/* Title and Description */}
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-white">{item.title}</h4>
            <p className="text-white/70">{item.description}</p>
          </div>

          {/* Location and Speakers */}
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-white/60">
              <MapPin className="w-4 h-4" />
              <span>{item.location}</span>
            </div>
            {item.speakers && item.speakers.length > 0 && (
              <div className="flex items-center gap-2 text-white/60">
                <Users className="w-4 h-4" />
                <span>{item.speakers.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}; 