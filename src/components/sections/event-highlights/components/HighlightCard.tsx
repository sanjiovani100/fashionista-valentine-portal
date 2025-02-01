import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { EventContent } from "@/types/event.types";

interface HighlightCardProps {
  highlight: EventContent & { image: string };
  index: number;
}

const extractPublicId = (url: string) => {
  console.log('[HighlightCard] Extracting public ID from URL:', url);

  if (!url) {
    console.warn('[HighlightCard] Empty URL provided');
    return '';
  }

  // Handle full Cloudinary URLs
  if (url.includes('cloudinary.com')) {
    const matches = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
    if (matches) {
      console.log('[HighlightCard] Extracted Cloudinary ID:', matches[1]);
      return matches[1];
    }
  }

  // Handle Supabase storage URLs
  if (url.includes('supabase.co')) {
    const id = url.split('/').pop()?.split('?')[0];
    if (id) {
      console.log('[HighlightCard] Extracted Supabase ID:', id);
      return id;
    }
  }

  // If it's already a public ID or we can't parse it, return as is
  console.log('[HighlightCard] Using URL as is:', url);
  return url;
};

export const HighlightCard = ({ highlight, index }: HighlightCardProps) => {
  const springConfig = {
    type: "spring",
    stiffness: 300,
    damping: 30
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springConfig, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="relative h-full bg-black/50 border-red-800/20 backdrop-blur-sm overflow-hidden group">
        <CardHeader className="relative z-10">
          <CardTitle className="text-xl font-semibold text-white">
            {highlight.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <ul className="space-y-2">
            {highlight.features.map((feature, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <Check className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            className="mt-4 w-full border-red-500/50 text-red-500 hover:bg-red-500/10"
          >
            Learn More
          </Button>
        </CardContent>
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
          aria-hidden="true"
        />
      </Card>
    </motion.div>
  );
};