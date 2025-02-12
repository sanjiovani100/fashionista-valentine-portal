import { Section } from '@/components/layout/Section';
import { Grid, GridItem } from '@/components/layout/Grid';
import { FeatureCard } from '@/components/cards/FeatureCard';
import { Star, Calendar, MapPin, Users, Camera, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import type { EventDetails } from '@/types/event';

interface EventOverviewProps {
  event: EventDetails;
}

export const EventOverview = ({ event }: EventOverviewProps) => {
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Section
      variant="alternate"
      spacing="normal"
      className="bg-gradient-to-b from-black/40 to-black/20"
    >
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-fashion-pink font-montserrat">
            Event Overview
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter">
            {event.description}
          </p>
        </div>

        {/* Key Attractions */}
        <motion.div
          variants={containerAnimation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h3 className="text-2xl font-semibold text-white">Key Attractions</h3>
          <Grid columns={{ mobile: 1, tablet: 2, desktop: 3 }} gap={{ desktop: 6 }}>
            {event.event_highlights.key_attractions.map((highlight, index) => (
              <motion.div key={index} variants={itemAnimation}>
                <FeatureCard
                  icon={Star}
                  title={highlight}
                  description="Experience the extraordinary"
                />
              </motion.div>
            ))}
          </Grid>
        </motion.div>

        {/* Event Details Grid */}
        <Grid columns={{ mobile: 1, tablet: 2, desktop: 4 }} gap={{ desktop: 6 }}>
          {/* Date & Time */}
          <GridItem>
            <div className="bg-black/20 rounded-lg p-6 space-y-3">
              <Calendar className="w-8 h-8 text-fashion-pink" />
              <h4 className="text-lg font-semibold text-white">Date & Time</h4>
              <p className="text-white/70">
                {new Date(event.start_time).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="text-white/70">
                {new Date(event.start_time).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit'
                })}
                {' - '}
                {new Date(event.end_time).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </GridItem>

          {/* Location */}
          <GridItem>
            <div className="bg-black/20 rounded-lg p-6 space-y-3">
              <MapPin className="w-8 h-8 text-fashion-pink" />
              <h4 className="text-lg font-semibold text-white">Venue</h4>
              <p className="text-white/70">{event.venue}</p>
            </div>
          </GridItem>

          {/* Capacity */}
          <GridItem>
            <div className="bg-black/20 rounded-lg p-6 space-y-3">
              <Users className="w-8 h-8 text-fashion-pink" />
              <h4 className="text-lg font-semibold text-white">Capacity</h4>
              <p className="text-white/70">{event.capacity} attendees</p>
            </div>
          </GridItem>

          {/* Theme */}
          <GridItem>
            <div className="bg-black/20 rounded-lg p-6 space-y-3">
              <Info className="w-8 h-8 text-fashion-pink" />
              <h4 className="text-lg font-semibold text-white">Theme</h4>
              <p className="text-white/70">{event.theme}</p>
            </div>
          </GridItem>
        </Grid>

        {/* Photography Zones */}
        {event.venue_features.photography_zones && (
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-white">Photography Zones</h3>
            <Grid columns={{ mobile: 1, tablet: 2, desktop: 3 }} gap={{ desktop: 6 }}>
              {event.venue_features.photography_zones.map((zone, index) => (
                <GridItem key={index}>
                  <FeatureCard
                    icon={Camera}
                    title={zone.name}
                    description={`Capacity: ${zone.capacity} photographers`}
                    link={{
                      text: 'Photography Guidelines',
                      href: '#guidelines'
                    }}
                  />
                </GridItem>
              ))}
            </Grid>
          </div>
        )}
      </div>
    </Section>
  );
}; 


