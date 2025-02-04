import { EventHighlights } from "@/components/sections/event-highlights/EventHighlights";
import type { FashionImage, EventContent } from "@/types/event.types";

interface EventHighlightsSectionProps {
  highlights: (EventContent & { image: string })[];
  images: FashionImage[];
}

export const EventHighlightsSection = ({ highlights, images }: EventHighlightsSectionProps) => {
  return (
    <section className="bg-gradient-to-b from-black to-maroon/10 py-24">
      <div className="container mx-auto px-4 md:px-8">
        <EventHighlights 
          highlights={highlights}
          images={images}
        />
      </div>
    </section>
  );
};