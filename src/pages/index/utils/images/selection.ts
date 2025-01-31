import type { EventContent, FashionImage } from '@/types/event.types';

export const findHighlightImage = (
  highlight: Partial<EventContent>, 
  images: FashionImage[],
  usedImages: Set<string>
): FashionImage | null => {
  console.log('[Image Selection] Finding image for highlight:', highlight.title);
  
  // Filter for unused valentine images
  const availableImages = images.filter(img => 
    img.url.includes('valentine') && 
    !usedImages.has(img.url)
  );

  if (availableImages.length > 0) {
    const selectedImage = availableImages[0];
    usedImages.add(selectedImage.url);
    console.log('[Image Selection] Selected new image:', selectedImage.url);
    return selectedImage;
  }

  // If all images used, reset and start over
  if (usedImages.size === images.length) {
    console.log('[Image Selection] Resetting used images tracking');
    usedImages.clear();
    // Try again with cleared tracking
    return findHighlightImage(highlight, images, usedImages);
  }

  // Fallback to any valentine image
  const fallbackImage = images.find(img => img.url.includes('valentine'));
  console.log('[Image Selection] Using fallback image:', fallbackImage?.url);
  return fallbackImage || null;
};