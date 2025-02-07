import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users, Star, Ticket, Camera, Info } from "lucide-react";
import type { EventDetails, EventImage, EventSponsor, TicketTier } from "@/types/event";
import { ErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { TicketCard } from "@/components/cards/TicketCard";

// Update RawEventData interface to match the database schema
interface RawEventData {
  id: string;
  name: "valentines_fashion_show" | "spring_fling_fashion_show" | "summer_splash_fashion_show" | "fall_fantasy_fashion_show" | "swim_paradise_show";
  title: string;
  description: string;
  venue: string;
  capacity: number;
  start_time: string;
  end_time: string;
  registration_deadline: string;
  theme: string;
  meta_description: string | null;
  meta_keywords: string[] | null;
  created_at: string | null;
  // Add JSON column types
  venue_features: string | null;
  event_highlights: string | null;
  schedule: string | null;
  // Related tables
  fashion_images: Array<{
    id: string;
    category: EventImage['category'];
    url: string;
    alt_text: string;
    metadata: Record<string, any>;
  }> | null;
  event_tickets: Array<{
    id: string;
    ticket_type: string;
    price: number;
    quantity_available: number;
    benefits: string[];
    early_bird_deadline?: string;
    early_bird_price?: number;
    group_discount_threshold?: number;
    group_discount_percentage?: number;
  }> | null;
  event_sponsors: Array<{
    id: string;
    sponsor_id: string;
    sponsorship_tier: string;
    is_featured: boolean;
    ad_placement?: string[];
    display_priority?: number;
    sponsor?: {
      id: string;
      company_name: string;
      description: string;
      logo_url: string;
      sponsorship_level: string;
      marketing_materials: Record<string, any>;
    };
  }> | null;
}

// Error Fallback Component
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="text-center py-16">
      <h2 className="text-xl font-semibold text-red-500 mb-4">Something went wrong</h2>
      <p className="text-gray-400 mb-4">{error.message}</p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}

// Components
const HeroSection = ({ event }: { event: EventDetails }) => {
  const heroImage = event.images.find(img => img.category === 'event_hero')?.url;
  
  return (
    <section className="relative min-h-[80vh] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: heroImage ? `url(${heroImage})` : 'none' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
      </div>
      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {event.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            {event.description}
          </p>
          <div className="flex flex-wrap gap-6 text-gray-200 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{format(new Date(event.start_time), 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{format(new Date(event.start_time), 'h:mm a')}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{event.venue}</span>
            </div>
            {event.capacity > 0 && (
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{event.capacity} attendees</span>
              </div>
            )}
          </div>
          <Button size="lg" className="bg-fashion-pink hover:bg-fashion-pink/90">
            Get Tickets
          </Button>
        </div>
      </div>
    </section>
  );
};

const MainContentGrid = ({ event }: { event: EventDetails }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Column (70%) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Event Overview */}
            <div className="prose prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-fashion-pink">Event Overview</h2>
              <div className="mt-8 space-y-6">
                {event.event_highlights.key_attractions.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-fashion-pink shrink-0 mt-1" />
                    <p className="text-gray-200">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Collections Grid */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-fashion-pink">Featured Collections</h2>
              <div className="
                grid gap-6
                grid-cols-1
                md:grid-cols-2 md:gap-5 md:mx-8
                lg:grid-cols-3 lg:gap-6 lg:mx-10
              ">
                {event.images
                  .filter(img => img.category === 'collection')
                  .map((image, index) => (
                    <CollectionCard
                      key={image.id}
                      imageUrl={image.url}
                      designerName={image.metadata.designer_name || 'Designer'}
                      collectionTitle={image.alt_text}
                      onViewDetails={() => {/* TODO: Implement view details */}}
                    />
                  ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-fashion-pink">Event Features</h2>
              <div className="
                grid gap-6
                grid-cols-1
                md:grid-cols-2 md:gap-5
                lg:grid-cols-3 lg:gap-6
              ">
                {event.venue_features.photography_zones?.map((zone, index) => (
                  <FeatureCard
                    key={index}
                    icon={Camera}
                    title={zone.name}
                    description={`Capacity: ${zone.capacity} photographers`}
                    link={{
                      text: 'Photography Guidelines',
                      href: '#guidelines'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column (30%) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <Card className="bg-black/20 border-white/10 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                  <nav className="space-y-2">
                    <a href="#overview" className="block text-gray-200 hover:text-fashion-pink">Event Overview</a>
                    <a href="#collections" className="block text-gray-200 hover:text-fashion-pink">Collections</a>
                    <a href="#features" className="block text-gray-200 hover:text-fashion-pink">Features</a>
                    <a href="#tickets" className="block text-gray-200 hover:text-fashion-pink">Tickets</a>
                  </nav>
                </div>
              </Card>

              {/* Sticky Ad Space */}
              <div className="bg-gradient-to-r from-fashion-pink to-purple-600 p-6 rounded-lg text-white">
                <h3 className="text-xl font-bold mb-4">VIP Access</h3>
                <p className="mb-6">Get exclusive backstage access and meet our featured designers!</p>
                <Button variant="secondary" className="w-full">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VenueSection = ({ event }: { event: EventDetails }) => {
  return (
    <section className="py-16 bg-black/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-fashion-pink mb-12">Venue & Facilities</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Venue Map */}
          <div className="rounded-lg overflow-hidden h-[400px] bg-black/40">
            {/* Map integration will go here */}
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Interactive Venue Map Coming Soon
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-8">
            {event.venue_features.pool_specs && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Pool Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/20 p-4 rounded-lg">
                    <p className="text-sm text-gray-400">Dimensions</p>
                    <p className="text-lg text-white">{event.venue_features.pool_specs.dimensions}</p>
                  </div>
                  <div className="bg-black/20 p-4 rounded-lg">
                    <p className="text-sm text-gray-400">Depth</p>
                    <p className="text-lg text-white">{event.venue_features.pool_specs.depth}</p>
                  </div>
                  <div className="bg-black/20 p-4 rounded-lg">
                    <p className="text-sm text-gray-400">Temperature</p>
                    <p className="text-lg text-white">{event.venue_features.pool_specs.temperature}</p>
                  </div>
                </div>
              </div>
            )}

            {event.venue_features.changing_facilities && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Changing Facilities</h3>
                <div className="bg-black/20 p-6 rounded-lg">
                  <p className="text-gray-400 mb-4">
                    Capacity: {event.venue_features.changing_facilities.capacity} people
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {event.venue_features.changing_facilities.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const BottomSections = ({ event }: { event: EventDetails }) => {
  return (
    <>
      {/* Ticket Selection */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-[1280px]">
          <h2 className="text-3xl font-bold text-fashion-pink mb-12">Choose Your Experience</h2>
          <div className="
            grid gap-8
            grid-cols-1
            md:grid-cols-2 md:gap-6 md:mx-8
            lg:grid-cols-3 lg:gap-8 lg:mx-10
          ">
            {event.tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                type={ticket.ticket_type}
                price={ticket.price}
                features={[
                  `Access to ${ticket.ticket_type} areas`,
                  'Professional photography allowed',
                  'Complimentary refreshments'
                ]}
                benefits={ticket.benefits}
                isEarlyBird={!!ticket.early_bird_deadline && new Date(ticket.early_bird_deadline) > new Date()}
                earlyBirdPrice={ticket.early_bird_price}
                earlyBirdDeadline={ticket.early_bird_deadline}
                groupDiscount={
                  ticket.group_discount_threshold && ticket.group_discount_percentage
                    ? {
                        threshold: ticket.group_discount_threshold,
                        percentage: ticket.group_discount_percentage
                      }
                    : undefined
                }
                onBook={() => {/* TODO: Implement booking */}}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Gallery */}
      {event.sponsors.length > 0 && (
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4 max-w-[1280px]">
            <h2 className="text-3xl font-bold text-center text-fashion-pink mb-12">Our Sponsors</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {event.sponsors
                .sort((a, b) => a.display_priority - b.display_priority)
                .map((eventSponsor) => (
                  <div
                    key={eventSponsor.id}
                    className="bg-black/20 p-4 rounded-xl border border-white/10 flex items-center justify-center"
                  >
                    {eventSponsor.sponsor?.logo_url && (
                      <img
                        src={eventSponsor.sponsor.logo_url}
                        alt={eventSponsor.sponsor.company_name || 'Sponsor logo'}
                        className="max-h-16 object-contain"
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-black/40 to-black/20">
        <div className="container mx-auto px-4 text-center max-w-[1280px]">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Join the Experience?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Don't miss out on this exclusive swimwear event. Book your tickets now and be part of fashion history.
          </p>
          <Button size="lg" className="bg-fashion-pink hover:bg-fashion-pink/90">
            Get Your Tickets Now
          </Button>
        </div>
      </section>
    </>
  );
};

export default function EventDetailsPage() {
  const { eventId: rawEventId } = useParams<{ eventId: string }>();
  const [selectedImage, setSelectedImage] = useState<EventImage | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Clean up the event ID by removing any trailing periods
  const eventId = rawEventId?.replace(/\.$/, '');

  const { data: event, isLoading, error } = useQuery<EventDetails>({
    queryKey: ['event', eventId],
    queryFn: async () => {
      if (!eventId) throw new Error('Event ID is required');

      try {
        console.log('Fetching event data for ID:', eventId);

      const { data: eventData, error: eventError } = await supabase
        .from('fashion_events')
        .select(`
          *,
          fashion_images (
            id,
            category,
            url,
            alt_text,
            metadata
          ),
          event_tickets (
            id,
            ticket_type,
            price,
            quantity_available,
            benefits,
            early_bird_deadline,
            early_bird_price,
            group_discount_threshold,
            group_discount_percentage
          ),
          event_sponsors (
            id,
            sponsor_id,
            sponsorship_tier,
            is_featured,
              ad_placement,
              display_priority,
              sponsor:sponsor_profiles(
                id,
                company_name,
                description,
                logo_url,
                sponsorship_level,
                marketing_materials
              )
          )
        `)
        .eq('id', eventId)
        .single();

        if (eventError) {
          console.error('Supabase error:', eventError);
          throw new Error(`Failed to fetch event: ${eventError.message}`);
        }
        
        if (!eventData) {
          console.error('No event data found for ID:', eventId);
          throw new Error('Event not found');
        }

        console.log('Raw event data:', eventData);

        // Cast to unknown first, then to RawEventData to satisfy TypeScript
        const rawEvent = (eventData as unknown) as RawEventData;

        // Update JSON parsing to handle both string and object inputs
        const parseJSON = <T,>(input: string | object | null, defaultValue: T): T => {
          if (!input) {
            console.log('Empty input, using default value');
            return defaultValue;
          }
          try {
            if (typeof input === 'string') {
              return JSON.parse(input) as T;
            }
            return input as T;
          } catch (e) {
            console.error('JSON parse error:', e);
            return defaultValue;
          }
        };

        // Parse JSON fields
        const parsedVenueFeatures = parseJSON(rawEvent.venue_features, {
          pool_specs: {
            dimensions: '',
            depth: '',
            temperature: ''
          },
          changing_facilities: {
            capacity: 0,
            amenities: []
          },
          photography_zones: []
        });
        
        const parsedEventHighlights = parseJSON(rawEvent.event_highlights, {
          key_attractions: [],
          special_guests: [],
          featured_designers: []
        });
        
        const parsedSchedule = parseJSON(rawEvent.schedule, []);

        // Transform the data
        const transformedEvent: EventDetails = {
          id: rawEvent.id,
          name: rawEvent.name,
          title: rawEvent.title,
          description: rawEvent.description,
          venue: rawEvent.venue,
          capacity: rawEvent.capacity,
          start_time: rawEvent.start_time,
          end_time: rawEvent.end_time,
          registration_deadline: rawEvent.registration_deadline,
          theme: rawEvent.theme,
          meta_description: rawEvent.meta_description || '',
          meta_keywords: rawEvent.meta_keywords || [],
          venue_features: parsedVenueFeatures,
          event_highlights: parsedEventHighlights,
          schedule: parsedSchedule,
          images: (rawEvent.fashion_images || []).map((img) => ({
          id: img.id,
            event_id: rawEvent.id,
          category: img.category,
          url: img.url,
          alt_text: img.alt_text,
          metadata: img.metadata
        })),
          tickets: (rawEvent.event_tickets || []).map((ticket) => ({
          ...ticket,
            event_id: rawEvent.id,
            benefits: Array.isArray(ticket.benefits) ? ticket.benefits : []
        })),
          sponsors: (rawEvent.event_sponsors || []).map((sponsor) => ({
          id: sponsor.id,
            event_id: rawEvent.id,
          sponsor_id: sponsor.sponsor_id,
          sponsorship_tier: sponsor.sponsorship_tier,
          is_featured: sponsor.is_featured,
          ad_placement: sponsor.ad_placement || [],
          display_priority: sponsor.display_priority || 0,
          sponsor: sponsor.sponsor || {
            id: '',
            company_name: '',
            description: '',
            logo_url: '',
            sponsorship_level: '',
            marketing_materials: {}
          }
        }))
      };

      return transformedEvent;
      } catch (err) {
        console.error('Error in event transformation:', err);
        throw err;
      }
    }
  });

  if (isLoading) {
    return (
      <PageLayout>
        <div className="space-y-8">
          <Skeleton className="h-[80vh] w-full" />
          <div className="container mx-auto px-4">
            <Skeleton className="h-12 w-3/4 max-w-2xl mb-4" />
            <Skeleton className="h-6 w-full max-w-3xl" />
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error || !event) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-red-500">
            {error ? 'Error loading event' : 'Event not found'}
          </h1>
          <p className="mt-4 text-gray-400">
            {error ? error.message : "The event you're looking for doesn't exist or has been removed."}
          </p>
          <Button className="mt-8" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </PageLayout>
    );
  }

  const heroImage = event.images.find(img => img.category === 'event_hero')?.url;
  const galleryImages = event.images.filter(img => img.category === 'event_gallery') || [];
  const designerImage = event.images.find(img => img.category === 'designer_profile')?.url;

  const handleTicketPurchase = (ticket: TicketTier) => {
    // TODO: Implement ticket purchase flow
    console.log('Purchasing ticket:', ticket);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
    <PageLayout>
        <HeroSection event={event} />
        <MainContentGrid event={event} />
        <VenueSection event={event} />
        <BottomSections event={event} />
    </PageLayout>
    </ErrorBoundary>
  );
} 