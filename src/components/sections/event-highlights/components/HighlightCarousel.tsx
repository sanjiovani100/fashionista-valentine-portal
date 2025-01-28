import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { HighlightCard } from "./HighlightCard";
import type { EventContent } from "@/types/event.types";

interface HighlightCarouselProps {
  highlights: (EventContent & { image: string })[];
}

export const HighlightCarousel = ({ highlights }: HighlightCarouselProps) => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {highlights.map((highlight, index) => (
          <CarouselItem key={highlight.id}>
            <HighlightCard highlight={highlight} index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-white border-white" />
      <CarouselNext className="text-white border-white" />
    </Carousel>
  );
};