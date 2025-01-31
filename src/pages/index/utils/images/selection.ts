import type { FashionImage } from '@/types/event.types';
import type { EventContent } from '@/types/event.types';
import type { ImageSelectionCriteria } from './types';

export const findHighlightImage = (
  highlight: Partial<EventContent>, 
  images: FashionImage[]
): FashionImage | null => {
  console.log('[Image Selection] Finding image for highlight:', {
    title: highlight.title,
    availableImages: images.length
  });

  // First try content_id match
  const contentImage = images.find(img => img.category === 'event_hero');
  if (contentImage) {
    console.log('[Image Selection] Found hero image:', contentImage);
    return contentImage;
  }

  // Fallback to any gallery image
  const galleryImage = images.find(img => img.category === 'event_gallery');
  if (galleryImage) {
    console.log('[Image Selection] Found gallery image:', galleryImage);
    return galleryImage;
  }

  console.warn('[Image Selection] No suitable image found');
  return null;
};

export const getUniqueImages = (
  images: FashionImage[], 
  criteria: ImageSelectionCriteria,
  usedIds: Set<string> = new Set()
): FashionImage[] => {
  return images.filter(img => {
    const matches = img.category === criteria.category;
    const isUnused = !usedIds.has(img.id);
    return matches && isUnused;
  });
};