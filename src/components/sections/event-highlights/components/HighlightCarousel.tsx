import { motion } from "framer-motion";
import { HighlightCard } from "./HighlightCard";
import type { EventContent } from "@/types/event.types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface HighlightCarouselProps {
  highlights: (EventContent & { image: string })[];
  variants?: any;
  inView?: boolean;
}

export const HighlightCarousel = ({ highlights, variants, inView }: HighlightCarouselProps) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative"
      role="region"
      aria-label="Event highlights carousel"
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {highlights.map((highlight, index) => (
            <CarouselItem key={highlight.id}>
              <HighlightCard
                highlight={highlight}
                index={index}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </motion.div>
  );
};


