import React, { useState } from 'react';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { CloudinaryImage as CloudinaryImageType } from '@cloudinary/url-gen';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { CloudinaryImageError } from './CloudinaryImageError';
import { ImageErrorBoundary } from './ImageErrorBoundary';
import { useCloudinaryImage } from '../hooks/useCloudinaryImage';
import type { CloudinaryImageProps } from '../types/cloudinary.types';

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  auto: 'aspect-auto'
} as const;

// Updated fallback image with correct version
const FALLBACK_IMAGE = "https://res.cloudinary.com/dzqy2ixl0/image/upload/v1706436856/placeholder_kgzjk4.jpg";

// Add environment check on component mount
console.log('Cloudinary Configuration:', {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  isConfigured: !!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  environment: import.meta.env.MODE
});

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

  console.log("CloudinaryImage received props:", {
    publicId,
    isFullUrl,
    imageUrl,
    isLoading,
    hasError
  });

  const handleLoad = () => {
    if (window.performance && window.performance.getEntriesByName) {
      const imagePerf = performance.getEntriesByName(imageUrl)[0] as PerformanceResourceTiming;
      if (imagePerf) {
        console.log(`Image loaded successfully:`, {
          publicId,
          url: imageUrl,
          loadTime: `${imagePerf.duration}ms`,
          size: imagePerf.transferSize,
          type: isFullUrl ? 'full_url' : 'cloudinary_id'
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
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        isConfigured: !!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }
    });

    if (e.currentTarget.src !== FALLBACK_IMAGE) {
      e.currentTarget.src = FALLBACK_IMAGE;
    }
  };

  // Extract Cloudinary ID from URL if it's a full URL
  const getCloudinaryId = (url: string) => {
    if (!url.includes('cloudinary.com')) return url;
    const matches = url.match(/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
    return matches ? matches[1] : url;
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
              cldImg={new CloudinaryImageType(getCloudinaryId(publicId), { 
                cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME 
              })}
              plugins={[
                lazyload({ rootMargin: '10px 20px 10px 30px', threshold: 0.05 }),
                placeholder({ mode: 'blur' })
              ]}
              onLoad={handleLoad}
              onError={handleError}
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
