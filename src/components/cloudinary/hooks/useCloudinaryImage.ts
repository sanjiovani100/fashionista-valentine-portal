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
      console.log('useCloudinaryImage: Generating URL for publicId:', publicId);
      const myImage = cld.image(publicId);
      
      // Apply optimizations
      myImage.delivery(format('auto'));
      myImage.delivery(quality('auto'));

      if (width) myImage.resize(scale().width(width));
      if (height) myImage.resize(scale().height(height));

      const url = myImage.toURL();
      console.log('useCloudinaryImage: Generated URL:', url);
      
      setState(prev => ({ ...prev, imageUrl: url }));
    } catch (error) {
      console.error('Error generating Cloudinary URL:', error);
      setState(prev => ({ ...prev, hasError: true }));
    }
  }, [publicId, width, height]);

  return state;
};