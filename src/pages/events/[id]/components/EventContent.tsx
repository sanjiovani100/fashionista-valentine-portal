import React from 'react';
import { Card } from '@/components/ui/card';
import type { FashionEvent } from '@/types/event.types';

interface EventContentProps {
  event: FashionEvent;
}

export const EventContent = ({ event }: EventContentProps) => {
  return (
    <div className="space-y-8">
      <Card className="p-6 bg-black/40 backdrop-blur-md border-white/10">
        <h2 className="text-2xl font-semibold mb-4">Event Overview</h2>
        <p className="text-gray-200">{event.description}</p>
      </Card>
      
      {/* Additional sections will be implemented here */}
      {/* - Designer showcase */}
      {/* - Collection highlights */}
      {/* - Schedule timeline */}
      {/* - Venue features */}
      {/* - Image gallery */}
    </div>
  );
};