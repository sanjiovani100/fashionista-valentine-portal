import { type FC } from 'react';
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroContentProps {
  title: string;
  subtitle: string;
  eventDate: string;
  onGetTickets: () => void;
}

export const HeroContent: FC<HeroContentProps> = ({
  title,
  subtitle,
  eventDate,
  onGetTickets
}) => {
  return (
    <div className="container mx-auto px-4 z-20 text-center animate-fadeIn">
      <h1 className="font-montserrat text-5xl md:text-7xl font-bold mb-6 text-shadow-xl">
        {title}
        <span className="block text-red-primary mt-2 drop-shadow-glow">Valentine's Event</span>
      </h1>
      <p className="font-inter text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white-opacity-80">
        {subtitle}
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <Button size="lg" className="btn-primary" onClick={onGetTickets}>
          Get Tickets
        </Button>
        <Button variant="outline" size="lg" className="btn-secondary">
          <Calendar className="mr-2 h-5 w-5" />
          {eventDate}
        </Button>
      </div>
    </div>
  );
}; 