import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { EventContent } from "@/types/event.types";
import { OptimizedImage } from "@/components/cloudinary/components/CloudinaryImage";

interface HighlightCardProps {
  highlight: EventContent & { image: string };
  index: number;
}

const extractPublicId = (url: string) => {
  if (!url) return '';
  
  if (url.includes('cloudinary.com')) {
    const matches = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
    return matches ? matches[1] : url;
  }
  
  if (url.includes('supabase.co')) {
    const id = url.split('/').pop()?.split('?')[0];
    return id || url;
  }
  
  return url;
};

export const HighlightCard = ({ highlight, index }: HighlightCardProps) => {
  const springConfig = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 0.8
  };

  // Convert content string to array of features
  const features = highlight.content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={springConfig}
      className="h-full"
    >
      <Card
        className="relative h-full bg-black/30 backdrop-blur-lg border transition-all duration-300 
                 will-change-transform border-white/10 hover:border-white/20 hover:bg-white/5
                 shadow-lg hover:shadow-xl"
        role="article"
        tabIndex={0}
      >
        <CardHeader className="space-y-3 p-6">
          <CardTitle className="text-2xl md:text-3xl font-playfair text-white">
            {highlight.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <motion.div 
            className="mb-8 overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <OptimizedImage 
              publicId={extractPublicId(highlight.image)}
              alt={`${highlight.title} preview`}
              className="w-full h-48 object-cover transform transition-transform duration-700 
                       hover:scale-110"
              aspectRatio="landscape"
              priority={index === 0}
            />
          </motion.div>
          <ul className="space-y-4 mb-8" role="list">
            {features.map((feature, idx) => (
              <motion.li
                key={`${highlight.id}-feature-${idx}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (idx + 1) }}
                className="flex items-start gap-3 text-white/80 font-montserrat text-base leading-relaxed"
              >
                <Check 
                  className="w-5 h-5 text-red-500 shrink-0 mt-1" 
                  aria-hidden="true"
                />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
          <Button
            className="w-full h-12 bg-white text-black hover:bg-white/90 
                     transition-all hover:scale-[1.02] active:scale-[0.98] 
                     rounded-lg font-poppins text-base font-medium
                     focus-visible:ring-2 focus-visible:ring-white 
                     focus-visible:ring-offset-2 focus-visible:ring-offset-black
                     shadow-md hover:shadow-lg"
            size="lg"
            aria-label={`Learn more about ${highlight.title}`}
          >
            Learn More
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};


