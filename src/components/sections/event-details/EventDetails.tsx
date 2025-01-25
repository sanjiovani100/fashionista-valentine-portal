import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useEventDetails } from "@/features/events/hooks/useEventDetails";
import { useInView } from "react-intersection-observer";
import './styles.css';

export const EventDetails: React.FC = () => {
  const { eventDetails } = useEventDetails();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <section className="py-20 event-details-gradient" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl md:text-5xl font-montserrat font-bold text-center text-white mb-16 fade-up ${inView ? 'in-view' : ''}`}>
          The Ultimate Fashion Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventDetails.features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className={`feature-card bg-black/40 border-blush/20 text-white fade-up event-card ${inView ? 'animate' : ''}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-6 text-center">
                <feature.icon className="feature-icon w-12 h-12 mx-auto mb-4 text-blush" />
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