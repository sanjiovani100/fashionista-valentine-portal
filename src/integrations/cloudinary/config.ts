import { Cloudinary } from "@cloudinary/url-gen";

// Initialize Cloudinary instance
export const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo'
  },
  url: {
    secure: true // Force HTTPS
  }
});