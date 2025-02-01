import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { ImageErrorBoundary } from './ImageErrorBoundary';
import { CloudinaryImageError } from './CloudinaryImageError';
import { cloudinaryConfig } from '../config';
import type { CloudinaryImageProps } from '../types/cloudinary.types';

const getAspectRatioDimensions = (aspectRatio: string, baseWidth: number = 800) => {
  switch (aspectRatio) {
    case 'square':
      return { width: baseWidth, height: baseWidth };
    case 'video':
      return { width: baseWidth, height: Math.floor(baseWidth * (9/16)) };
    case 'portrait':
      return { width: baseWidth, height: Math.floor(baseWidth * (4/3)) };
    case 'landscape':
      return { width: baseWidth, height: Math.floor(baseWidth * (3/4)) };
    default:
      return { width: baseWidth, height: Math.floor(baseWidth * 0.75) };
  }
};

export const OptimizedImage = ({ 
  publicId, 
  alt, 
  width: propWidth, 
  height: propHeight, 
  className,
  aspectRatio = 'auto',
  priority = false,
  onLoadingComplete,
  onError
}: CloudinaryImageProps) => {
  console.group('[OptimizedImage] Initializing');
  console.log('Input publicId:', publicId);

  // Extract Cloudinary ID if a full URL is provided
  let cloudinaryId = publicId;
  
  try {
    if (publicId.includes('cloudinary.com')) {
      const matches = publicId.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
      if (matches) {
        cloudinaryId = matches[1];
        console.log('Extracted Cloudinary ID from URL:', cloudinaryId);
      }
    } else if (publicId.includes('supabase.co')) {
      const id = publicId.split('/').pop()?.split('?')[0];
      if (id) {
        cloudinaryId = id;
        console.log('Extracted Supabase ID from URL:', cloudinaryId);
      }
    }

    console.log('Final Cloudinary ID:', cloudinaryId);
    console.log('Cloud name:', cloudinaryConfig.cloud.cloudName);

    const { width, height } = propWidth && propHeight 
      ? { width: propWidth, height: propHeight }
      : getAspectRatioDimensions(aspectRatio);

    console.log('Dimensions:', { width, height, aspectRatio });

    const cld = new Cloudinary(cloudinaryConfig);
    const myImage = cld.image(cloudinaryId)
      .resize(fill().width(width).height(height));

    console.groupEnd();

    return (
      <ImageErrorBoundary 
        fallback={(props) => (
          <CloudinaryImageError {...props} />
        )}
      >
        <AdvancedImage
          cldImg={myImage}
          plugins={[lazyload(), placeholder()]}
          alt={alt}
          className={className}
          onError={(e) => {
            console.error('[Cloudinary Error]', e);
            onError?.(e);
          }}
          onLoad={() => {
            console.log('[Cloudinary] Image loaded successfully:', cloudinaryId);
            onLoadingComplete?.();
          }}
        />
      </ImageErrorBoundary>
    );
  } catch (error) {
    console.error('[OptimizedImage] Error:', error);
    console.groupEnd();
    return <CloudinaryImageError error={error instanceof Error ? error : new Error('Failed to load image')} />;
  }
};