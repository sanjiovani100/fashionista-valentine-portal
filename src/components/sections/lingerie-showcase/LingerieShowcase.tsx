import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { OptimizedImage } from "@/components/cloudinary";
import type { FashionCollection } from "@/types/event.types";
import { motion } from "framer-motion";
import { toast } from "sonner";
import './styles.css';

interface LingerieShowcaseProps {
  collections: (FashionCollection & { 
    image: string;
    isLoading?: boolean;
    error?: Error;
  })[];
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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section 
      className="relative pt-12 pb-0 bg-gradient-to-b from-black to-maroon showcase-section" 
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

      <div className="container mx-auto px-4">
        <motion.h2 
          id="showcase-title"
          className="text-3xl md:text-4xl font-bold font-montserrat text-white text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Luxury Lingerie Showcase
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              variants={itemVariants}
              className="group"
            >
              <Card 
                className="bg-black/30 backdrop-blur-sm border-white/10 overflow-hidden 
                         transform transition-all duration-500 hover:scale-[1.02]
                         hover:border-white/20 hover:shadow-glow"
                tabIndex={0}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <OptimizedImage
                      publicId={collection.image}
                      alt={`${collection.collection_name} collection preview`}
                      aspectRatio="portrait"
                      className="showcase-image object-cover w-full h-full 
                               transition-transform duration-500 group-hover:scale-110"
                      priority={index < 3}
                      onError={() => {
                        toast.error(`Failed to load image for ${collection.collection_name}`);
                      }}
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent
                               transition-opacity duration-500 group-hover:opacity-90"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-all duration-500">
                      <h3 className="text-xl font-montserrat font-bold mb-2 text-white">
                        {collection.collection_name}
                      </h3>
                      <p className="text-sm font-inter text-white-secondary mb-4 line-clamp-2">
                        {collection.description}
                      </p>
                      <Button 
                        className="w-full bg-red-accent hover:bg-red-accent/90 text-white
                                 transition-all duration-300 transform hover:scale-105
                                 focus:ring-2 focus:ring-red-accent focus:ring-offset-2 
                                 focus:ring-offset-black focus:outline-none"
                        aria-label={`Explore ${collection.collection_name} collection`}
                      >
                        Explore Collection
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};