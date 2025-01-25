import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import './styles.css';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background with Animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-maroon to-black animate-gradient" />
      
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="heart-1 animate-float-1">❤</div>
        <div className="heart-2 animate-float-2">❤</div>
        <div className="heart-3 animate-float-3">❤</div>
      </div>

      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content Container */}
      <div className="container mx-auto px-4 z-20 text-center">
        {/* Main Content with Staggered Animation */}
        <div className="space-y-8 animate-fade-in">
          {/* Headline */}
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white 
                         drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            Fashionistas
            <span className="block text-blush mt-2">Valentine's Event</span>
          </h1>

          {/* Tagline */}
          <p className="font-montserrat text-xl md:text-2xl text-blush/90 max-w-2xl mx-auto">
            Celebrate Valentine's Day with Medellín's most glamorous lingerie fashion show
          </p>

          {/* CTAs */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* Primary CTA */}
            <Button 
              size="lg" 
              className="bg-[#C00000] hover:bg-[#C00000]/90 text-white 
                         transform transition-all duration-300 hover:scale-105
                         hover:shadow-[0_0_15px_rgba(192,0,0,0.5)]
                         min-w-[200px]"
            >
              Get Tickets
            </Button>

            {/* Secondary CTA */}
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-blush text-blush 
                         hover:bg-blush/10 transition-all duration-300
                         hover:shadow-[0_0_15px_rgba(255,193,193,0.3)]
                         min-w-[200px]"
            >
              <Calendar className="mr-2 h-5 w-5" />
              February 14, 2024
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};