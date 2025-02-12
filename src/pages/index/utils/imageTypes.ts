import type { Json } from "@/types/database";

export interface ImageMetadata {
  cloudinary_id?: string;
  media_url?: string;
  content_id?: string;
  collection_id?: string;
  page?: string;
}

export interface ProcessedImage {
  url: string;
  alt: string;
}


