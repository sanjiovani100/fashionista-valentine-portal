import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo'
  }
});

export const CloudinaryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="cloudinary-context">
      {children}
    </div>
  );
};

export { cld };