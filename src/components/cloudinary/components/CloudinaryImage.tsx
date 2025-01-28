import React, { useState } from 'react';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { CloudinaryImage as CloudinaryImageType } from '@cloudinary/url-gen';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { CloudinaryImageError } from './CloudinaryImageError';
import { ImageErrorBoundary } from './ImageErrorBoundary';
import { useCloudinaryImage } from '../hooks/useCloudinaryImage';
import { CLOUDINARY_CONFIG } from '@/integrations/cloudinary/config';
import type { CloudinaryImageProps } from '../types/cloudinary.types';

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
  const [loadTime, setLoadTime] = useState<number>(0);

  console.log('[CloudinaryImage] Rendering image:', {
    publicId,
    imageUrl,
    isLoading,
    hasError,
    aspectRatio
  });

  const handleLoad = () => {
    setIsLoading(false);
    if (window.performance && window.performance.getEntriesByName) {
      const imagePerf = performance.getEntriesByName(imageUrl)[0] as PerformanceResourceTiming;
      if (imagePerf) {
        const loadTimeMs = imagePerf.duration;
        setLoadTime(loadTimeMs);
        console.log(`[Image Performance] Successfully loaded image:`, {
          url: imageUrl,
          loadTime: loadTimeMs,
          size: imagePerf.transferSize,
        });
      }
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('[Image Error] Failed to load image:', {
      type: e.type,
      url: imageUrl,
      publicId,
      timestamp: new Date().toISOString(),
      isCloudinaryConfigured: !!CLOUDINARY_CONFIG.cloudName,
      error: e
    });

    if (e.currentTarget.src !== CLOUDINARY_CONFIG.defaultPlaceholder) {
      e.currentTarget.src = CLOUDINARY_CONFIG.defaultPlaceholder;
    }
  };

  return (
    <ImageErrorBoundary>
      <div className={cn('relative', aspectRatioClasses[aspectRatio], className)}>
        {isLoading && (
          <Skeleton 
            className={cn(
              'absolute inset-0 bg-gray-200 animate-pulse',
              'transition-opacity duration-300'
            )} 
          />
        )}
        
        {hasError && <CloudinaryImageError />}
        
        {imageUrl && (
          publicId.startsWith('http') ? (
            <img 
              src={imageUrl}
              alt={alt}
              loading={priority ? "eager" : "lazy"}
              className={cn(
                'w-full h-full object-cover',
                'transition-opacity duration-300',
                isLoading && 'opacity-0',
                hasError && 'opacity-0'
              )}
              onLoad={handleLoad}
              onError={handleError}
            />
          ) : (
            <AdvancedImage
              cldImg={new CloudinaryImageType(publicId, { 
                cloudName: CLOUDINARY_CONFIG.cloudName 
              })}
              plugins={[
                lazyload({ rootMargin: '10px 20px 10px 30px', threshold: 0.05 }),
                placeholder({ mode: 'blur' })
              ]}
              onLoad={handleLoad}
              onError={handleError}
              className={cn(
                'w-full h-full object-cover',
                'transition-opacity duration-300',
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