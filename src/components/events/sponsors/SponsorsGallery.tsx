import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Grid, GridItem } from '@/components/layout/Grid';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Globe, ExternalLink, Star, Award } from 'lucide-react';
import type { EventDetails, EventSponsor } from '@/types/event';

interface SponsorsGalleryProps {
  event: EventDetails;
}

export const SponsorsGallery = ({ event }: SponsorsGalleryProps) => {
  const [selectedSponsor, setSelectedSponsor] = useState<EventSponsor | null>(null);
  const [showSponsorModal, setShowSponsorModal] = useState(false);

  // Group sponsors by tier
  const sponsorsByTier = event.sponsors.reduce((acc, sponsor) => {
    const tier = sponsor.sponsorship_tier;
    if (!acc[tier]) {
      acc[tier] = [];
    }
    acc[tier].push(sponsor);
    return acc;
  }, {} as Record<string, EventSponsor[]>);

  // Sort tiers by importance
  const tierOrder = ['Platinum', 'Gold', 'Silver', 'Bronze'];
  const sortedTiers = Object.keys(sponsorsByTier).sort(
    (a, b) => tierOrder.indexOf(a) - tierOrder.indexOf(b)
  );

  // Get sponsor tier color
  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'platinum':
        return 'bg-gradient-to-r from-gray-100 to-gray-300';
      case 'gold':
        return 'bg-gradient-to-r from-yellow-300 to-yellow-500';
      case 'silver':
        return 'bg-gradient-to-r from-gray-300 to-gray-400';
      case 'bronze':
        return 'bg-gradient-to-r from-amber-600 to-amber-800';
      default:
        return 'bg-gradient-to-r from-gray-600 to-gray-700';
    }
  };

  return (
    <Section
      variant="alternate"
      spacing="wide"
      className="bg-gradient-to-b from-black/40 to-black/20"
    >
      <div className="space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-fashion-pink font-montserrat">
            Our Esteemed Sponsors
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter">
            Meet the brands that make this event possible and discover exclusive offers
          </p>
        </div>

        {/* Featured Sponsors */}
        {event.sponsors.some(s => s.is_featured) && (
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-white">Featured Partners</h3>
            <Grid columns={{ mobile: 1, tablet: 2, desktop: 2 }} gap={{ desktop: 8 }}>
              {event.sponsors
                .filter(sponsor => sponsor.is_featured)
                .sort((a, b) => a.display_priority - b.display_priority)
                .map(sponsor => (
                  <GridItem key={sponsor.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="bg-black/20 border-white/10 overflow-hidden">
                        <div className="relative aspect-[21/9] bg-black/40">
                          <img
                            src={sponsor.sponsor.logo_url}
                            alt={sponsor.sponsor.company_name}
                            className="absolute inset-0 w-full h-full object-contain p-8"
                          />
                          <div className="absolute top-4 right-4">
                            <Badge 
                              className={`${getTierColor(sponsor.sponsorship_tier)} text-white`}
                            >
                              {sponsor.sponsorship_tier} Partner
                            </Badge>
                          </div>
                        </div>
                        <div className="p-6 space-y-4">
                          <h4 className="text-xl font-bold text-white">
                            {sponsor.sponsor.company_name}
                          </h4>
                          <p className="text-white/70 line-clamp-2">
                            {sponsor.sponsor.description}
                          </p>
                          <Button
                            variant="outline"
                            className="w-full border-fashion-pink text-fashion-pink hover:bg-fashion-pink hover:text-white"
                            onClick={() => {
                              setSelectedSponsor(sponsor);
                              setShowSponsorModal(true);
                            }}
                          >
                            Learn More
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  </GridItem>
                ))}
            </Grid>
          </div>
        )}

        {/* Sponsors by Tier */}
        {sortedTiers.map(tier => (
          <div key={tier} className="space-y-8">
            <div className="flex items-center gap-3">
              <Award className={`w-6 h-6 ${
                tier.toLowerCase() === 'platinum' ? 'text-gray-300' :
                tier.toLowerCase() === 'gold' ? 'text-yellow-400' :
                tier.toLowerCase() === 'silver' ? 'text-gray-400' :
                'text-amber-700'
              }`} />
              <h3 className="text-2xl font-semibold text-white">{tier} Sponsors</h3>
            </div>
            <Grid 
              columns={{ 
                mobile: 2, 
                tablet: tier === 'Platinum' ? 2 : 3, 
                desktop: tier === 'Platinum' ? 3 : 4 
              }} 
              gap={{ desktop: 6 }}
            >
              {sponsorsByTier[tier]
                .sort((a, b) => a.display_priority - b.display_priority)
                .map(sponsor => (
                  <GridItem key={sponsor.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedSponsor(sponsor);
                        setShowSponsorModal(true);
                      }}
                    >
                      <Card className="bg-black/20 border-white/10 p-6 space-y-4">
                        <div className="aspect-square relative bg-black/40 rounded-lg">
                          <img
                            src={sponsor.sponsor.logo_url}
                            alt={sponsor.sponsor.company_name}
                            className="absolute inset-0 w-full h-full object-contain p-4"
                          />
                        </div>
                        <div className="text-center">
                          <h4 className="text-lg font-semibold text-white">
                            {sponsor.sponsor.company_name}
                          </h4>
                        </div>
                      </Card>
                    </motion.div>
                  </GridItem>
                ))}
            </Grid>
          </div>
        ))}

        {/* Sponsor Modal */}
        <Dialog open={showSponsorModal} onOpenChange={setShowSponsorModal}>
          <DialogContent className="bg-black/95 border-white/10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                {selectedSponsor?.sponsor.company_name}
              </DialogTitle>
            </DialogHeader>
            
            {selectedSponsor && (
              <div className="space-y-6">
                {/* Logo */}
                <div className="aspect-[21/9] relative bg-black/40 rounded-lg">
                  <img
                    src={selectedSponsor.sponsor.logo_url}
                    alt={selectedSponsor.sponsor.company_name}
                    className="absolute inset-0 w-full h-full object-contain p-8"
                  />
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <p className="text-white/70">
                    {selectedSponsor.sponsor.description}
                  </p>
                  
                  {/* Marketing Materials */}
                  {selectedSponsor.sponsor.marketing_materials && (
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-white">Special Offers</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(selectedSponsor.sponsor.marketing_materials).map(([key, value]) => (
                          <Card key={key} className="bg-black/40 border-white/10 p-4">
                            <h5 className="font-medium text-white">{key}</h5>
                            <p className="text-sm text-white/70">{value}</p>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      className="flex-1 bg-fashion-pink hover:bg-fashion-pink/90"
                      onClick={() => window.open(selectedSponsor.sponsor.marketing_materials?.website, '_blank')}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Visit Website
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-fashion-pink text-fashion-pink hover:bg-fashion-pink hover:text-white"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      View Offers
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Section>
  );
}; 