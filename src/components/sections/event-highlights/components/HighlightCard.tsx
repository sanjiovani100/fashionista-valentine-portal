import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/cloudinary";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
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
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  useEffect(() => {
    console.log(`[HighlightCard] Initializing card for: ${highlight.title}`, {
      image: highlight.image,
      contentType: highlight.content_type,
      mediaUrls: highlight.media_urls
    });
  }, [highlight]);

  const handleImageLoad = useCallback(() => {
    console.info(`[HighlightCard] Successfully loaded image for ${highlight.title}`);
    setIsLoading(false);
    setHasError(false);
  }, [highlight.title]);

  const handleImageError = useCallback(() => {
    console.error(`[HighlightCard] Failed to load image for ${highlight.title}`, {
      attempt: retryCount + 1,
      maxRetries,
      imageUrl: highlight.image
    });
    
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      return;
    }

    setHasError(true);
    setIsLoading(false);
    toast.error(`Failed to load image for ${highlight.title}`, {
      description: "Please try refreshing the page"
    });
  }, [highlight.title, highlight.image, retryCount, maxRetries]);

  // Early return for loading state
  if (isLoading && !hasError) {
    return (
      <div 
        role="status" 
        aria-label="Loading highlight card"
        className="animate-pulse"
      >
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
      className="h-full"
    >
      <Card className="bg-black/60 border-none text-white h-full hover:scale-105 transition-transform duration-300 group">
        <div className="relative h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden rounded-t-lg">
          <OptimizedImage
            publicId={highlight.image}
            alt={highlight.title}
            aspectRatio="portrait"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            priority={index === 0}
            onLoadingComplete={handleImageLoad}
            onError={handleImageError}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" 
            aria-hidden="true"
          />
        </div>
        <CardHeader>
          <CardTitle className="font-playfair text-xl md:text-2xl lg:text-3xl">
            {highlight.title}
          </CardTitle>
          <CardDescription className="text-gray-300 font-montserrat text-sm md:text-base">
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