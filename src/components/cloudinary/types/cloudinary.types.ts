import { AspectRatio } from '@/types';

export interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: AspectRatio;
  priority?: boolean;
}

export interface ImageLoadingState {
  isLoading: boolean;
  hasError: boolean;
  imageUrl: string;
}