import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Grid, GridItem } from '@/components/layout/Grid';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shirt, 
  Camera, 
  MapPin, 
  Users, 
  Waves, 
  Thermometer,
  Droplet
} from 'lucide-react';
import type { EventDetails } from '@/types/event';
import type { LucideIcon } from 'lucide-react';

interface FeatureDetail {
  label: string;
  value: string;
  icon: LucideIcon;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  details: FeatureDetail[] | undefined;
}

interface Features {
  [key: string]: Feature;
}

interface VenueFeaturesProps {
  event: EventDetails;
}

export const VenueFeatures = ({ event }: VenueFeaturesProps) => {
  const [activeTab, setActiveTab] = useState('pool');

  const features: Features = {
    pool: {
      icon: Droplet,
      title: 'Pool Specifications',
      description: 'Professional-grade swimming pool for runway shows',
      details: event.venue_features.pool_specs ? [
        {
          label: 'Dimensions',
          value: event.venue_features.pool_specs.dimensions,
          icon: Waves
        },
        {
          label: 'Depth',
          value: event.venue_features.pool_specs.depth,
          icon: Droplet
        },
        {
          label: 'Temperature',
          value: event.venue_features.pool_specs.temperature,
          icon: Thermometer
        }
      ] : undefined
    },
    changing: {
      icon: Shirt,
      title: 'Changing Facilities',
      description: 'Professional changing rooms and makeup stations',
      details: event.venue_features.changing_facilities ? [
        {
          label: 'Capacity',
          value: `${event.venue_features.changing_facilities.capacity} people`,
          icon: Users
        },
        ...event.venue_features.changing_facilities.amenities.map(amenity => ({
          label: 'Amenity',
          value: amenity,
          icon: MapPin
        }))
      ] : undefined
    },
    photography: {
      icon: Camera,
      title: 'Photography Zones',
      description: 'Designated areas for professional photography',
      details: event.venue_features.photography_zones?.map(zone => ({
        label: zone.name,
        value: `Capacity: ${zone.capacity} photographers`,
        icon: Camera
      }))
    }
  };

  return (
    <Section
      variant="alternate"
      spacing="wide"
      className="bg-gradient-to-b from-black/40 to-black/20"
    >
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-fashion-pink font-montserrat">
            Venue Features
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter">
            Explore our world-class facilities designed for the perfect swimwear showcase
          </p>
        </div>

        {/* Interactive Map */}
        <div className="relative w-full aspect-[16/9] bg-black/40 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/60">Interactive Venue Map Coming Soon</p>
          </div>
          
          {/* Map Markers */}
          {Object.keys(features).map((feature, index) => {
            const FeatureIcon = features[feature].icon;
            return (
              <motion.div
                key={feature}
                className={[
                  'absolute w-8 h-8 rounded-full bg-fashion-pink cursor-pointer',
                  'flex items-center justify-center',
                  activeTab === feature ? 'ring-4 ring-fashion-pink ring-opacity-50' : ''
                ].filter(Boolean).join(' ')}
                style={{
                  top: `${30 + (index * 20)}%`,
                  left: `${20 + (index * 30)}%`
                }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setActiveTab(feature)}
              >
                <FeatureIcon className="w-4 h-4 text-white" />
              </motion.div>
            );
          })}
        </div>

        {/* Feature Details */}
        <div className="space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-black/20 p-1 grid grid-cols-3 gap-2">
              {Object.entries(features).map(([key, feature]) => {
                const FeatureIcon = feature.icon;
                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className={[
                      'capitalize',
                      activeTab === key
                        ? 'bg-fashion-pink text-white'
                        : 'text-white/70 hover:text-white'
                    ].join(' ')}
                  >
                    <FeatureIcon className="w-4 h-4 mr-2" />
                    {feature.title}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          {/* Feature Cards Grid */}
          <Grid columns={{ mobile: 1, tablet: 2, desktop: 3 }} gap={{ desktop: 6 }}>
            {features[activeTab]?.details?.map((detail, index) => {
              const DetailIcon = detail.icon;
              return (
                <GridItem key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-black/20 border-white/10 p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-fashion-pink/10">
                          <DetailIcon className="w-5 h-5 text-fashion-pink" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">{detail.label}</h4>
                          <p className="text-white/70">{detail.value}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </GridItem>
              );
            })}
          </Grid>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            variant="outline"
            className="bg-black/20 border-fashion-pink text-fashion-pink hover:bg-fashion-pink hover:text-white"
          >
            Download Venue Guide
          </Button>
        </div>
      </div>
    </Section>
  );
}; 


