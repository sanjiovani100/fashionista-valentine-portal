import type { FashionEvent } from "@/types/database";

export const transformEventData = (eventData: FashionEvent) => {
  // Transform highlights data
  const highlights = eventData.event_content
    ?.filter(content => content.content_type === 'highlight')
    .map((highlight, index) => ({
      ...highlight,
      image: highlight.media_urls?.[0] || 'placeholder'
    }))
    .slice(0, 3) || [];

  // Transform collections data
  const collectionsWithImages = eventData.fashion_collections
    ?.map((collection, index) => ({
      ...collection,
      image: eventData.fashion_images?.[index]?.url || 'placeholder'
    }))
    .slice(0, 3) || [];

  // Get hero image
  const heroImage = eventData.fashion_images?.find(img => 
    img.category === 'event_hero'
  )?.url || 'hero-red-bg_spclrx';

  return {
    highlights,
    collectionsWithImages,
    heroImage,
  };
};