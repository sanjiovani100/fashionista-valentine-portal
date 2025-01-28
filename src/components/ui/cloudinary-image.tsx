import React, { useState, useEffect } from 'react';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { format } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/quality';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { Skeleton } from './skeleton';
import { Alert, AlertDescription } from './alert';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'auto';
  priority?: boolean;
}

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  auto: 'aspect-auto'
};

export const OptimizedImage = ({
  publicId,
  alt,
  width,
  height,
  className,
  aspectRatio = 'auto',
  priority = false
}: CloudinaryImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const cld = new Cloudinary({
      cloud: {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }
    });

    try {
      const myImage = cld.image(publicId)
        .delivery(format('auto'))
        .delivery(auto());

      if (width) myImage.resize(scale().width(width));
      if (height) myImage.resize(scale().height(height));

      setImageUrl(myImage.toURL());
    } catch (error) {
      console.error('Error generating Cloudinary URL:', error);
      setHasError(true);
    }
  }, [publicId, width, height]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);

    if (window.performance && window.performance.getEntriesByName) {
      const imagePerf = performance.getEntriesByName(imageUrl)[0];
      if (imagePerf) {
        console.log(`Image loaded in ${imagePerf.duration}ms`);
      }
    }
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    console.error(`Failed to load image: ${publicId}`);
  };

  return (
    <div className={cn('relative', aspectRatioClasses[aspectRatio], className)}>
      {isLoading && (
        <Skeleton className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {hasError && (
        <Alert variant="destructive" className="absolute inset-0 flex items-center">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load image
          </AlertDescription>
        </Alert>
      )}
      
      {imageUrl && (
        <AdvancedImage
          cldImg={new CloudinaryImage(publicId, { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME })}
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
      )}
    </div>
  );
};