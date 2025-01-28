import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { EventTicket } from "@/types/event.types";

interface TicketCardProps extends EventTicket {
  isSelected: boolean;
  onSelect: (ticketType: string) => void;
  subtitle: string;
  perks: string[];
}

export const TicketCard = ({
  ticket_type,
  subtitle,
  price,
  perks,
  isSelected,
  onSelect,
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
    >
      <Card
        className={`bg-gray-500/5 backdrop-blur-sm border transition-all duration-300 ${
          isSelected ? "border-red-deep shadow-glow" : "border-white/10 hover:border-white/20"
        }`}
        onClick={() => onSelect(ticket_type)}
      >
        <CardHeader>
          <CardTitle className="text-2xl md:text-[24px] font-poppins text-pure-white">
            {ticket_type}
          </CardTitle>
          <CardDescription className="text-gray-300 font-montserrat">
            {subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="text-[36px] font-bold font-montserrat text-red-soft mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            ${price}
            <span className="text-lg text-gray-300">/person</span>
          </motion.div>
          <ul className="space-y-4">
            {perks.map((perk, index) => (
              <motion.li
                key={perk}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="flex items-center gap-3 text-gray-300 font-montserrat"
              >
                <Check className="w-5 h-5 text-red-soft" />
                {perk}
              </motion.li>
            ))}
          </ul>
          <p className="text-sm text-gray-300 mt-6 font-montserrat">
            Secure payment with Stripe
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full h-[48px] bg-gradient-to-r from-red-deep to-red-dark hover:opacity-90 text-pure-white transition-all hover:scale-[1.02] active:scale-[0.98] rounded-lg font-montserrat"
            size="lg"
          >
            Select Ticket
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};