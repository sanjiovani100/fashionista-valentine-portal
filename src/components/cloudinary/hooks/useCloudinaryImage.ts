import { useState, useEffect } from 'react';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { cld } from '@/integrations/cloudinary/config';
import type { ImageLoadingState } from '../types/cloudinary.types';

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
      const isFullUrl = publicId.startsWith('http');
      
      console.log('Processing image:', {
        publicId,
        isFullUrl,
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      });

      let imageUrl: string;

      if (isFullUrl) {
        imageUrl = publicId;
      } else {
        const myImage = cld.image(publicId);
        myImage.delivery(format('auto'));
        myImage.delivery(quality('auto'));
        
        if (width) myImage.resize(scale().width(width));
        if (height) myImage.resize(scale().height(height));
        
        imageUrl = myImage.toURL();
      }

      console.log('Generated image URL:', imageUrl);
      setState(prev => ({ ...prev, imageUrl, isLoading: false }));
      
    } catch (error) {
      console.error('Error processing image:', {
        publicId,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      setState(prev => ({ ...prev, hasError: true, isLoading: false }));
    }
  }, [publicId, width, height]);

  return state;
};