import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/sections/hero/Hero";
import { EventsSection } from "@/components/sections/events/EventsSection";
import { EventHighlights } from "@/components/sections/event-highlights/EventHighlights";
import { LingerieShowcase } from "@/components/sections/lingerie-showcase/LingerieShowcase";
import { TicketSelection } from "@/components/sections/ticket-selection/TicketSelection";
import { Partners } from "@/components/sections/partners/Partners";
import { Sponsors } from "@/components/sections/sponsors/Sponsors";
import { Cta } from "@/components/sections/cta/Cta";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data: activeEvent, isLoading } = useQuery({
    queryKey: ['active-fashion-event'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('active_fashion_events')
        .select('*')
        .single();
      
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

  return (
    <PageLayout>
      <Hero />
      <EventsSection />
      <EventHighlights />
      <LingerieShowcase />
      <TicketSelection />
      <Partners />
      <Sponsors />
      <Cta />
    </PageLayout>
  );
};

export default Index;