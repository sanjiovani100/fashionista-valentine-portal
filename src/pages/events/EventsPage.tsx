import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { EventsHero } from './components/EventsHero';
import { EventsContent } from './components/EventsContent';

const EventsPage = () => {
  return (
    <PageLayout>
      <EventsHero />
      <EventsContent />
    </PageLayout>
  );
};

export default EventsPage;