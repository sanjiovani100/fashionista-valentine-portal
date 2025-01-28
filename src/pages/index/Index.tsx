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
import { Loader2, Heart, Star, Award } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Feature, Highlight, CollectionDisplay, TicketDisplay, EventContent, FashionImage, FashionCollection, EventTicket } from "@/types/event.types";

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

  // Transform event content into features
  const eventFeatures = (eventData.event_content as EventContent[] || [])
    .filter(content => content.content_type === 'feature')
    .map(feature => ({
      icon: feature.title.includes('Exclusive') ? Heart :
           feature.title.includes('Top') ? Star : Award,
      title: feature.title,
      description: feature.content
    })) as Feature[];

  // Transform event content into highlights
  const eventHighlights = (eventData.event_content as EventContent[] || [])
    .filter(content => content.content_type === 'highlight')
    .map(highlight => ({
      title: highlight.title,
      description: highlight.content,
      image: highlight.media_urls?.[0] || '/placeholder.svg'
    })) as Highlight[];

  // Transform collections with images
  const eventCollections = ((eventData.fashion_collections as FashionCollection[]) || []).map(collection => ({
    ...collection,
    image: (eventData.fashion_images as FashionImage[] || []).find(
      img => img.metadata && typeof img.metadata === 'object' && 
      'collection_id' in img.metadata && 
      img.metadata.collection_id === collection.id
    )?.url || '/placeholder.svg'
  })) as CollectionDisplay[];

  // Transform tickets
  const eventTickets = ((eventData.event_tickets as EventTicket[]) || []).map(ticket => ({
    title: ticket.ticket_type,
    subtitle: `${ticket.ticket_type} access to the Fashionistas Valentine's Event`,
    price: `$${ticket.price}`,
    perks: ticket.benefits || [],
    limited: ticket.quantity_available < 10
  })) as TicketDisplay[];

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

          <EventDetails features={eventFeatures} />

          <EventsSection />

          <EventHighlights 
            highlights={eventHighlights}
            images={eventData.fashion_images as FashionImage[] || []}
          />

          <LingerieShowcase collections={eventCollections} />

          <TicketSelection 
            tickets={eventTickets}
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