import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import './styles.css';

interface HeroProps {
  headline: string;
  subheading: string;
  role: "model" | "designer" | "sponsor";
}

export const Hero = ({ headline, subheading, role }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const hearts = heroRef.current.querySelectorAll('.heart');
      
      hearts.forEach((heart, index) => {
        const speed = 1 + index * 0.2;
        const yPos = -(window.scrollY * speed) / 5;
        const rotation = Math.sin(window.scrollY * 0.002 + index) * 5;
        (heart as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg)`;
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
      {/* Base gradient background with pulse animation */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-red-deep via-red-dark to-pure-black z-0 gradient-pulse" 
      />
      
      {/* Floating hearts with varied speeds */}
      <div className="absolute inset-0 z-10">
        <div className="heart heart-1 floating-heart" style={{"--float-duration": "6s"} as React.CSSProperties}>❤</div>
        <div className="heart heart-2 floating-heart" style={{"--float-duration": "7s"} as React.CSSProperties}>❤</div>
        <div className="heart heart-3 floating-heart" style={{"--float-duration": "8s"} as React.CSSProperties}>❤</div>
        <div className="heart heart-4 floating-heart" style={{"--float-duration": "9s"} as React.CSSProperties}>❤</div>
      </div>

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/40 z-20" />

      {/* Content container with staggered animations */}
      <div className="relative container mx-auto px-4 z-30">
        <div className="text-center space-y-8">
          <motion.h1 
            className="font-montserrat text-5xl md:text-7xl font-bold text-pure-white 
                     tracking-tight leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]
                     animate-fade-in-up"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {headline}
            <span className="block text-pure-white mt-2 animate-fade-in-up delay-200">Valentine's Event</span>
          </motion.h1>

          <motion.p 
            className="font-montserrat text-xl md:text-2xl text-white/90 max-w-2xl mx-auto 
                     tracking-normal leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]
                     animate-fade-in-up delay-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subheading}
          </motion.p>

          <motion.div 
            className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-in-up delay-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="btn-primary h-[48px] px-8 min-w-[200px] rounded-lg font-medium
                       transition-all duration-300 ease-out transform hover:scale-105
                       shadow-[0_4px_14px_0_rgba(0,0,0,0.25)]
                       bg-red-deep hover:bg-red-dark text-white"
            >
              Get Tickets
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              className="btn-secondary h-[48px] px-8 min-w-[200px] rounded-lg font-medium
                       transition-all duration-300 transform hover:scale-105
                       shadow-[0_4px_14px_0_rgba(0,0,0,0.25)]
                       border-white/20 hover:bg-white/10"
            >
              <Calendar className="mr-2 h-5 w-5" />
              February 14, 2024
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};