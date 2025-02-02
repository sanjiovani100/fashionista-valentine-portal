import React from 'react';
import { Card } from "@/components/ui/card";
import { Wine, Music, Sun, Flame, Users, MapPin, Clock } from "lucide-react";
import type { Json } from '@/types/database';

interface BeachPartyProps {
  details: Json | null;
}

export const BeachParty = ({ details }: BeachPartyProps) => {
  if (!details) return null;

  const featureIcons = {
    "Tropical Welcome Drinks": Wine,
    "Live DJ Sets": Music,
    "Fire Dancer Performances": Flame,
    "Beach Lounge Areas": Users,
    "Sunset Photography Sessions": Sun,
  };

  const {
    location,
    time,
    dress_code,
    features = []
  } = details as {
    location: string;
    time: string;
    dress_code?: string;
    features: string[];
  };

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 animate-fade-in">
          Beach Party Experience
        </h2>
        
        <Card className="bg-black/40 backdrop-blur-md border-white/10 p-6 md:p-8 rounded-xl">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Location and Time */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-lg">
                <MapPin className="h-5 w-5 text-red-primary" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-3 text-lg">
                <Clock className="h-5 w-5 text-red-primary" />
                <span>{time}</span>
              </div>
              {dress_code && (
                <div className="mt-4 p-4 bg-white/5 rounded-lg">
                  <p className="text-sm uppercase tracking-wider text-gray-300">Dress Code</p>
                  <p className="text-lg font-semibold">{dress_code}</p>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Highlights</h3>
              <div className="grid gap-4">
                {features.map((feature, index) => {
                  const Icon = featureIcons[feature as keyof typeof featureIcons] || Sun;
                  return (
                    <div 
                      key={feature}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg transition-all hover:bg-white/10"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <Icon className="h-5 w-5 text-red-primary" />
                      <span>{feature}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};