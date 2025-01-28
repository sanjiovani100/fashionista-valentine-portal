import React from 'react';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { CloudinaryImage as CloudinaryImageType } from '@cloudinary/url-gen';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { CloudinaryImageError } from './CloudinaryImageError';
import { useCloudinaryImage } from '../hooks/useCloudinaryImage';
import { ImageErrorBoundary } from './ImageErrorBoundary';
import type { CloudinaryImageProps } from '../types/cloudinary.types';

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  auto: 'aspect-auto'
} as const;

// Default fallback image from Supabase storage
const FALLBACK_IMAGE = "https://dssddsgypklubzkshkxo.supabase.co/storage/v1/object/public/fashion_images/placeholder.jpg";

export const OptimizedImage = ({
  publicId,
  alt,
  width,
  height,
  className,
  aspectRatio = 'auto',
  priority = false
}: CloudinaryImageProps) => {
  const { isLoading, hasError, imageUrl } = useCloudinaryImage(publicId, width, height);
  const isFullUrl = publicId.startsWith('http');

  const handleLoad = () => {
    if (window.performance && window.performance.getEntriesByName) {
      const imagePerf = performance.getEntriesByName(imageUrl)[0];
      if (imagePerf) {
        console.log(`Image loaded in ${imagePerf.duration}ms`, {
          publicId,
          url: imageUrl
        });
      }
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load image: ${publicId}`);
    if (e.currentTarget.src !== FALLBACK_IMAGE) {
      e.currentTarget.src = FALLBACK_IMAGE;
    }
  };

  return (
    <ImageErrorBoundary>
      <div className={cn('relative', aspectRatioClasses[aspectRatio], className)}>
        {isLoading && (
          <Skeleton className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        {hasError && <CloudinaryImageError />}
        
        {imageUrl && (
          isFullUrl ? (
            <img 
              src={imageUrl}
              alt={alt}
              loading={priority ? "eager" : "lazy"}
              className={cn(
                'w-full h-full object-cover',
                isLoading && 'opacity-0',
                hasError && 'opacity-0'
              )}
              onLoad={handleLoad}
              onError={handleError}
            />
          ) : (
            <AdvancedImage
              cldImg={new CloudinaryImageType(publicId, { 
                cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME 
              })}
              plugins={[
                lazyload({ rootMargin: '10px 20px 10px 30px', threshold: 0.05 }),
                placeholder({ mode: 'blur' })
              ]}
              onLoad={handleLoad}
              onError={() => {
                console.error(`Failed to load image: ${publicId}`);
              }}
              className={cn(
                'w-full h-full object-cover',
                isLoading && 'opacity-0',
                hasError && 'opacity-0'
              )}
            />
          )
        )}
      </div>
    </ImageErrorBoundary>
  );
};