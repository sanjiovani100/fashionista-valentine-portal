import React from 'react';
import { CloudinaryProvider as Provider } from '@cloudinary/url-gen/url-gen';

export const CloudinaryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider cloudName={import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}>
      {children}
    </Provider>
  );
};