import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import './styles.css';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrolled = window.scrollY;
      const hearts = heroRef.current.querySelectorAll('.heart');
      
      hearts.forEach((heart, index) => {
        const speed = 1 + index * 0.2;
        const yPos = -(scrolled * speed) / 5;
        (heart as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Base gradient background - lowest z-index */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#C00000] via-[#800000] to-black z-0" 
      />
      
      {/* Floating hearts - middle layer */}
      <div className="absolute inset-0 z-10">
        <div className="heart heart-1">❤</div>
        <div className="heart heart-2">❤</div>
        <div className="heart heart-3">❤</div>
        <div className="heart heart-4">❤</div>
      </div>

      {/* Semi-transparent overlay - above hearts */}
      <div 
        className="absolute inset-0 bg-black/30 z-20" 
      />

      {/* Content container - highest z-index */}
      <div className="relative container mx-auto px-4 z-30">
        <div className="text-center space-y-8">
          <h1 className="font-montserrat text-5xl md:text-7xl font-bold text-white 
                       tracking-tight leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            Fashionistas
            <span className="block text-white mt-2">Valentine's Event</span>
          </h1>

          <p className="font-montserrat text-xl md:text-2xl text-white/90 max-w-2xl mx-auto 
                     tracking-normal leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            Celebrate Valentine's Day with Medellín's most glamorous lingerie fashion show
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90
                       h-[48px] px-8 min-w-[200px] rounded-lg font-medium
                       transition-all duration-300 ease-out
                       shadow-[0_4px_14px_0_rgba(0,0,0,0.25)]"
            >
              Get Tickets
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              className="bg-black/80 text-white hover:bg-black
                       h-[48px] px-8 min-w-[200px] rounded-lg font-medium
                       border-2 border-white/20 transition-all duration-300
                       shadow-[0_4px_14px_0_rgba(0,0,0,0.25)]"
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