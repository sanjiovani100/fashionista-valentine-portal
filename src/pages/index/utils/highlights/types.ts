import type { EventContent, FashionCollection, FashionImage } from '@/types/event.types';

export interface TransformedHighlight extends EventContent {
  image: string;
  alt?: string;
  isLoading: boolean;
}

export interface TransformedCollection extends FashionCollection {
  image: string;
  isLoading: boolean;
}

export interface TransformedEventData {
  highlights: TransformedHighlight[];
  collectionsWithImages: TransformedCollection[];
  heroImage: string;
}