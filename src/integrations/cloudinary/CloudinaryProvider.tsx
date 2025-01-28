import React, { createContext, useContext, useEffect } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { toast } from 'sonner';

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

// Create a context to hold the Cloudinary instance
const CloudinaryContext = createContext<Cloudinary | null>(null);

// Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: cloudName || 'demo'
  }
});

export const CloudinaryProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Verify Cloudinary configuration on mount
    console.log('Cloudinary Configuration:', {
      cloudName: cloudName || 'demo (fallback)',
      isConfigured: !!cloudName,
      environment: import.meta.env.MODE
    });

    if (!cloudName) {
      console.error('Cloudinary cloud name not configured!');
      toast.error('Image optimization service not properly configured');
    } else {
      console.log('Cloudinary successfully configured with cloud name:', cloudName);
    }
  }, []);

  return (
    <CloudinaryContext.Provider value={cld}>
      {children}
    </CloudinaryContext.Provider>
  );
};

// Custom hook to use Cloudinary instance
export const useCloudinary = () => {
  const context = useContext(CloudinaryContext);
  if (!context) {
    throw new Error('useCloudinary must be used within a CloudinaryProvider');
  }
  return context;
};

// Export the Cloudinary instance for direct usage
export { cld };