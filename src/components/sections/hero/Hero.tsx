import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import './styles.css';

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient text-white overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 gradient-animate" />
      
      {/* Semi-transparent overlay with pulse */}
      <div className="absolute inset-0 bg-black/40 pulse-overlay z-10" />
      
      {/* Optional: Floating hearts background */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 hearts-container" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`floating-heart heart-${i + 1}`}>❤</div>
          ))}
        </div>
      )}

      {/* Content container */}
      <div className="container mx-auto px-4 z-20 text-center">
        {/* Main title with staggered animation */}
        <h1 className="font-montserrat text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-title">
          <span className="block slide-up">Fashionistas</span>
          <span className="block text-blush mt-2 scale-animate">Valentine's Event</span>
        </h1>

        {/* Description with fade in */}
        <p className="font-inter text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-0 animate-description">
          Join us for an exclusive celebration of fashion, creativity, and empowerment
        </p>

        {/* Buttons with slide up animation */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center opacity-0 animate-buttons">
          <Button 
            size="lg" 
            className="bg-blush hover:bg-blush/90 text-black transform-gpu transition-all duration-300 hover:scale-105 hover:shadow-glow"
          >
            Get Tickets
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-blush text-blush hover:bg-blush/10 transform-gpu transition-all duration-300 hover:scale-105"
          >
            <Calendar className="mr-2 h-5 w-5" />
            February 14, 2024
          </Button>
        </div>
      </div>
    </section>
  );
};