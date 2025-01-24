import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-maroon to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div className="container mx-auto px-4 z-20 text-center animate-fadeIn">
        <h1 className="font-montserrat text-5xl md:text-7xl font-bold mb-6">
          Fashionistas
          <span className="block text-blush mt-2">Valentine's Event</span>
        </h1>
        <p className="font-inter text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Join us for an exclusive celebration of fashion, creativity, and empowerment
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-blush hover:bg-blush/90 text-black">
            Get Tickets
          </Button>
          <Button variant="outline" size="lg" className="border-blush text-blush hover:bg-blush/10">
            <Calendar className="mr-2 h-5 w-5" />
            February 14, 2024
          </Button>
        </div>
      </div>
    </section>
  );
};