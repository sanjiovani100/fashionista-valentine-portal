import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { EventContent } from "@/types/event.types";

interface HighlightCardProps {
  highlight: EventContent & { image: string };
  index: number;
}

export const HighlightCard = ({ highlight, index }: HighlightCardProps) => {
  const springConfig = {
    type: "spring",
    stiffness: 300,
    damping: 30
  };

  // Get card title based on index
  const getCardTitle = (index: number) => {
    switch (index) {
      case 0:
        return "Fashion Show";
      case 1:
        return "Valentine's Party";
      case 2:
        return "VIP Experience";
      default:
        return `Event ${index + 1}`;
    }
  };

  // Remove "highlight" word and split content into perks
  const perks = highlight.content
    .replace(/highlight/gi, '')
    .replace(/highlights/gi, '')
    .split('\n')
    .map(perk => perk.trim())
    .filter(perk => perk.length > 0);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={springConfig}
      className="h-full"
    >
      <Card
        className="relative h-full bg-black/30 backdrop-blur-sm border transition-all duration-300 will-change-transform border-white/10 hover:border-white/20 hover:bg-white/5"
        role="article"
        tabIndex={0}
      >
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl md:text-3xl font-poppins text-white">
            {getCardTitle(index)}
          </CardTitle>
          <p className="text-white/80 font-montserrat text-base">
            {highlight.content_type}
          </p>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img 
              src={highlight.image} 
              alt={`${getCardTitle(index)} preview`}
              className="w-full h-48 object-cover rounded-lg"
              loading="lazy"
            />
          </motion.div>
          <ul className="space-y-4" role="list">
            {perks.map((perk, idx) => (
              <motion.li
                key={`${highlight.id}-perk-${idx}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (idx + 1) }}
                className="flex items-center gap-3 text-white/80 font-montserrat"
              >
                <Check className="w-5 h-5 text-red-accent shrink-0" aria-hidden="true" />
                <span>{perk}</span>
              </motion.li>
            ))}
          </ul>
          <Button
            className="w-full h-12 mt-6 bg-white text-black hover:bg-white/90 
                     transition-all hover:scale-[1.02] active:scale-[0.98] 
                     rounded-lg font-montserrat
                     focus-visible:ring-2 focus-visible:ring-white 
                     focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            size="lg"
            aria-label={`Learn more about ${getCardTitle(index)}`}
          >
            Learn More
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};