import { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { Grid, GridItem } from '@/components/layout/Grid';
import { CollectionGallery } from './CollectionGallery';
import { DesignerInfo } from './DesignerInfo';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { EventDetails, EventImage } from '@/types/event';

interface CollectionsShowcaseProps {
  event: EventDetails;
}

interface DesignerData {
  name: string;
  bio: string;
  image: string;
  collections: Array<{
    name: string;
    description: string;
    pieces: number;
  }>;
  social?: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}

export const CollectionsShowcase = ({ event }: CollectionsShowcaseProps) => {
  const [selectedDesigner, setSelectedDesigner] = useState<string | null>(
    event.event_highlights.featured_designers?.[0] || null
  );

  // Filter collection images for the current designer
  const getDesignerImages = (designerName: string): EventImage[] => {
    return event.images.filter(
      img => 
        img.category === 'collection' && 
        img.metadata.designer === designerName
    );
  };

  // Get designer data from metadata
  const getDesignerData = (designerName: string): DesignerData => {
    const designerImage = event.images.find(
      img => 
        img.category === 'designer_profile' && 
        img.metadata.designer === designerName
    );

    return {
      name: designerName,
      bio: designerImage?.metadata.bio || 'Designer information coming soon.',
      image: designerImage?.url || '',
      collections: [
        {
          name: 'Summer Collection 2024',
          description: 'Vibrant beachwear inspired by tropical paradise',
          pieces: 12
        },
        {
          name: 'Resort Wear',
          description: 'Elegant poolside fashion for the modern woman',
          pieces: 8
        }
      ],
      social: {
        instagram: designerImage?.metadata.instagram,
        twitter: designerImage?.metadata.twitter,
        website: designerImage?.metadata.website
      }
    };
  };

  return (
    <Section
      variant="highlight"
      spacing="wide"
      className="bg-gradient-to-b from-black/40 to-black/20"
    >
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-fashion-pink font-montserrat">
            Featured Collections
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter">
            Discover the latest swimwear collections from our featured designers
          </p>
        </div>

        {/* Designer Tabs */}
        {event.event_highlights.featured_designers && (
          <div className="flex justify-center">
            <Tabs
              value={selectedDesigner || undefined}
              onValueChange={setSelectedDesigner}
              className="w-full max-w-3xl"
            >
              <TabsList className="bg-black/20 p-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {event.event_highlights.featured_designers.map(designer => (
                  <TabsTrigger
                    key={designer}
                    value={designer}
                    className={`
                      capitalize
                      ${selectedDesigner === designer
                        ? 'bg-fashion-pink text-white'
                        : 'text-white/70 hover:text-white'
                      }
                    `}
                  >
                    {designer}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}

        {/* Designer Info and Collections */}
        {selectedDesigner && (
          <Grid columns={{ mobile: 1, tablet: 1, desktop: 1 }} gap={{ desktop: 8 }}>
            <GridItem>
              <DesignerInfo {...getDesignerData(selectedDesigner)} />
            </GridItem>

            <GridItem>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white">Collection Gallery</h3>
                <CollectionGallery images={getDesignerImages(selectedDesigner)} />
              </div>
            </GridItem>
          </Grid>
        )}
      </div>
    </Section>
  );
}; 


