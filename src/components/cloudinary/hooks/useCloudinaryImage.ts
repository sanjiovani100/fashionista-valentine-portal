import { useState, useEffect } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
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
      const myImage = cld.image(publicId);
      
      // Apply optimizations
      myImage.delivery(format('auto'));
      myImage.delivery(quality('auto'));

      if (width) myImage.resize(scale().width(width));
      if (height) myImage.resize(scale().height(height));

      setState(prev => ({ ...prev, imageUrl: myImage.toURL() }));
    } catch (error) {
      console.error('Error generating Cloudinary URL:', error);
      setState(prev => ({ ...prev, hasError: true }));
    }
  }, [publicId, width, height]);

  return state;
};