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

const Index = () => {
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
        .single();

      if (eventError) {
        console.error("Error fetching event data:", eventError);
        throw eventError;
      }
      
      console.log("Fetched event data:", eventData);
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

  // Get hero image
  const heroImage = (eventData.fashion_images || [])
    .find(img => img.category === 'event_hero')?.url;

  // Transform event content into highlights with images
  const highlights = (eventData.event_content || [])
    .filter(content => content.content_type === 'highlight')
    .map((highlight, index) => {
      // Get gallery images for highlights
      const galleryImages = (eventData.fashion_images || [])
        .filter(img => img.category === 'event_gallery');
      
      // Use modulo to cycle through available images if we have fewer images than highlights
      const imageIndex = index % galleryImages.length;
      
      return {
        ...highlight,
        image: galleryImages[imageIndex]?.url || '/placeholder.svg'
      };
    });

  // Transform collections with images
  const collections = (eventData.fashion_collections || []).map(collection => {
    const collectionImage = (eventData.fashion_images || []).find(
      img => img.metadata && 
           typeof img.metadata === 'object' && 
           'collection_id' in img.metadata && 
           img.metadata.collection_id === collection.id
    );
    
    return {
      ...collection,
      image: collectionImage?.url || '/placeholder.svg'
    };
  });

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
            headline={eventData.title}
            subheading={eventData.description}
            backgroundImage={heroImage}
          />

          <EventDetails features={features} />

          <EventsSection />

          <EventHighlights 
            highlights={highlights}
            images={eventData.fashion_images || []}
          />

          <LingerieShowcase collections={collections} />

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