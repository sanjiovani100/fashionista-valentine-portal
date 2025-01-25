import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TicketCardProps {
  title: string;
  subtitle: string;
  price: string;
  perks: string[];
  limited?: boolean;
  isSelected: boolean;
  onSelect: (title: string) => void;
}

export const TicketCard = ({
  title,
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
        className={`bg-white/5 backdrop-blur-sm border transition-all duration-300 ${
          isSelected ? "border-romantic shadow-glow" : "border-white/10 hover:border-white/20"
        }`}
        onClick={() => onSelect(title)}
      >
        <CardHeader>
          <CardTitle className="text-2xl md:text-[24px] font-playfair text-white">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-300 font-montserrat">
            {subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="text-[36px] font-bold font-montserrat text-romantic mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {price}
            <span className="text-lg text-gray-400">/person</span>
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
                <Check className="w-5 h-5 text-romantic" />
                {perk}
              </motion.li>
            ))}
          </ul>
          <p className="text-sm text-gray-400 mt-6 font-montserrat">
            Secure payment with Stripe
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full h-[48px] bg-gradient-to-r from-romantic to-passion hover:opacity-90 text-white transition-all hover:scale-[1.02] active:scale-[0.98] rounded-lg font-montserrat"
            size="lg"
          >
            Select Ticket
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};