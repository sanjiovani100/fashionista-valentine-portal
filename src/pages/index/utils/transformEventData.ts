import { CLOUDINARY_CONFIG, getFirstValidMediaUrl, isValidCloudinaryUrl } from '@/integrations/cloudinary/config';
import type { FashionEvent } from "@/types/database";
import type { EventContent, FashionCollection } from "@/types/event.types";

interface ImageMetadata {
  page?: string;
  collection_id?: string;
  bucket_id?: string;
  file_path?: string;
  uploaded_at?: string;
}

export const transformEventData = (eventData: FashionEvent) => {
  console.log("Raw event data:", {
    contentCount: eventData.event_content?.length,
    content: eventData.event_content,
    images: eventData.fashion_images
  });

  // Transform highlights with proper image URL handling
  const highlights = (eventData.event_content || [])
    .filter(content => {
      console.log("Processing content item:", {
        type: content.content_type,
        title: content.title,
        mediaUrls: content.media_urls
      });
      return content.content_type === 'highlight';
    })
    .map((highlight): EventContent & { image: string } => {
      const imageUrl = getFirstValidMediaUrl(highlight.media_urls);
      
      console.log("Processing highlight:", {
        title: highlight.title,
        mediaUrls: highlight.media_urls,
        selectedUrl: imageUrl
      });

      return {
        ...highlight,
        event_id: highlight.event_id || '',
        media_urls: highlight.media_urls || [],
        publish_date: highlight.publish_date || new Date().toISOString(),
        engagement_metrics: highlight.engagement_metrics || {},
        image: imageUrl && isValidCloudinaryUrl(imageUrl) 
          ? imageUrl 
          : CLOUDINARY_CONFIG.defaultPlaceholder
      };
    })
    .slice(0, 3);

  console.log("Transformed highlights:", highlights);

  // Transform collections with proper image handling
  const collectionsWithImages = (eventData.fashion_collections || [])
    .map((collection): FashionCollection & { image: string } => {
      const collectionImage = eventData.fashion_images?.find(img => {
        const metadata = img.metadata as ImageMetadata | null;
        return metadata?.collection_id === collection.id;
      });

      console.log("Processing collection:", {
        name: collection.collection_name,
        hasImage: !!collectionImage,
        imageUrl: collectionImage?.url
      });

      return {
        ...collection,
        designer_id: collection.designer_id || '',
        event_id: collection.event_id || '',
        technical_requirements: collection.technical_requirements || '',
        sustainability_info: collection.sustainability_info || '',
        image: collectionImage && isValidCloudinaryUrl(collectionImage.url)
          ? collectionImage.url
          : CLOUDINARY_CONFIG.defaultPlaceholder
      };
    })
    .slice(0, 3);

  // Get hero image with updated selection logic and proper type casting
  const heroImage = eventData.fashion_images?.find(img => {
    const metadata = img.metadata as ImageMetadata | null;
    return img.category === 'promotional' && metadata?.page === 'home';
  })?.url || CLOUDINARY_CONFIG.defaultPlaceholder;

  console.log("Selected hero image:", heroImage);

  return {
    highlights,
    collectionsWithImages,
    heroImage,
  };
};