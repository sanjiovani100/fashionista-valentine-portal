import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { cloudinaryService } from '@/lib/cloudinary/cloudinaryService';
import { ImageErrorBoundary } from './ImageErrorBoundary';
import { CloudinaryImageError } from './CloudinaryImageError';
import type { CloudinaryImageProps } from '../types/cloudinary.types';

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
      console.log('Setting up image with publicId:', publicId);
      
      if (!cloudinaryService.validateUrl(publicId)) {
        throw new Error('Invalid image URL');
      }

      const url = cloudinaryService.getImageUrl(publicId, {
        width,
        height,
        aspectRatio
      });

      setImageUrl(url);

      if (priority) {
        const img = new Image();
        img.src = url;
      }
    } catch (err) {
      console.error('Error setting up image:', err);
      setError(err as Error);
    }
  }, [publicId, width, height, aspectRatio, priority]);

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
          onError={(e) => {
            console.error('Image load error:', e);
            setError(new Error('Failed to load image'));
          }}
        />
      </div>
    </ImageErrorBoundary>
  );
};