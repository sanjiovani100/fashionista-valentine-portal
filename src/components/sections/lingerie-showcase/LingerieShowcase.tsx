import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { CoreImage } from "@/components/ui/core-image";
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative py-16 bg-black min-h-screen showcase-section" ref={ref}>
      <div className="showcase-pattern" />
      <div className="parallax-bg" ref={parallaxRef} />

      <div className="container mx-auto px-4 relative">
        <h2 className={`text-3xl md:text-4xl font-bold font-montserrat text-white text-center mb-12 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Luxury Lingerie Showcase
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Card key={collection.id} className="bg-black border-gray-800 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <CoreImage
                    src={collection.image || '/placeholder.svg'}
                    alt={collection.collection_name}
                    aspectRatio="portrait"
                    className="showcase-image object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="showcase-content absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-montserrat font-bold mb-2">{collection.collection_name}</h3>
                    <p className="text-sm font-inter text-gray-300 mb-4">{collection.description}</p>
                    <Button 
                      className="w-full bg-fashion-pink hover:bg-fashion-pink/90 text-white transition-all duration-300 hover:shadow-glow"
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