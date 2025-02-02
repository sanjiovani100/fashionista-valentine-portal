import React from 'react';
import { Card } from '@/components/ui/card';
import type { FashionEvent } from '@/types/event.types';

interface EventSidebarProps {
  event: FashionEvent;
}

export const EventSidebar = ({ event }: EventSidebarProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-black/40 backdrop-blur-md border-white/10">
        <h3 className="text-xl font-semibold mb-4">Quick Details</h3>
        {/* Quick details content will be implemented here */}
      </Card>
      
      {/* Additional sections will be implemented here */}
      {/* - Ticket categories */}
      {/* - Sponsor advertisements */}
      {/* - Related events */}
    </div>
  );
};