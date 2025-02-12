import { Cloudinary } from '@cloudinary/url-gen';

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

// Validate cloud name is configured
if (!cloudName) {
  console.error('VITE_CLOUDINARY_CLOUD_NAME is not set in environment variables');
}

export const CLOUDINARY_CONFIG = {
  cloudName,
  defaultPlaceholder: `https://res.cloudinary.com/${cloudName}/image/upload/v1706436856/placeholder_kgzjk4.jpg`,
  fallbacks: {
    collection: 'default-collection-placeholder',
    event: 'default-event-placeholder',
    profile: 'default-profile-placeholder'
  }
} as const;

// Initialize the Cloudinary instance
export const cld = new Cloudinary({
  cloud: {
    cloudName: cloudName || 'demo' // Fallback to 'demo' for development
  }
});

// Helper to extract first valid URL from media_urls array
export const getFirstValidMediaUrl = (mediaUrls?: string[] | null): string | null => {
  if (!mediaUrls?.length) return null;
  return mediaUrls.find(url => url && url.includes('cloudinary.com')) || null;
};

// Helper to validate Cloudinary URLs
export const isValidCloudinaryUrl = (url: string): boolean => {
  try {
    if (!url) return false;
    const validDomain = url.includes('cloudinary.com');
    const validFormat = url.includes('/image/upload/');
    return validDomain && validFormat;
  } catch (error) {
    console.error('URL validation error:', { url, error });
    return false;
  }
};

// Log Cloudinary configuration on initialization
console.log('Cloudinary Configuration:', {
  cloudName: cloudName || 'demo (fallback)',
  isConfigured: !!cloudName,
  environment: import.meta.env.MODE
});


