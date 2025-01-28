import { HighlightGrid } from "./components/HighlightGrid";
import { HighlightCarousel } from "./components/HighlightCarousel";
import type { EventContent, FashionImage } from "@/types/event.types";

interface EventHighlightsProps {
  highlights: (EventContent & { image: string })[];
  images: FashionImage[];
}

export const EventHighlights = ({ highlights, images }: EventHighlightsProps) => {
  console.log("EventHighlights received props:", { 
    highlights: highlights.map(h => ({
      title: h.title,
      image: h.image,
      mediaUrls: h.media_urls
    })),
    imagesCount: images.length 
  });

  return (
    <section className="py-20 bg-gradient-to-br from-black to-[#2B0000] relative overflow-hidden">
      {/* Floating hearts background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute animate-float-1 top-1/4 left-1/4">❤</div>
        <div className="absolute animate-float-2 top-1/2 right-1/3">❤</div>
        <div className="absolute animate-float-3 bottom-1/4 right-1/4">❤</div>
      </div>

      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-playfair text-white text-center mb-12 animate-fade-in">
          Event Highlights
        </h2>

        {/* Desktop view */}
        <HighlightGrid highlights={highlights} />

        {/* Mobile view with carousel */}
        <div className="md:hidden">
          <HighlightCarousel highlights={highlights} />
        </div>
      </div>
    </section>
  );
};