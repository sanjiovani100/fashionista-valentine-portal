import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import type { SwimwearEvent } from '@/types/swimwear.types';

interface SwimwearDetailsProps {
  event: SwimwearEvent;
}

export const SwimwearDetails = ({ event }: SwimwearDetailsProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Event Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 p-6 rounded-lg bg-gray-50">
            <Calendar className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Date</h3>
              <p>{new Date(event.start_time).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 rounded-lg bg-gray-50">
            <Clock className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Time</h3>
              <p>{new Date(event.start_time).toLocaleTimeString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 rounded-lg bg-gray-50">
            <MapPin className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Location</h3>
              <p>{event.venue}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 rounded-lg bg-gray-50">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Capacity</h3>
              <p>{event.capacity} attendees</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};