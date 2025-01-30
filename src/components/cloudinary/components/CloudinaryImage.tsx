import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { ImageErrorBoundary } from './ImageErrorBoundary';
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
  onLoadingComplete
}: CloudinaryImageProps) => {
  const { width, height } = propWidth && propHeight 
    ? { width: propWidth, height: propHeight }
    : getAspectRatioDimensions(aspectRatio);

  const cld = new Cloudinary(cloudinaryConfig);

  // Use the publicId directly since we're now storing Cloudinary IDs
  const myImage = cld.image(publicId)
    .resize(fill().width(width).height(height));

  return (
    <ImageErrorBoundary fallback={<div className="bg-gray-200 animate-pulse" style={{ width, height }} />}>
      <AdvancedImage
        cldImg={myImage}
        plugins={[lazyload(), placeholder()]}
        alt={alt}
        className={className}
        onError={(e) => {
          console.error('[Cloudinary Error]', e);
        }}
        onLoad={() => {
          onLoadingComplete?.();
        }}
      />
    </ImageErrorBoundary>
  );
};