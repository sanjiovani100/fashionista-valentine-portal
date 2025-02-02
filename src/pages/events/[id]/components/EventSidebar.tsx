import React from 'react';
import type { FashionEvent } from '@/types/database';

interface EventSidebarProps {
  event: FashionEvent;
}

export const EventSidebar = ({ event }: EventSidebarProps) => {
  return (
    <div className="space-y-6 sticky top-24">
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Event Details</h3>
        <div className="space-y-4 text-white/80">
          <p>
            <strong>Location:</strong> {event.venue}
          </p>
          <p>
            <strong>Date:</strong>{' '}
            {new Date(event.start_time).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong>{' '}
            {new Date(event.start_time).toLocaleTimeString()}
          </p>
        </div>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Tickets</h3>
        {/* Ticket options will be implemented here */}
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Sponsors</h3>
        {/* Sponsor logos will be implemented here */}
      </div>
    </div>
  );
};