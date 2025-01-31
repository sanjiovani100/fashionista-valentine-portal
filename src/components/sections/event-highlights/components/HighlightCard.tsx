import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { EventTicket } from "@/types/event.types";

interface HighlightCardProps extends Omit<EventTicket, 'benefits'> {
  isSelected: boolean;
  onSelect: (ticketType: string) => void;
  subtitle: string;
  perks: string[];
  title: string;
  tabIndex?: number;
}

export const HighlightCard = ({
  title,
  subtitle,
  price,
  perks,
  isSelected,
  onSelect,
  tabIndex = 0,
}: HighlightCardProps) => {
  const springConfig = {
    type: "spring",
    stiffness: 300,
    damping: 30
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={springConfig}
      className="h-full"
    >
      <Card
        className={`relative h-full bg-black/30 backdrop-blur-sm border transition-all duration-300 will-change-transform ${
          isSelected 
            ? "border-red-accent shadow-glow" 
            : "border-white/10 hover:border-white/20 hover:bg-white/5"
        }`}
        onClick={() => onSelect(title)}
        tabIndex={tabIndex}
        role="button"
        aria-pressed={isSelected}
      >
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl md:text-3xl font-poppins text-white">
            {title}
          </CardTitle>
          <CardDescription className="text-white/80 font-montserrat text-base">
            {subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="text-4xl font-bold font-montserrat text-red-accent mb-8 flex items-baseline gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            ${price}
            <span className="text-lg text-white/60">/person</span>
          </motion.div>
          <ul className="space-y-4" role="list">
            {perks.map((perk, index) => (
              <motion.li
                key={perk}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="flex items-center gap-3 text-white/80 font-montserrat"
              >
                <Check className="w-5 h-5 text-red-accent shrink-0" aria-hidden="true" />
                <span>{perk}</span>
              </motion.li>
            ))}
          </ul>
          <p className="text-sm text-white/60 mt-6 font-montserrat">
            Secure payment with Stripe
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full h-12 bg-gradient-to-r from-red-accent to-red-accent/80 
                     hover:opacity-90 text-white transition-all hover:scale-[1.02] 
                     active:scale-[0.98] rounded-lg font-montserrat
                     focus-visible:ring-2 focus-visible:ring-red-accent 
                     focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            size="lg"
            aria-label={`Select ${title} ticket`}
          >
            Select Ticket
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};