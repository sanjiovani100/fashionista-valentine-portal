import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { EventsHero } from './components/EventsHero';
import { EventsContent } from './components/EventsContent';
import { Cta11 } from '@/components/blocks/shadcnblocks-com-cta11';

const EventsPage = () => {
  return (
    <PageLayout>
      <EventsHero />
      <EventsContent />
      <Cta11 
        heading="Ready to Join Our Next Fashion Event?"
        description="Don't miss out on our upcoming shows. Book your tickets now and be part of something extraordinary."
        buttons={{
          primary: {
            text: "Get Your Tickets",
            url: "#tickets",
            className: "bg-white text-maroon hover:bg-white/90"
          },
          secondary: {
            text: "View Schedule",
            url: "#schedule",
            className: "border-white/20 text-white hover:bg-white/10"
          }
        }}
      />
    </PageLayout>
  );
};

export default EventsPage;


