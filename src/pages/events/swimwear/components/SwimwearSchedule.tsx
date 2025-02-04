import React from 'react';
import type { SwimwearEvent } from '@/types/swimwear.types';

interface SwimwearScheduleProps {
  event: SwimwearEvent;
}

export const SwimwearSchedule = ({ event }: SwimwearScheduleProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Event Schedule</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {event.details.fitting_sessions.map((session, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-lg shadow-sm"
            >
              <div className="md:w-1/4">
                <p className="font-semibold">{session.time}</p>
                <p className="text-gray-600">{session.date}</p>
              </div>
              <div className="md:w-3/4">
                <h3 className="font-semibold">Fitting Session</h3>
                <p className="text-gray-600">Designer: {session.designer}</p>
                <p className="text-gray-600">Location: {session.location}</p>
              </div>
            </div>
          ))}
          {event.details.beauty_workshops.map((workshop, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-lg shadow-sm"
            >
              <div className="md:w-1/4">
                <p className="font-semibold">{workshop.time}</p>
              </div>
              <div className="md:w-3/4">
                <h3 className="font-semibold">{workshop.title}</h3>
                <p className="text-gray-600">Instructor: {workshop.instructor}</p>
                <p className="text-gray-600">Location: {workshop.location}</p>
                <p className="mt-2">{workshop.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};