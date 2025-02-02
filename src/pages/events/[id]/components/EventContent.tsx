import React from 'react';
import type { FashionEvent } from '@/types/database';

interface EventContentProps {
  event: FashionEvent;
}

export const EventContent = ({ event }: EventContentProps) => {
  return (
    <div className="space-y-8">
      <section className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Event Overview</h2>
        <p className="text-white/80">{event.description}</p>
      </section>
      
      {/* Placeholder sections - to be implemented */}
      <section className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Designer Showcase</h2>
      </section>
      
      <section className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Schedule</h2>
      </section>
      
      <section className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Gallery</h2>
      </section>
    </div>
  );
};