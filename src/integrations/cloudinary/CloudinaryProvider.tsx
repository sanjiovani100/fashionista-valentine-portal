import React from 'react';
import { CloudinaryContext } from '@cloudinary/react';
import { cld } from './config';

export const CloudinaryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CloudinaryContext cloudName={cld.config.cloud.cloudName}>
      {children}
    </CloudinaryContext>
  );
};