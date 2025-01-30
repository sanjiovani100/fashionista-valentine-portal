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
  onLoadingComplete
}: CloudinaryImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      console.log('[Cloudinary] Setting up image with publicId:', publicId);
      
      // Handle empty or invalid publicId
      if (!publicId) {
        console.warn('[Cloudinary] No publicId provided, using fallback');
        setImageUrl(cloudinaryConfig.defaults.placeholder);
        return;
      }

      // If it's already a full URL, validate and use it directly
      if (publicId.startsWith('http')) {
        if (cloudinaryService.validateUrl(publicId)) {
          setImageUrl(publicId);
        } else {
          setImageUrl(cloudinaryConfig.defaults.placeholder);
        }
        return;
      }

      // Generate Cloudinary URL
      const url = cloudinaryService.getImageUrl(publicId, {
        width,
        height,
        aspectRatio
      });

      console.log('[Cloudinary] Generated URL:', url);
      setImageUrl(url);

      if (priority) {
        const img = new Image();
        img.src = url;
      }
    } catch (err) {
      console.error('[Cloudinary] Error setting up image:', err);
      setError(err as Error);
      setImageUrl(cloudinaryConfig.defaults.placeholder);
    }
  }, [publicId, width, height, aspectRatio, priority]);

  const handleImageError = () => {
    console.error('[Cloudinary] Image load error for:', publicId);
    setError(new Error('Failed to load image'));
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