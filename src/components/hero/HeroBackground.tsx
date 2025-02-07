import { type FC } from 'react';

interface HeroBackgroundProps {
  className?: string;
}

export const HeroBackground: FC<HeroBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 bg-black/40 z-10 ${className}`} />
  );
}; 