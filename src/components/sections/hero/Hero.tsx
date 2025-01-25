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
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-snap-section">
      {/* Gradient Background with Animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#C00000] via-[#800000] to-black animate-gradient" />
      
      {/* Parallax Hearts Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="heart heart-1 parallax-layer">❤</div>
        <div className="heart heart-2 parallax-layer">❤</div>
        <div className="heart heart-3 parallax-layer">❤</div>
        <div className="heart heart-4 parallax-layer">❤</div>
      </div>

      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content Container */}
      <div className="container mx-auto px-4 z-20 text-center">
        <div className="space-y-8 reveal">
          {/* Headline */}
          <h1 className="font-montserrat text-5xl md:text-7xl font-bold text-white 
                       tracking-tight leading-tight animate-fade-up">
            Fashionistas
            <span className="block text-white mt-2">Valentine's Event</span>
          </h1>

          {/* Tagline */}
          <p className="font-montserrat text-xl md:text-2xl text-white/90 max-w-2xl mx-auto 
                     tracking-normal leading-relaxed animate-fade-up delay-200">
            Celebrate Valentine's Day with Medellín's most glamorous lingerie fashion show
          </p>

          {/* CTAs */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-up delay-300">
            <Button 
              size="lg" 
              className="bg-white text-black hover-scale hover-glow
                       h-[48px] px-8 min-w-[200px] rounded-lg font-medium
                       transition-all duration-300 ease-out"
            >
              Get Tickets
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              className="bg-black/80 text-white hover-scale
                       h-[48px] px-8 min-w-[200px] rounded-lg font-medium
                       border-2 border-white/20 transition-all duration-300"
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