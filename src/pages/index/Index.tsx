import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/sections/hero/Hero";
import { EventsSection } from "@/components/sections/events/EventsSection";
import { EventHighlights } from "@/components/sections/event-highlights/EventHighlights";
import { LingerieShowcase } from "@/components/sections/lingerie-showcase/LingerieShowcase";
import { TicketSelection } from "@/components/sections/ticket-selection/TicketSelection";
import { Partners } from "@/components/sections/partners/Partners";
import { Sponsors } from "@/components/sections/sponsors/Sponsors";
import { CTASection } from "@/components/blocks/cta-with-rectangle";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { useEventData } from "./hooks/useEventData";
import { transformEventData } from "./utils/transformEventData";

const Index = () => {
  const { data: eventData, isLoading, error } = useEventData();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !eventData) {
    return <ErrorState error={error as Error} />;
  }

  const { highlights, collectionsWithImages, heroImage } = transformEventData(eventData);

  return (
    <PageLayout>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-20 overflow-hidden"
        >
          <Hero 
            headline={eventData?.title || "Fashionistas Valentine's Event"}
            subheading={eventData?.description || "Join us for an exclusive celebration of fashion, creativity, and empowerment"}
            backgroundImage={heroImage}
          />
          
          <EventsSection />
          <EventHighlights 
            highlights={highlights}
            images={eventData.fashion_images || []}
          />
          <LingerieShowcase collections={collectionsWithImages} />
          <TicketSelection 
            tickets={eventData.event_tickets?.slice(0, 3) || []}
            eventDate={eventData.start_time}
          />
          <Partners />
          <Sponsors />
          
          <CTASection
            badge={{
              text: "Join Us This Valentine's"
            }}
            title="Experience the most exclusive fashion event of the year"
            action={{
              text: "Get Your Tickets Now",
              href: "#tickets",
              variant: "default"
            }}
            withGlow={true}
          />
        </motion.div>
      </AnimatePresence>
    </PageLayout>
  );
};

export default Index;