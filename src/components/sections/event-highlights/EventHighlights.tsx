import { HighlightGrid } from "./components/HighlightGrid";
import { HighlightCarousel } from "./components/HighlightCarousel";
import type { EventContent, FashionImage } from "@/types/event.types";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';

interface EventHighlightsProps {
  highlights: (EventContent & { image: string })[];
  images: FashionImage[];
}

export const EventHighlights = ({ highlights, images }: EventHighlightsProps) => {
  const { t } = useTranslation('home');
  const ref = useRef(null);
  const inView = useInView(ref, {
    amount: 0.1,
    once: true
  });

  useEffect(() => {
    if (inView) {
      console.log('[Performance] Event Highlights section is now in view');
    }
  }, [inView]);

  return (
    <section 
      ref={ref}
      className="py-12 bg-gradient-to-br from-black to-[#2B0000] relative overflow-hidden"
      aria-labelledby="highlights-title"
    >
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute animate-float-1 top-1/4 left-1/4">❤</div>
        <div className="absolute animate-float-2 top-1/2 right-1/3">❤</div>
        <div className="absolute animate-float-3 bottom-1/4 right-1/4">❤</div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 
            id="highlights-title"
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {t('eventHighlights')}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {t('discoverMoments')}
          </p>
        </motion.div>

        <div className="mt-12">
          <HighlightGrid highlights={highlights} />
          <div className="mt-8 md:hidden">
            <HighlightCarousel highlights={highlights} />
          </div>
        </div>
      </div>
    </section>
  );
};
