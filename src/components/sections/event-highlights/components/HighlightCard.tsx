import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/cloudinary";
import { toast } from "sonner";
import type { EventContent } from "@/types/event.types";

interface HighlightCardProps {
  highlight: EventContent & { image: string };
  index: number;
}

export const HighlightCard = ({ highlight, index }: HighlightCardProps) => {
  console.log(`Rendering highlight card ${index}:`, {
    title: highlight.title,
    image: highlight.image
  });

  return (
    <Card className="bg-black/60 border-none text-white hover:scale-105 transition-transform duration-300 group">
      <div className="relative h-[300px] overflow-hidden rounded-t-lg">
        <OptimizedImage
          publicId={highlight.image}
          alt={highlight.title}
          aspectRatio="portrait"
          className="w-full h-full transition-transform duration-300 group-hover:scale-110"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
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
        >
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
};