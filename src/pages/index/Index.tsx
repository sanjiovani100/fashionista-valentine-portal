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
import { Loader2, AlertCircle, Heart, Star, Award } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  const { data: eventData, isLoading, error } = useQuery({
    queryKey: ['active-fashion-event'],
    queryFn: async () => {
      console.log("Fetching event data...");
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
        .maybeSingle();

      if (eventError) {
        console.error("Error fetching event data:", eventError);
        throw eventError;
      }
      
      if (!eventData) {
        console.error("No event data found");
        return null;
      }

      console.log("Event data fetched successfully:", eventData);
      console.log("Fashion images:", eventData?.fashion_images);
      
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
    console.error("Error in event data:", error);
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

  // Get hero image with fallback and debug logging
  const heroImage = eventData?.fashion_images?.find(img => img.category === 'event_hero')?.url;
  console.log("Hero image URL:", heroImage);

  // Transform event_content to include image property
  const highlights = eventData.event_content
    .filter(content => content.content_type === 'highlight')
    .map(highlight => ({
      ...highlight,
      image: highlight.media_urls?.[0] || '/placeholder.svg' // Use first media URL or fallback
    }));

  // Create features array for EventDetails component
  const features = [
    {
      icon: Heart,
      title: "Exclusive Experience",
      content: "Immerse yourself in a world of luxury and style"
    },
    {
      icon: Star,
      title: "Top Designers",
      content: "Showcase of the most innovative fashion creators"
    },
    {
      icon: Award,
      title: "Empowerment",
      content: "Celebrating creativity and individual expression"
    }
  ];

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

          <EventDetails features={features} />

          <EventsSection />

          <EventHighlights 
            highlights={highlights}
            images={eventData.fashion_images || []}
          />

          <LingerieShowcase collections={eventData.fashion_collections} />

          <TicketSelection 
            tickets={eventData.event_tickets || []}
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