import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import './styles.css';
import type { EventContent } from "@/types/event.types";

interface EventDetailsProps {
  features: EventContent[];
}

export const EventDetails = ({ features }: EventDetailsProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useEffect(() => {
    // Create floating particles
    const section = document.querySelector('.event-details-gradient');
    if (section) {
      for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.innerHTML = '❤';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        section.appendChild(particle);
      }
    }
  }, []);

  return (
    <section className="py-20 event-details-gradient" ref={ref}>
      <div className="gradient-bg" />
      <div className="container mx-auto px-4 relative">
        <h2 className={`text-4xl md:text-5xl font-montserrat font-bold text-center text-white mb-16 transition-all duration-700 transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          The Ultimate Fashion Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className={`feature-card bg-black/40 border-fashion-pink/20 text-white`}
              style={{ 
                transitionDelay: `${index * 200}ms`,
              }}
            >
              <CardContent className="p-6 text-center">
                <feature.icon className="feature-icon w-12 h-12 mx-auto mb-4 text-fashion-pink" />
                <h3 className="font-montserrat text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="font-inter text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
