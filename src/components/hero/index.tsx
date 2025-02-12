import { type FC } from 'react';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';

export interface HeroProps {
  title?: string;
  subtitle?: string;
  eventDate?: string;
  onGetTickets: () => void;
}

export const Hero: FC<HeroProps> = ({
  title = "Fashionistas",
  subtitle = "Join us for an exclusive celebration of fashion, creativity, and empowerment",
  eventDate = "February 14, 2024",
  onGetTickets
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-dark-gradient text-white overflow-hidden">
      <HeroBackground />
      <HeroContent
        title={title}
        subtitle={subtitle}
        eventDate={eventDate}
        onGetTickets={onGetTickets}
      />
    </section>
  );
};

// Re-export components for convenience
export * from './HeroBackground';
export * from './HeroContent'; 


