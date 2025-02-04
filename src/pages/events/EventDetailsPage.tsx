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

export default function EventDetailsPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const [selectedImage, setSelectedImage] = useState<EventImage | null>(null);
  const shouldReduceMotion = useReducedMotion();

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
          <Skeleton className="h-[60vh] w-full" />
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
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: heroImage ? `url(${heroImage})` : 'none' }}
          >
            <div className="absolute inset-0 bg-black/80" />
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

        {/* Main Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="bg-black/20 border border-white/10">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="tickets">Tickets</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-12">
                {event.event_highlights.key_attractions.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-3xl font-bold text-fashion-pink mb-6">Event Highlights</h2>
                      <ul className="space-y-4">
                        {event.event_highlights.key_attractions.map((highlight, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3"
                          >
                            <Star className="w-6 h-6 text-fashion-pink shrink-0 mt-1" />
                            <span className="text-gray-200">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {designerImage && (
                      <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                        <img
                          src={designerImage}
                          alt="Fashion Designer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Venue Features */}
                {(event.venue_features?.pool_specs || event.venue_features?.changing_facilities) && (
                  <div className="bg-black/20 rounded-xl p-8 border border-white/10">
                    <h2 className="text-3xl font-bold text-fashion-pink mb-6">Venue Features</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {event.venue_features.pool_specs && (
                        <div className="space-y-2">
                          <h3 className="font-semibold text-xl">Pool Specifications</h3>
                          <ul className="space-y-2 text-gray-200">
                            <li>Dimensions: {event.venue_features.pool_specs.dimensions}</li>
                            <li>Depth: {event.venue_features.pool_specs.depth}</li>
                            <li>Temperature: {event.venue_features.pool_specs.temperature}</li>
                          </ul>
                        </div>
                      )}
                      {event.venue_features.changing_facilities && (
                        <div className="space-y-2">
                          <h3 className="font-semibold text-xl">Changing Facilities</h3>
                          <ul className="space-y-2 text-gray-200">
                            <li>Capacity: {event.venue_features.changing_facilities.capacity} people</li>
                            <li>
                              Amenities:
                              <div className="flex flex-wrap gap-2 mt-2">
                                {event.venue_features.changing_facilities.amenities.map((amenity, index) => (
                                  <Badge key={index} variant="outline">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Schedule Tab */}
              <TabsContent value="schedule" className="space-y-12">
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-3xl font-bold text-fashion-pink">Event Schedule</h2>
                  <p className="text-gray-400 text-lg">Join us for an exciting day filled with fashion, creativity, and entertainment.</p>
                </div>

                {/* Timeline */}
                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-fashion-pink/30">
                  {event.schedule.map((item, index) => (
                    <div
                      key={index}
                      className="relative pl-8"
                    >
                      <div className="absolute left-0 top-5 h-4 w-4 rounded-full bg-fashion-pink" />
                      <div className="bg-black/20 border border-white/10 rounded-lg p-6 space-y-4">
                        <div className="flex flex-wrap items-center gap-4 text-gray-300">
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-fashion-pink" />
                            <span className="font-semibold">{item.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-fashion-pink" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                          <p className="text-gray-400">{item.description}</p>
                        </div>

                        {item.speakers && item.speakers.length > 0 && (
                          <div className="pt-2">
                            <div className="text-sm text-gray-400 mb-2">Featured Speakers:</div>
                            <div className="flex flex-wrap gap-2">
                              {item.speakers.map((speaker, idx) => (
                                <Badge key={idx} variant="secondary" className="bg-fashion-pink/10 text-fashion-pink">
                                  {speaker}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Tickets Tab */}
              <TabsContent value="tickets" className="space-y-12">
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-3xl font-bold text-fashion-pink">Available Tickets</h2>
                  <p className="text-gray-400 text-lg">Select the perfect ticket package for your fashion event experience.</p>
                </div>

                {/* Early Bird Section */}
                {event.tickets.some(ticket => ticket.early_bird_deadline && new Date(ticket.early_bird_deadline) > new Date()) && (
                  <div className="bg-black/20 border border-fashion-pink rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Clock className="w-6 h-6 text-fashion-pink" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Early Bird Pricing Available</h3>
                        <p className="text-gray-400">Book early to secure the best prices!</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Ticket Tiers */}
                <div className="space-y-6">
                  {event.tickets.map((ticket, index) => (
                    <div
                      key={ticket.id}
                      className="relative pl-8"
                    >
                      <div className="absolute left-0 top-5 h-4 w-4 rounded-full bg-fashion-pink" />
                      <div className="bg-black/20 border border-white/10 rounded-lg p-6 space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm text-gray-400 mb-3">What's Included:</h4>
                            <ul className="space-y-2">
                              {ticket.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-gray-300">
                                  <Star className="w-4 h-4 text-fashion-pink" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="text-3xl font-bold text-fashion-pink">
                            ${ticket.early_bird_deadline && new Date(ticket.early_bird_deadline) > new Date()
                              ? ticket.early_bird_price
                              : ticket.price}
                          </div>
                        </div>

                        {/* Group Discounts */}
                        {ticket.group_discount_threshold && ticket.group_discount_percentage && (
                          <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-fashion-pink mb-2">Group Discount Available</h4>
                            <p className="text-sm text-gray-400">
                              Book {ticket.group_discount_threshold}+ tickets together and save {ticket.group_discount_percentage}%
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="w-full space-y-4">
                        {ticket.quantity_available > 0 ? (
                          <>
                            <div className="text-sm text-gray-400 text-center">
                              {ticket.quantity_available} tickets remaining
                            </div>
                            <Button 
                              className="w-full bg-fashion-pink hover:bg-fashion-pink/90"
                              onClick={() => handleTicketPurchase(ticket)}
                            >
                              Purchase Ticket
                            </Button>
                          </>
                        ) : (
                          <Button 
                            className="w-full"
                            variant="outline"
                            disabled
                          >
                            Sold Out
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Information */}
                <div className="bg-black/20 border border-white/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Important Information</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-fashion-pink shrink-0 mt-1" />
                      <span>All tickets include access to the main event and general seating areas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-fashion-pink shrink-0 mt-1" />
                      <span>Registration deadline: {format(new Date(event.registration_deadline), 'MMMM d, yyyy')}</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              {/* Gallery Tab */}
              <TabsContent value="gallery" className="space-y-12">
                <h2 className="text-3xl font-bold text-fashion-pink mb-6">Event Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryImages.map((image, index) => (
                    <div
                      key={image.id}
                      className="relative group cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="aspect-square overflow-hidden rounded-lg">
                        <img
                          src={image.url}
                          alt={image.alt_text}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Image Preview Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl bg-black/90 border-white/10">
            <DialogHeader>
              <DialogTitle>{selectedImage?.alt_text}</DialogTitle>
            </DialogHeader>
            {selectedImage && (
              <div className="relative aspect-video">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt_text}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Sponsors Section */}
        {event.sponsors.length > 0 && (
          <section className="py-16 bg-black/20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-fashion-pink mb-12">Our Sponsors</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {event.sponsors
                  .sort((a, b) => a.display_priority - b.display_priority)
                  .map((eventSponsor, index) => (
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
      </PageLayout>
    </ErrorBoundary>
  );
} 