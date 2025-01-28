import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/sections/hero/Hero";
import { EventsSection } from "@/components/sections/events/EventsSection";
import { EventHighlights } from "@/components/sections/event-highlights/EventHighlights";
import { LingerieShowcase } from "@/components/sections/lingerie-showcase/LingerieShowcase";
import { TicketSelection } from "@/components/sections/ticket-selection/TicketSelection";
import { Partners } from "@/components/sections/partners/Partners";
import { Sponsors } from "@/components/sections/sponsors/Sponsors";
import { Cta } from "@/components/sections/cta/Cta";
import { EventDetails } from "@/components/sections/event-details/EventDetails";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { EventHighlightsProps, EventDetailsProps, LingerieShowcaseProps, TicketSelectionProps, CtaProps } from "@/types/event.types";

const Index = () => {
  const { data: eventData, isLoading, error } = useQuery({
    queryKey: ['active-fashion-event'],
    queryFn: async () => {
      const { data: eventData, error: eventError } = await supabase
        .from('fashion_events')
        .select(`
          *,
          event_tickets(*),
          event_content(*),
          fashion_collections(
            *,
            designer_profiles(*)
          ),
          fashion_images(*)
        `)
        .eq('name', 'valentines_fashion_show')
        .single();

      if (eventError) throw eventError;
      return eventData;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-red-deep" />
      </div>
    );
  }

  if (error || !eventData) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Loading Event</AlertTitle>
            <AlertDescription>
              {error?.message || "Event data could not be loaded. Please try again later."}
            </AlertDescription>
          </Alert>
        </div>
      </PageLayout>
    );
  }

  // Extract features from event content
  const features = eventData.event_content?.filter(
    content => content.content_type === 'feature'
  ) || [];

  // Extract highlights from event content
  const highlights = eventData.event_content?.filter(
    content => content.content_type === 'highlight'
  ) || [];

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
            headline={eventData.title}
            subheading={eventData.description}
            role="model"
          />

          <EventDetails features={features} />

          <EventsSection />

          <EventHighlights 
            highlights={highlights}
            images={eventData.fashion_images}
          />

          <LingerieShowcase 
            collections={eventData.fashion_collections}
          />

          <TicketSelection 
            tickets={eventData.event_tickets}
            eventDate={eventData.start_time}
          />

          <Partners />

          <Sponsors />

          <Cta 
            title="Join Us This Valentine's"
            description="Experience the most exclusive fashion event of the year"
            eventDate={eventData.start_time}
          />
        </motion.div>
      </AnimatePresence>
    </PageLayout>
  );
};

export default Index;