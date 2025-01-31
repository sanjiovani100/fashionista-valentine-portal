import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-dark-gradient text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div className="container mx-auto px-4 z-20 text-center animate-fadeIn">
        <h1 className="font-montserrat text-5xl md:text-7xl font-bold mb-6 text-shadow-xl">
          Fashionistas
          <span className="block text-red-primary mt-2 drop-shadow-glow">Valentine's Event</span>
        </h1>
        <p className="font-inter text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white-opacity-80">
          Join us for an exclusive celebration of fashion, creativity, and empowerment
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="btn-primary">
            Get Tickets
          </Button>
          <Button variant="outline" size="lg" className="btn-secondary">
            <Calendar className="mr-2 h-5 w-5" />
            February 14, 2024
          </Button>
        </div>
      </div>
    </section>
  );
};