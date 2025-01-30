export type AspectRatio = 'square' | 'video' | 'portrait' | 'landscape' | 'auto';

export interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: AspectRatio;
  priority?: boolean;
  onLoadingComplete?: () => void;
  onError?: () => void;
}

export interface ImageLoadingState {
  isLoading: boolean;
  hasError: boolean;
  imageUrl: string;
}