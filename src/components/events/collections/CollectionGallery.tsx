import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { EventImage } from '@/types/event';

interface CollectionGalleryProps {
  images: EventImage[];
}

export const CollectionGallery = ({ images }: CollectionGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<EventImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setSelectedImage(images[currentIndex > 0 ? currentIndex - 1 : images.length - 1]);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    setSelectedImage(images[currentIndex < images.length - 1 ? currentIndex + 1 : 0]);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group cursor-pointer"
            onClick={() => {
              setSelectedImage(image);
              setCurrentIndex(index);
            }}
          >
            <div
              className="aspect-[3/4] rounded-lg overflow-hidden"
              style={{
                backgroundImage: `url(${image.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="outline" className="text-white border-white hover:bg-white/20">
                    View
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-black/95 border-white/10">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 text-white/70 hover:text-white z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center justify-center min-h-[60vh]">
              <button
                onClick={handlePrevious}
                className="absolute left-4 text-white/70 hover:text-white"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage?.id}
                  src={selectedImage?.url}
                  alt={selectedImage?.alt_text || ''}
                  className="max-h-[60vh] object-contain"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

              <button
                onClick={handleNext}
                className="absolute right-4 text-white/70 hover:text-white"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            {selectedImage && (
              <div className="mt-4 text-center">
                <h4 className="text-lg font-semibold text-white">
                  {selectedImage.alt_text}
                </h4>
                {selectedImage.metadata.designer && (
                  <p className="text-white/70">
                    By {selectedImage.metadata.designer}
                  </p>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}; 