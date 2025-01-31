import React, { useEffect, useRef } from 'react';
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
          className="space-y-8 md:space-y-12 lg:space-y-16 overflow-hidden"
        >
          <Hero 
            headline={eventData?.title || "Fashionistas Valentine's Event"}
            subheading={eventData?.description || "Join us for an exclusive celebration of fashion, creativity, and empowerment"}
            backgroundImage={heroImage}
          />
          
          <section className="container mx-auto px-4 md:px-8">
            <EventHighlights 
              highlights={highlights}
              images={eventData.fashion_images || []}
            />
          </section>

          <section className="container mx-auto px-4 md:px-8">
            <LingerieShowcase collections={collectionsWithImages} />
          </section>

          <section className="container mx-auto px-4 md:px-8" id="tickets">
            <TicketSelection 
              tickets={eventData.event_tickets?.slice(0, 3) || []}
              eventDate={eventData.start_time}
            />
          </section>

          <Partners />

          <section className="container mx-auto px-4 md:px-8">
            <Sponsors />
          </section>

          <section className="container mx-auto px-4 md:px-8">
            <Cta11
              heading="Join Our Valentine's Fashion Event"
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
          </section>
        </motion.div>
      </AnimatePresence>
    </PageLayout>
  );
};

export default Index;