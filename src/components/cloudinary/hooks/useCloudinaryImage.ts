import { useState, useEffect } from 'react';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { cld } from '@/integrations/cloudinary/config';
import type { ImageLoadingState } from '../types/cloudinary.types';

const validateDimensions = (value?: number): boolean => {
  return typeof value === 'undefined' || (typeof value === 'number' && value > 0);
};

const isValidCloudinaryId = (id: string): boolean => {
  // Basic validation for Cloudinary ID format
  return !id.startsWith('http') && /^[a-zA-Z0-9_\-\/]+$/.test(id);
};

export const useCloudinaryImage = (
  publicId: string,
  width?: number,
  height?: number
): ImageLoadingState => {
  const [state, setState] = useState<ImageLoadingState>({
    isLoading: true,
    hasError: false,
    imageUrl: '',
  });

  useEffect(() => {
    try {
      // Debug: Log the incoming publicId
      console.log('[Cloudinary Debug] Processing image:', {
        publicId,
        width,
        height,
        cloudName: cld.config.cloud.cloudName // Using the public config getter
      });

      if (!validateDimensions(width) || !validateDimensions(height)) {
        throw new Error('Invalid dimensions provided');
      }

      let imageUrl: string;
      const isFullUrl = publicId.startsWith('http');

      if (isFullUrl) {
        imageUrl = publicId;
        console.log('[Cloudinary Debug] Using full URL:', imageUrl);
      } else {
        // Extract Cloudinary ID if it's a full Cloudinary URL
        const cloudinaryId = publicId.includes('cloudinary.com') 
          ? publicId.match(/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/)?.[1] || publicId
          : publicId;

        if (!isValidCloudinaryId(cloudinaryId)) {
          console.error('[Cloudinary Error] Invalid ID format:', {
            originalId: publicId,
            extractedId: cloudinaryId
          });
          throw new Error('Invalid Cloudinary ID format');
        }

        const myImage = cld.image(cloudinaryId);
        myImage.delivery(format('auto'));
        myImage.delivery(quality('auto'));
        
        if (width) myImage.resize(scale().width(width));
        if (height) myImage.resize(scale().height(height));
        
        imageUrl = myImage.toURL();
        console.log('[Cloudinary Debug] Generated URL:', {
          cloudinaryId,
          finalUrl: imageUrl
        });
      }

      setState(prev => ({ ...prev, imageUrl, isLoading: false }));
      
    } catch (error) {
      console.error('[Cloudinary Error]', {
        message: error instanceof Error ? error.message : 'Unknown error',
        publicId,
        timestamp: new Date().toISOString(),
        cloudName: cld.config.cloud.cloudName // Using the public config getter
      });
      setState(prev => ({ ...prev, hasError: true, isLoading: false }));
    }
  }, [publicId, width, height]);

  return state;
};