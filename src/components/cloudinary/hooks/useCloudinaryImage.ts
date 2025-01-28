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
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        dimensions: { width, height },
        timestamp: new Date().toISOString()
      });

      let imageUrl: string;

      if (isFullUrl) {
        imageUrl = publicId;
      } else {
        // Extract Cloudinary ID if it's a full Cloudinary URL
        const cloudinaryId = publicId.includes('cloudinary.com') 
          ? publicId.match(/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/)?.[1] || publicId
          : publicId;

        const myImage = cld.image(cloudinaryId);
        myImage.delivery(format('auto'));
        myImage.delivery(quality('auto'));
        
        if (width) myImage.resize(scale().width(width));
        if (height) myImage.resize(scale().height(height));
        
        imageUrl = myImage.toURL();
      }

      console.log('Generated image URL:', {
        originalId: publicId,
        generatedUrl: imageUrl,
        isTransformed: !isFullUrl
      });
      
      setState(prev => ({ ...prev, imageUrl, isLoading: false }));
      
    } catch (error) {
      console.error('Error processing image:', {
        publicId,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString()
      });
      setState(prev => ({ ...prev, hasError: true, isLoading: false }));
    }
  }, [publicId, width, height]);

  return state;
};