import type { EventContent, FashionImage } from '@/types/event.types';

export const findHighlightImage = (
  highlight: Partial<EventContent>, 
  images: FashionImage[],
  usedImageIds: Set<string>
): FashionImage | null => {
  console.log('[Image Selection] Finding image for highlight:', highlight.title);
  
  // Get list of available images excluding already used ones
  const availableImages = images.filter(img => !usedImageIds.has(img.id));
  
  // First try to find an unused hero image
  const heroImage = availableImages.find(img => img.category === 'event_hero');
  if (heroImage) {
    usedImageIds.add(heroImage.id);
    return heroImage;
  }
  
  // Then try gallery image if no hero image found
  const galleryImage = availableImages.find(img => img.category === 'event_gallery');
  if (galleryImage) {
    usedImageIds.add(galleryImage.id);
    return galleryImage;
  }
  
  return null;
};


