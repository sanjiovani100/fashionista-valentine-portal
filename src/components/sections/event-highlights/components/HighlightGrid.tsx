import { motion } from "framer-motion";
import { HighlightCard } from "./HighlightCard";
import type { EventContent } from "@/types/event.types";

interface HighlightGridProps {
  highlights: (EventContent & { image: string })[];
  variants?: any;
  inView?: boolean;
}

export const HighlightGrid = ({ highlights, variants, inView }: HighlightGridProps) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      role="list"
      aria-label="Event highlights grid"
    >
      {highlights.map((highlight, index) => (
        <HighlightCard
          key={highlight.id}
          highlight={highlight}
          index={index}
        />
      ))}
    </motion.div>
  );
};


