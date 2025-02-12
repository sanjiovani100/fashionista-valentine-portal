import React, { useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/sections/hero/Hero";
import { EventHighlights } from "@/components/sections/event-highlights/EventHighlights";
import { LingerieShowcase } from "@/components/sections/lingerie-showcase/LingerieShowcase";
import { TicketSelection } from "@/components/sections/ticket-selection/TicketSelection";
import { Partners } from "@/components/sections/partners/Partners";
import { Sponsors } from "@/components/sections/sponsors/Sponsors";
import { Cta11 } from "@/components/blocks/shadcnblocks-com-cta11";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { useEventData } from "./hooks/useEventData";
import { transformEventData } from "./utils/highlights/transform";
import { toast } from "sonner";
import { EventsSection } from '@/components/sections/events/EventsSection';

const Index = () => {
  const { data: eventData, isLoading, error } = useEventData();
  const containerRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !eventData) {
    toast.error("Error loading event data. Please try again.");
    return <ErrorState error={error as Error} />;
  }

  const { highlights, collectionsWithImages, heroImage } = transformEventData(eventData);

  return (
    <PageLayout>
      <AnimatePresence mode="wait">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Hero Section */}
          <section className="relative">
            <Hero 
              headline={eventData?.title}
              subheading={eventData?.description}
              backgroundImage={heroImage}
              eventDate={eventData?.start_time}
            />
          </section>

          {/* Event Highlights Section */}
          <section className="bg-gradient-to-b from-black to-maroon/10 py-24">
            <div className="container mx-auto px-4 md:px-8">
              <EventHighlights 
                highlights={highlights}
                images={eventData.fashion_images || []}
              />
            </div>
          </section>

          {/* Events Section */}
          <EventsSection />

          {/* Lingerie Showcase Section */}
          <section className="bg-gradient-to-b from-maroon/10 to-black py-24">
            <div className="container mx-auto px-4 md:px-8">
              <LingerieShowcase collections={collectionsWithImages} />
            </div>
          </section>

          {/* Ticket Selection Section */}
          <section className="bg-gradient-to-b from-black to-maroon/10 py-24" id="tickets">
            <div className="container mx-auto px-4 md:px-8">
              <TicketSelection 
                tickets={eventData.event_tickets?.slice(0, 3) || []}
                eventDate={eventData.start_time}
              />
            </div>
          </section>

          {/* Partners Section */}
          <section className="bg-gradient-to-b from-maroon/5 to-black py-24">
            <div className="container mx-auto px-4 md:px-8">
              <Partners />
            </div>
          </section>

          {/* Sponsors Section */}
          <section className="bg-black py-24">
            <div className="container mx-auto px-4 md:px-8">
              <Sponsors />
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-b from-black to-maroon/10 py-24">
            <div className="container mx-auto px-4 md:px-8">
              <Cta11
                heading={`Join Our ${eventData.title}`}
                description="Be part of an unforgettable evening celebrating fashion, creativity, and empowerment"
                buttons={{
                  primary: {
                    text: "Get Your Tickets",
                    url: "#tickets"
                  },
                  secondary: {
                    text: "Learn More",
                    url: "#about"
                  }
                }}
              />
            </div>
          </section>
        </motion.div>
      </AnimatePresence>
    </PageLayout>
  );
};

export default Index;


