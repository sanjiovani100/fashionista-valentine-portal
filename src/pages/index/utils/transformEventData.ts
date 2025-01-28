import type { FashionEvent } from "@/types/database";
import type { EventContent, FashionCollection } from "@/types/event.types";

export const transformEventData = (eventData: FashionEvent) => {
  // Transform highlights data
  const highlightImages = ['valentine_mxwzop', 'valentine-011_sgwnbj', 'valentine-013_axosyk'];
  const highlights = (eventData.event_content || [])
    .filter(content => content.content_type === 'highlight')
    .map((highlight, index) => ({
      ...highlight,
      image: highlightImages[index] || 'placeholder'
    }))
    .slice(0, 3);

  // Transform collections data
  const cloudinaryIds = ['valentine-012_nbzfkf', 'valentine-011_uebnxo', 'valentine-010_ktl7ko'];
  const collectionsWithImages = (eventData.fashion_collections || [])
    .map((collection, index) => ({
      ...collection,
      image: cloudinaryIds[index]
    }))
    .slice(0, 3);

  return {
    highlights,
    collectionsWithImages,
    heroImage: eventData.fashion_images?.find(img => img.category === 'event_hero')?.url || 'hero-red-bg_spclrx',
  };
};