import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Grid, GridItem } from '@/components/layout/Grid';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Camera, Eye, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import type { EventDetails, EventImage, ImageCategory } from '@/types/event';

interface PhotoGalleryProps {
  event: EventDetails;
}

const CATEGORY_LABELS: Record<ImageCategory, string> = {
  event_hero: 'Hero Images',
  event_gallery: 'Event Gallery',
  backstage: 'Backstage',
  designer_profile: 'Designer Profiles',
  model_profile: 'Model Profiles',
  promotional: 'Promotional',
  press_kit: 'Press Kit',
  collection: 'Collections'
};

export const PhotoGallery = ({ event }: PhotoGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<ImageCategory>('event_gallery');
  const [selectedImage, setSelectedImage] = useState<EventImage | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Group images by category
  const imagesByCategory = useMemo(() => {
    const grouped = {} as Record<ImageCategory, EventImage[]>;
    event.images.forEach(image => {
      if (!grouped[image.category]) {
        grouped[image.category] = [];
      }
      grouped[image.category].push(image);
    });
    return grouped;
  }, [event.images]);

  // Get available categories
  const availableCategories = useMemo(() => {
    return Object.keys(imagesByCategory).filter(
      category => imagesByCategory[category as ImageCategory]?.length > 0
    ) as ImageCategory[];
  }, [imagesByCategory]);

  // Get current images
  const currentImages = imagesByCategory[selectedCategory] || [];

  // Handle lightbox navigation
  const handlePrevious = () => {
    if (!selectedImage) return;
    const currentIndex = currentImages.findIndex(img => img.id === selectedImage.id);
    const previousIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    setSelectedImage(currentImages[previousIndex]);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = currentImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % currentImages.length;
    setSelectedImage(currentImages[nextIndex]);
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
            Photo Gallery
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter">
            Explore our curated collection of event highlights and behind-the-scenes moments
          </p>
        </div>

        {/* Category Selection */}
        <Tabs
          value={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value as ImageCategory)}
          className="w-full"
        >
          <TabsList className="w-full justify-start bg-black/20 p-1 overflow-x-auto">
            {availableCategories.map(category => (
              <TabsTrigger
                key={category}
                value={category}
                className="flex items-center gap-2 data-[state=active]:bg-fashion-pink"
              >
                <Camera className="w-4 h-4" />
                {CATEGORY_LABELS[category]}
                <Badge variant="outline" className="ml-2">
                  {imagesByCategory[category].length}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={`${
                index % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <Card className="group relative overflow-hidden bg-black/20 border-white/10">
                <div className="aspect-[4/3] relative">
                  <img
                    src={image.url}
                    alt={image.alt_text}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                      <p className="text-white font-medium line-clamp-2">
                        {image.alt_text}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/10 hover:bg-white/20 border-white/20"
                          onClick={() => {
                            setSelectedImage(image);
                            setLightboxOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        {image.category === 'press_kit' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/10 hover:bg-white/20 border-white/20"
                            onClick={() => window.open(image.url, '_blank')}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {currentImages.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 mx-auto text-white/20" />
            <p className="mt-4 text-white/50">
              No images available in this category
            </p>
          </div>
        )}

        {/* Lightbox */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-7xl bg-black/95 border-white/10">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white/70 hover:text-white"
                onClick={() => setLightboxOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>

              <div className="flex items-center justify-center min-h-[60vh]">
                {selectedImage && (
                  <div className="relative">
                    <img
                      src={selectedImage.url}
                      alt={selectedImage.alt_text}
                      className="max-h-[80vh] object-contain"
                    />
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                      onClick={handlePrevious}
                    >
                      <ChevronLeft className="w-8 h-8" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                      onClick={handleNext}
                    >
                      <ChevronRight className="w-8 h-8" />
                    </Button>
                  </div>
                )}
              </div>

              {selectedImage && (
                <div className="mt-4 space-y-2">
                  <p className="text-lg font-medium text-white">
                    {selectedImage.alt_text}
                  </p>
                  {selectedImage.metadata && Object.keys(selectedImage.metadata).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(selectedImage.metadata).map(([key, value]) => (
                        <Badge key={key} variant="outline" className="text-white/70">
                          {key}: {value}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Section>
  );
}; 


