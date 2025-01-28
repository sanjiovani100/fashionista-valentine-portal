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
import { motion } from "framer-motion";

const Index = () => {
  const { data: activeEvent, isLoading } = useQuery({
    queryKey: ['active-fashion-event'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('active_fashion_events')
        .select('*')
        .maybeSingle();
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-fashion-pink" />
      </div>
    );
  }

  if (!activeEvent) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Active Event</AlertTitle>
            <AlertDescription>
              There are currently no active fashion events. Please check back later.
            </AlertDescription>
          </Alert>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <EventDetails />
        <EventsSection />
        <EventHighlights />
        <LingerieShowcase />
        <TicketSelection />
        <Partners />
        <Sponsors />
        <Cta />
      </motion.div>
    </PageLayout>
  );
};

export default Index;