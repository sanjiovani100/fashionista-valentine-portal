import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { ImageErrorBoundary } from './ImageErrorBoundary';
import { cloudinaryConfig } from '../config';

interface OptimizedImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export const OptimizedImage = ({ 
  publicId, 
  alt, 
  width = 800, 
  height = 600, 
  className 
}: OptimizedImageProps) => {
  const cld = new Cloudinary(cloudinaryConfig);

  // Handle direct URLs vs public IDs
  const imageId = publicId.includes('cloudinary.com') 
    ? publicId.split('/upload/')[1].split('.')[0]
    : publicId;

  const myImage = cld.image(imageId)
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
      />
    </ImageErrorBoundary>
  );
};