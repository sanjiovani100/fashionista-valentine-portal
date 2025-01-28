import React from 'react';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { CloudinaryImage as CloudinaryImageType } from '@cloudinary/url-gen';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { CloudinaryImageError } from './CloudinaryImageError';
import { useCloudinaryImage } from '../hooks/useCloudinaryImage';
import type { CloudinaryImageProps } from '../types/cloudinary.types';
import { cld } from '@/integrations/cloudinary/config';

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  auto: 'aspect-auto'
} as const;

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

  const handleLoad = () => {
    if (window.performance && window.performance.getEntriesByName) {
      const imagePerf = performance.getEntriesByName(imageUrl)[0];
      if (imagePerf) {
        console.log(`Image loaded in ${imagePerf.duration}ms`);
      }
    }
  };

  return (
    <div className={cn('relative', aspectRatioClasses[aspectRatio], className)}>
      {isLoading && (
        <Skeleton className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {hasError && <CloudinaryImageError />}
      
      {imageUrl && (
        <AdvancedImage
          cldImg={new CloudinaryImageType(publicId, { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME })}
          plugins={[
            lazyload({ rootMargin: '10px 20px 10px 30px', threshold: 0.05 }),
            placeholder({ mode: 'blur' })
          ]}
          onLoad={handleLoad}
          onError={() => console.error(`Failed to load image: ${publicId}`)}
          className={cn(
            'w-full h-full object-cover',
            isLoading && 'opacity-0',
            hasError && 'opacity-0'
          )}
        />
      )}
    </div>
  );
};