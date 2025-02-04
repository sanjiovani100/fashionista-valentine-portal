import React, { useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { useEventData } from "./hooks/useEventData";
import { transformEventData } from "./utils/highlights/transform";
import { toast } from "sonner";

// Import section components
import { HeroSection } from "./components/sections/HeroSection";
import { TestRunnerSection } from "./components/sections/TestRunnerSection";
import { EventHighlightsSection } from "./components/sections/EventHighlightsSection";
import { LingerieShowcaseSection } from "./components/sections/LingerieShowcaseSection";
import { TicketSection } from "./components/sections/TicketSection";
import { PartnersSection } from "./components/sections/PartnersSection";
import { SponsorsSection } from "./components/sections/SponsorsSection";
import { CTASection } from "./components/sections/CTASection";

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
          <HeroSection 
            title={eventData?.title || "Fashionistas Valentine's Event"}
            description={eventData?.description || "Join us for an exclusive celebration of fashion, creativity, and empowerment"}
            backgroundImage={heroImage}
          />

          <TestRunnerSection />

          <EventHighlightsSection 
            highlights={highlights}
            images={eventData.fashion_images || []}
          />

          <LingerieShowcaseSection collections={collectionsWithImages} />

          <TicketSection 
            tickets={eventData.event_tickets?.slice(0, 3) || []}
            eventDate={eventData.start_time}
          />

          <PartnersSection />

          <SponsorsSection />

          <CTASection />
        </motion.div>
      </AnimatePresence>
    </PageLayout>
  );
};

export default Index;