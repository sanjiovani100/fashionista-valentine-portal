import React from 'react';
import { CloudinaryContext } from '@cloudinary/react';

export const CloudinaryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CloudinaryContext cloudName={import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo'}>
      {children}
    </CloudinaryContext>
  );
};