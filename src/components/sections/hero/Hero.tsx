import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  headline: string;
  subheading: string;
  backgroundImage?: string;
}

export const Hero = ({ headline, subheading, backgroundImage }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background image with fallback gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: backgroundImage 
            ? `url(${backgroundImage})` 
            : 'linear-gradient(to bottom, #800000, #000000)'
        }}
      />
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      <div className="container mx-auto px-4 z-20 text-center animate-fadeIn">
        <h1 className="font-montserrat text-5xl md:text-7xl font-bold mb-6">
          {headline.split(" ").map((word, index) => (
            <span key={index} className={index === 1 ? "block text-red-soft mt-2" : ""}>
              {word}{" "}
            </span>
          ))}
        </h1>
        <p className="font-inter text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          {subheading}
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-red-deep hover:bg-red-dark text-white">
            Get Tickets
          </Button>
          <Button variant="outline" size="lg" className="border-red-soft text-red-soft hover:bg-red-soft/10">
            <Calendar className="mr-2 h-5 w-5" />
            February 14, 2024
          </Button>
        </div>
      </div>
    </section>
  );
};