import { HighlightCard } from "./HighlightCard";
import type { EventContent } from "@/types/event.types";

interface HighlightGridProps {
  highlights: (EventContent & { image: string })[];
}

export const HighlightGrid = ({ highlights }: HighlightGridProps) => {
  return (
    <div className="hidden md:grid md:grid-cols-3 gap-6">
      {highlights.map((highlight, index) => (
        <HighlightCard 
          key={highlight.id} 
          highlight={highlight}
          index={index}
        />
      ))}
    </div>
  );
};