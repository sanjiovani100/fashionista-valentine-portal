import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

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

    console.log('Standardized ID:', cleanId);
    return cleanId;
  }

  public getImageUrl(publicId: string, options: ImageOptions = {}): string {
    try {
      const standardizedId = this.standardizePublicId(publicId);
      console.log('Processing Cloudinary image:', { publicId, standardizedId });

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
      console.log('Generated Cloudinary URL:', url);
      return url;
    } catch (error) {
      console.error('Error generating Cloudinary URL:', error);
      return '/placeholder.svg';
    }
  }

  public validateUrl(url: string): boolean {
    try {
      const standardizedId = this.standardizePublicId(url);
      return standardizedId.length > 0 && !standardizedId.includes('undefined');
    } catch {
      return false;
    }
  }
}

export const cloudinaryService = new CloudinaryService({
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dzqy2ixl0',
  defaultFolder: 'fashion-events'
});