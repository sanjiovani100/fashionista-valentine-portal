import React, { useState } from 'react';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { CloudinaryImage as CloudinaryImageType } from '@cloudinary/url-gen';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { CloudinaryImageError } from './CloudinaryImageError';
import { ImageErrorBoundary } from './ImageErrorBoundary';
import { useCloudinaryImage } from '../hooks/useCloudinaryImage';
import { CLOUDINARY_CONFIG, isValidCloudinaryUrl } from '@/integrations/cloudinary/config';
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
  const isFullUrl = publicId.startsWith('http');
  const [loadTime, setLoadTime] = useState<number>(0);

  console.log("CloudinaryImage received props:", {
    publicId,
    isFullUrl,
    imageUrl,
    isLoading,
    hasError,
    loadTime
  });

  const handleLoad = () => {
    if (window.performance && window.performance.getEntriesByName) {
      const imagePerf = performance.getEntriesByName(imageUrl)[0] as PerformanceResourceTiming;
      if (imagePerf) {
        const loadTimeMs = imagePerf.duration;
        setLoadTime(loadTimeMs);
        console.log(`Image loaded successfully:`, {
          publicId,
          url: imageUrl,
          loadTime: `${loadTimeMs}ms`,
          size: imagePerf.transferSize,
          type: isFullUrl ? 'full_url' : 'cloudinary_id',
          renderTime: Date.now()
        });
      }
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image loading failed:', {
      publicId,
      url: imageUrl,
      error: e.type,
      timestamp: new Date().toISOString(),
      cloudinaryConfig: {
        cloudName: CLOUDINARY_CONFIG.cloudName,
        isConfigured: !!CLOUDINARY_CONFIG.cloudName
      },
      browserInfo: {
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    });

    if (e.currentTarget.src !== CLOUDINARY_CONFIG.defaultPlaceholder) {
      e.currentTarget.src = CLOUDINARY_CONFIG.defaultPlaceholder;
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
                'w-full h-full object-cover transition-opacity duration-200',
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
                'w-full h-full object-cover transition-opacity duration-200',
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