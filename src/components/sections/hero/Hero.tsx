import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import './styles.css';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background with Animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#C00000] via-[#800000] to-black animate-gradient" />
      
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="heart-1">❤</div>
        <div className="heart-2">❤</div>
        <div className="heart-3">❤</div>
        <div className="heart-4">❤</div>
      </div>

      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content Container */}
      <div className="container mx-auto px-4 z-20 text-center">
        {/* Main Content with Staggered Animation */}
        <div className="space-y-8 stagger-fade-in">
          {/* Headline */}
          <h1 className="font-montserrat text-5xl md:text-7xl font-bold text-white 
                         tracking-tight leading-tight">
            Fashionistas
            <span className="block text-white mt-2">Valentine's Event</span>
          </h1>

          {/* Tagline */}
          <p className="font-montserrat text-xl md:text-2xl text-white/90 max-w-2xl mx-auto 
                       tracking-normal leading-relaxed">
            Celebrate Valentine's Day with Medellín's most glamorous lingerie fashion show
          </p>

          {/* CTAs */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* Primary CTA - White Button */}
            <Button 
              size="lg" 
              className="bg-white text-black h-[48px] px-8
                         hover:scale-105 hover:shadow-glow
                         transition-all duration-300 ease-in-out
                         min-w-[200px] rounded-lg font-medium"
            >
              Get Tickets
            </Button>

            {/* Secondary CTA - Black Button */}
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-black text-white h-[48px] px-8
                         hover:bg-black/90 hover:scale-105
                         transition-all duration-300 ease-in-out
                         min-w-[200px] rounded-lg font-medium
                         border-2 border-white/20"
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