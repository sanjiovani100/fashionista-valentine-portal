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
    const titles = [
      "Fashion Show",
      "Valentine's Party",
      "VIP Experience"
    ];
    return titles[index] || `Event ${index + 1}`;
  };

  // Clean content by removing highlight words and formatting
  const cleanContent = (content: string) => {
    console.log('[Content Cleaning] Original content:', content);
    
    const cleaned = content
      .replace(/highlight(s)?/gi, '') // Remove highlight/highlights
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        // Remove any remaining instances of the word
        const cleanedLine = line
          .replace(/^\s*[-•]\s*/, '') // Remove bullet points
          .replace(/\s+/g, ' ') // Replace multiple spaces with single space
          .trim();
        return cleanedLine.charAt(0).toUpperCase() + cleanedLine.slice(1); // Capitalize first letter
      })
      .filter(line => line.length > 0);

    console.log('[Content Cleaning] Cleaned content:', cleaned);
    return cleaned;
  };

  // Process the perks from the content
  const perks = cleanContent(highlight.content);

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