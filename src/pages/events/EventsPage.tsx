import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { EventsHero } from './components/EventsHero';
import { EventsContent } from './components/EventsContent';
import { EventsCTA } from '@/components/sections/events/EventsCTA';

const EventsPage = () => {
  return (
    <PageLayout>
      <EventsHero />
      <EventsCTA ticketsRemaining={50} className="mt-8 mb-12" />
      <EventsContent />
    </PageLayout>
  );
};

export default EventsPage;