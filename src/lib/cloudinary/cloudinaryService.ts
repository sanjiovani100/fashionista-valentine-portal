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
  quality?: string;
  format?: string;
  fetchFormat?: string;
  loading?: 'lazy' | 'eager';
}

class CloudinaryService {
  private cld: Cloudinary;
  private defaultFolder: string;
  private cache: Map<string, string>;
  private imageLoadingPromises: Map<string, Promise<string>>;

  constructor(config: CloudinaryConfig) {
    this.cld = new Cloudinary({
      cloud: {
        cloudName: config.cloudName
      }
    });
    this.defaultFolder = config.defaultFolder || 'fashion-events';
    this.cache = new Map();
    this.imageLoadingPromises = new Map();
  }

  private standardizePublicId(publicId: string): string {
    try {
      // Remove file extensions and clean the ID
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

      // Add default folder if not present
      if (!cleanId.includes('/')) {
        cleanId = `${this.defaultFolder}/${cleanId}`;
      }

      console.log('[Cloudinary] Standardized ID:', { original: publicId, cleaned: cleanId });
      return cleanId;
    } catch (error) {
      console.error('[Cloudinary] Error standardizing public ID:', error);
      throw new Error(`Invalid public ID format: ${publicId}`);
    }
  }

  public async getImageUrl(publicId: string, options: ImageOptions = {}): Promise<string> {
    try {
      if (!publicId) {
        throw new Error('Empty publicId provided');
      }

      // Check cache first
      const cacheKey = `${publicId}-${JSON.stringify(options)}`;
      const cachedUrl = this.cache.get(cacheKey);
      if (cachedUrl) {
        return cachedUrl;
      }

      // Check if there's already a promise loading this image
      let loadingPromise = this.imageLoadingPromises.get(cacheKey);
      if (loadingPromise) {
        return loadingPromise;
      }

      // If it's already a full URL and not a Cloudinary URL, validate and return
      if (publicId.startsWith('http') && !publicId.includes('cloudinary.com')) {
        if (this.validateUrl(publicId)) {
          this.cache.set(cacheKey, publicId);
          return publicId;
        }
        throw new Error('Invalid URL format');
      }

      loadingPromise = (async () => {
        const standardizedId = this.standardizePublicId(publicId);
        console.log('[Cloudinary] Processing image:', { publicId, standardizedId });

        let transformation = this.cld.image(standardizedId)
          .format(format('auto'))
          .quality(quality('auto'));

        if (options.width || options.height) {
          transformation = transformation.resize(
            fill()
              .width(options.width || 800)
              .height(options.height || 600)
          );
        }

        const url = transformation.toURL();
        console.log('[Cloudinary] Generated URL:', url);
        
        // Cache the result
        this.cache.set(cacheKey, url);
        this.imageLoadingPromises.delete(cacheKey);
        
        return url;
      })();

      this.imageLoadingPromises.set(cacheKey, loadingPromise);
      return loadingPromise;
    } catch (error) {
      console.error('[Cloudinary] Error generating URL:', error);
      throw error;
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

      // For other URLs, check if they're valid URLs
      return url.startsWith('http');
    } catch (error) {
      console.error('[Cloudinary] URL validation error:', { url, error });
      return false;
    }
  }

  public clearCache(): void {
    this.cache.clear();
    this.imageLoadingPromises.clear();
  }
}

export const cloudinaryService = new CloudinaryService({
  cloudName: cloudinaryConfig.cloud.cloudName,
  defaultFolder: 'fashion-events'
});