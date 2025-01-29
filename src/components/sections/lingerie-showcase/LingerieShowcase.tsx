import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { OptimizedImage } from "@/components/cloudinary";
import type { FashionCollection } from "@/types/event.types";
import './styles.css';

interface LingerieShowcaseProps {
  collections: (FashionCollection & { image?: string })[];
}

export const LingerieShowcase = ({ collections }: LingerieShowcaseProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
        parallaxRef.current.style.setProperty('--scroll-offset', `${rate}px`);
      }
    };

    // Only add scroll listener if user prefers motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section 
      className="relative pt-16 pb-8 bg-black min-h-screen showcase-section" 
      ref={ref}
      aria-labelledby="showcase-title"
    >
      <div 
        className="showcase-pattern" 
        aria-hidden="true"
      />
      <div 
        className="parallax-bg" 
        ref={parallaxRef}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative">
        <h2 
          id="showcase-title"
          className={`text-3xl md:text-4xl font-bold font-montserrat text-white text-center mb-12 
            transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Luxury Lingerie Showcase
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <Card 
              key={collection.id}
              className="bg-black border-gray-800 overflow-hidden transform transition-all duration-300 hover:scale-105"
              tabIndex={0}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] overflow-hidden">
                  {collection.image ? (
                    <OptimizedImage
                      publicId={collection.image}
                      alt={`${collection.collection_name} collection preview`}
                      aspectRatio="portrait"
                      className="showcase-image object-cover w-full h-full"
                      priority={index < 3}
                      loading={index < 3 ? "eager" : "lazy"}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-400">Image coming soon</span>
                    </div>
                  )}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="showcase-content absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-montserrat font-bold mb-2">
                      {collection.collection_name}
                    </h3>
                    <p className="text-sm font-inter text-gray-300 mb-4">
                      {collection.description}
                    </p>
                    <Button 
                      className="w-full bg-fashion-pink hover:bg-fashion-pink/90 text-white 
                               transition-all duration-300 hover:shadow-glow focus:ring-2 
                               focus:ring-fashion-pink focus:ring-offset-2 focus:ring-offset-black
                               focus:outline-none"
                      aria-label={`Explore ${collection.collection_name} collection`}
                    >
                      Explore Collection
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};