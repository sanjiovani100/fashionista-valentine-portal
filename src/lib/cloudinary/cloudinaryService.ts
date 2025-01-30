import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { cloudinaryConfig } from '@/components/cloudinary/config';

interface CloudinaryConfig {
  cloudName: string;
  defaultFolder?: string;
}

interface ImageOptions {
  width?: number;
  height?: number;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'auto';
  quality?: number;
}

class CloudinaryService {
  private cld: Cloudinary;
  private defaultFolder: string;

  constructor(config: CloudinaryConfig) {
    this.cld = new Cloudinary({
      cloud: {
        cloudName: config.cloudName
      }
    });
    this.defaultFolder = config.defaultFolder || 'fashion-events';
  }

  private standardizePublicId(publicId: string): string {
    try {
      // Remove file extensions
      let cleanId = publicId.replace(/\.[^/.]+$/, '');

      // Handle full Cloudinary URLs
      if (publicId.includes('cloudinary.com')) {
        const match = publicId.match(/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
        if (match) cleanId = match[1];
      }

      // Handle Supabase URLs
      if (publicId.includes('supabase.co')) {
        cleanId = publicId.split('/').pop()?.split('?')[0] || publicId;
      }

      // Add default folder if not present and not already in a folder
      if (!cleanId.includes('/')) {
        cleanId = `${this.defaultFolder}/${cleanId}`;
      }

      console.log('[Cloudinary] Standardized ID:', { original: publicId, cleaned: cleanId });
      return cleanId;
    } catch (error) {
      console.error('[Cloudinary] Error standardizing public ID:', error);
      return publicId;
    }
  }

  public getImageUrl(publicId: string, options: ImageOptions = {}): string {
    try {
      if (!publicId) {
        console.warn('[Cloudinary] Empty publicId provided');
        return cloudinaryConfig.defaults.placeholder;
      }

      // If it's already a full URL and not a Cloudinary URL, return it
      if (publicId.startsWith('http') && !publicId.includes('cloudinary.com')) {
        return publicId;
      }

      const standardizedId = this.standardizePublicId(publicId);
      console.log('[Cloudinary] Processing image:', { publicId, standardizedId });

      let transformation = this.cld.image(standardizedId)
        .format('auto')
        .quality('auto');

      if (options.width || options.height) {
        transformation = transformation.resize(
          fill()
            .width(options.width || 800)
            .height(options.height || 600)
        );
      }

      const url = transformation.toURL();
      console.log('[Cloudinary] Generated URL:', url);
      return url;
    } catch (error) {
      console.error('[Cloudinary] Error generating URL:', error);
      return cloudinaryConfig.defaults.placeholder;
    }
  }

  public validateUrl(url: string): boolean {
    try {
      if (!url) return false;
      
      // Allow Supabase URLs
      if (url.includes('supabase.co')) return true;
      
      // Validate Cloudinary URLs
      if (url.includes('cloudinary.com')) {
        const validDomain = url.includes(cloudinaryConfig.cloud.cloudName);
        const validFormat = url.includes('/image/upload/');
        return validDomain && validFormat;
      }

      // For other URLs, just check if they're valid URLs
      return url.startsWith('http');
    } catch (error) {
      console.error('[Cloudinary] URL validation error:', { url, error });
      return false;
    }
  }
}

export const cloudinaryService = new CloudinaryService({
  cloudName: cloudinaryConfig.cloud.cloudName,
  defaultFolder: 'fashion-events'
});