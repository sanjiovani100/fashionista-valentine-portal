import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/cloudinary";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useState } from "react";
import { CardSkeleton } from "@/components/ui/loading-skeleton/CardSkeleton";
import type { EventContent } from "@/types/event.types";

interface HighlightCardProps {
  highlight: EventContent & { 
    image: string;
    isLoading?: boolean;
    error?: Error;
  };
  index: number;
}

export const HighlightCard = ({ highlight, index }: HighlightCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Early return for loading state
  if (isLoading && !hasError) {
    return (
      <div role="status" aria-label="Loading highlight card">
        <CardSkeleton />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      role="article"
      aria-label={`Event highlight: ${highlight.title}`}
    >
      <Card className="bg-black/60 border-none text-white hover:scale-105 transition-transform duration-300 group">
        <div className="relative h-[300px] overflow-hidden rounded-t-lg">
          <OptimizedImage
            publicId={highlight.image}
            alt={highlight.title}
            aspectRatio="portrait"
            className="w-full h-full transition-transform duration-300 group-hover:scale-110"
            priority={index === 0}
            onLoadingComplete={() => {
              setIsLoading(false);
              setHasError(false);
              console.log(`[Image] Successfully loaded image for ${highlight.title}`);
            }}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
              toast.error(`Failed to load image for ${highlight.title}`);
              console.error(`[Image] Failed to load image for ${highlight.title}`);
            }}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" 
            aria-hidden="true"
          />
        </div>
        <CardHeader>
          <CardTitle className="font-playfair text-2xl">{highlight.title}</CardTitle>
          <CardDescription className="text-gray-300 font-montserrat">
            {highlight.content}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button 
            className="w-full bg-red-deep hover:bg-red-dark text-white transition-colors"
            onClick={() => toast.success(`Learn more about ${highlight.title}`)}
            aria-label={`Learn more about ${highlight.title}`}
          >
            Learn More
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};