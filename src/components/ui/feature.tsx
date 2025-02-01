import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface FeatureProps {
  role?: "model" | "designer" | "sponsor";
}

export function Feature({ role = "sponsor" }: FeatureProps) {
  const { t } = useTranslation(role);

  return (
    <section className="w-full py-20 lg:py-40 bg-pure-black">
      <div className="container mx-auto">
        <div className="grid border border-white/10 rounded-lg container p-8 grid-cols-1 gap-8 items-center lg:grid-cols-2">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">{t('feature.badge')}</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h2 className="text-3xl lg:text-5xl tracking-tighter max-w-xl text-left font-montserrat font-bold">
                  {t('feature.title')}
                </h2>
                <p className="text-lg leading-relaxed tracking-tight text-white/80 max-w-xl text-left font-inter">
                  {t('feature.description')}
                </p>
              </div>
            </div>
            
            <div className="grid lg:pl-6 grid-cols-1 sm:grid-cols-3 items-start lg:grid-cols-1 gap-6">
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-fashion-pink" />
                <div className="flex flex-col gap-1">
                  <p className="font-inter">{t('feature.benefits.visibility.title')}</p>
                  <p className="text-white/80 text-sm font-inter">
                    {t('feature.benefits.visibility.description')}
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-fashion-pink" />
                <div className="flex flex-col gap-1">
                  <p className="font-inter">{t('feature.benefits.networking.title')}</p>
                  <p className="text-white/80 text-sm font-inter">
                    {t('feature.benefits.networking.description')}
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-fashion-pink" />
                <div className="flex flex-col gap-1">
                  <p className="font-inter">{t('feature.benefits.placement.title')}</p>
                  <p className="text-white/80 text-sm font-inter">
                    {t('feature.benefits.placement.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
            <img
              src="/lovable-uploads/252b7b0b-6130-4274-b1dc-f368cd218a9d.png"
              alt={t('imageAlt')}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}