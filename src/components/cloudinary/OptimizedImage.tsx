import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { cloudinaryService } from '@/lib/cloudinary/cloudinaryService';
import { ImageErrorBoundary } from './components/ImageErrorBoundary';
import { CloudinaryImageError } from './components/CloudinaryImageError';
import { cloudinaryConfig } from './config';
import type { CloudinaryImageProps } from './types/cloudinary.types';

export const OptimizedImage = ({
  publicId,
  alt,
  width,
  height,
  className,
  aspectRatio = 'auto',
  priority = false,
  onLoadingComplete,
  onError
}: CloudinaryImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  useEffect(() => {
    const loadImage = async () => {
      try {
        console.log('[Cloudinary] Setting up image with publicId:', publicId);
        
        if (!publicId) {
          console.warn('[Cloudinary] No publicId provided, using fallback');
          setImageUrl(cloudinaryConfig.defaults.placeholder);
          return;
        }

        // Generate Cloudinary URL with error handling
        const url = await cloudinaryService.getImageUrl(publicId, {
          width,
          height,
          aspectRatio
        });

        console.log('[Cloudinary] Generated URL:', url);
        setImageUrl(url);
        setError(null);

        if (priority) {
          const img = new Image();
          img.src = url;
        }
      } catch (err) {
        console.error('[Cloudinary] Error setting up image:', err);
        
        if (retryCount < maxRetries) {
          console.log(`[Cloudinary] Retrying... Attempt ${retryCount + 1} of ${maxRetries}`);
          setRetryCount(prev => prev + 1);
          return;
        }
        
        setError(err as Error);
        onError?.();
        setImageUrl(cloudinaryConfig.defaults.placeholder);
      }
    };

    loadImage();
  }, [publicId, width, height, aspectRatio, priority, retryCount, onError]);

  const handleImageError = () => {
    console.error('[Cloudinary] Image load error for:', publicId);
    
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      return;
    }
    
    setError(new Error('Failed to load image'));
    onError?.();
    setImageUrl(cloudinaryConfig.defaults.placeholder);
    setIsLoading(false);
  };

  if (error) {
    return <CloudinaryImageError />;
  }

  return (
    <ImageErrorBoundary fallback={<CloudinaryImageError />}>
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
        )}
        <img
          src={imageUrl}
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          onLoad={() => {
            setIsLoading(false);
            onLoadingComplete?.();
          }}
          onError={handleImageError}
        />
      </div>
    </ImageErrorBoundary>
  );
};