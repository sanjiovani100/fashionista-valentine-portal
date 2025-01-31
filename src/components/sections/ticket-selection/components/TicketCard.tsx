import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { EventTicket } from "@/types/event.types";

interface TicketCardProps extends Omit<EventTicket, 'benefits'> {
  isSelected: boolean;
  onSelect: (ticketType: string) => void;
  subtitle: string;
  perks: string[];
  title: string;
  tabIndex?: number;
}

export const TicketCard = ({
  title,
  subtitle,
  price,
  perks,
  isSelected,
  onSelect,
  tabIndex = 0,
}: TicketCardProps) => {
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
            : "border-white/10 hover:border-white/20 hover:bg-card-hover"
        }`}
        onClick={() => onSelect(title)}
        tabIndex={tabIndex}
        role="button"
        aria-pressed={isSelected}
      >
        <CardHeader>
          <CardTitle className="text-2xl md:text-[24px] font-poppins text-white">
            {title}
          </CardTitle>
          <CardDescription className="text-white-secondary font-montserrat">
            {subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="text-[36px] font-bold font-montserrat text-red-accent mb-8 flex items-baseline gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            ${price}
            <span className="text-lg text-white-muted">/person</span>
          </motion.div>
          <ul className="space-y-4" role="list">
            {perks.map((perk, index) => (
              <motion.li
                key={perk}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="flex items-center gap-3 text-white-secondary font-montserrat"
              >
                <Check className="w-5 h-5 text-red-accent shrink-0" />
                <span>{perk}</span>
              </motion.li>
            ))}
          </ul>
          <p className="text-sm text-white-muted mt-6 font-montserrat">
            Secure payment with Stripe
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full h-[48px] bg-maroon hover:bg-maroon-light text-white transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-glow rounded-lg font-montserrat focus-visible:ring-2 focus-visible:ring-red-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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