import type { EventContent, FashionImage } from '@/types/event.types';

export const findHighlightImage = (
  highlight: Partial<EventContent>, 
  images: FashionImage[]
): FashionImage | null => {
  console.log('[Image Selection] Finding image for highlight:', highlight.title);
  
  const contentImage = images.find(img => img.category === 'event_hero');
  if (contentImage) {
    console.log('[Image Selection] Found hero image:', contentImage);
    return contentImage;
  }

  const galleryImage = images.find(img => img.category === 'event_gallery');
  if (galleryImage) {
    console.log('[Image Selection] Found gallery image:', galleryImage);
    return galleryImage;
  }

  console.warn('[Image Selection] No suitable image found');
  return null;
};