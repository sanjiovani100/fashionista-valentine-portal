import React from 'react';
import { Card } from '@/components/ui/card';
import type { FashionEvent } from '@/types/event.types';
import { BeachParty } from './swimwear/BeachParty';

interface EventContentProps {
  event: FashionEvent;
}

export const EventContent = ({ event }: EventContentProps) => {
  // Check if this is a swimwear event
  const isSwimwearEvent = event.subtype === 'swimwear';

  return (
    <div className="space-y-8">
      <Card className="p-6 bg-black/40 backdrop-blur-md border-white/10">
        <h2 className="text-2xl font-semibold mb-4">Event Overview</h2>
        <p className="text-gray-200">{event.description}</p>
      </Card>
      
      {isSwimwearEvent && event.swimwear_event_details && (
        <BeachParty details={event.swimwear_event_details.beach_party_details} />
      )}
      
      {/* Additional sections will be implemented here */}
      {/* - Designer showcase */}
      {/* - Collection highlights */}
      {/* - Schedule timeline */}
      {/* - Venue features */}
      {/* - Image gallery */}
    </div>
  );
};