import { Cloudinary } from '@cloudinary/url-gen';

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

if (!cloudName) {
  console.error('VITE_CLOUDINARY_CLOUD_NAME is not set in environment variables');
}

// Initialize the Cloudinary instance
export const cld = new Cloudinary({
  cloud: {
    cloudName: cloudName || 'demo' // Fallback to 'demo' for development
  }
});

// Log Cloudinary configuration on initialization
console.log('Cloudinary Configuration:', {
  cloudName: cloudName || 'demo (fallback)',
  isConfigured: !!cloudName,
  environment: import.meta.env.MODE
});