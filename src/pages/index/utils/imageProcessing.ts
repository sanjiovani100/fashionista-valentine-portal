import type { FashionImage } from "@/types/event.types";
import type { EventContent } from "@/types/event.types";
import type { ProcessedImage } from './imageTypes';
import { cloudinaryConfig } from '@/components/cloudinary/config';

export const findHighlightImage = (
  highlight: Partial<EventContent>, 
  images: FashionImage[],
  usedImageIds: Set<string>
): FashionImage | null => {
  console.group(`[Image Selection] Finding image for highlight: ${highlight.title}`);
  
  try {
    // First try to find a hero image that hasn't been used
    const heroImage = images.find(img => 
      img.category === 'event_hero' && !usedImageIds.has(img.id)
    );
    
    if (heroImage) {
      console.log('Found unused hero image:', heroImage);
      usedImageIds.add(heroImage.id);
      return heroImage;
    }

    // Then try to find an unused gallery image
    const galleryImage = images.find(img => 
      img.category === 'event_gallery' && !usedImageIds.has(img.id)
    );

    if (galleryImage) {
      console.log('Found unused gallery image:', galleryImage);
      usedImageIds.add(galleryImage.id);
      return galleryImage;
    }

    console.warn('No suitable image found');
    return null;
  } catch (error) {
    console.error('[Image Selection] Error:', error);
    return null;
  } finally {
    console.groupEnd();
  }
};

export const constructImageUrl = (imageData: FashionImage | null): ProcessedImage => {
  console.group('[URL Construction]');
  
  if (!imageData) {
    console.log('No image data, using default placeholder');
    console.groupEnd();
    return {
      url: cloudinaryConfig.defaults.placeholders.highlight,
      alt: 'Default event image'
    };
  }

  try {
    const url = `https://res.cloudinary.com/${cloudinaryConfig.cloud.cloudName}/image/upload/${imageData.url}`;
    console.log('Constructed URL:', url);
    
    return {
      url,
      alt: imageData.alt_text || 'Event image'
    };
  } catch (error) {
    console.error('[URL Construction] Error:', error);
    return {
      url: cloudinaryConfig.defaults.placeholders.highlight,
      alt: 'Default event image'
    };
  } finally {
    console.groupEnd();
  }
};


