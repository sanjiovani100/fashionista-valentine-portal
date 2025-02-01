import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { EventTicket } from "@/types/event.types";
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('home');

  const springConfig = {
    type: "spring",
    stiffness: 300,
    damping: 30
  };

  console.log('Translation for title:', t(`tickets.${title}.title`));
  console.log('Translation for subtitle:', t(`tickets.${title}.subtitle`));
  console.log('Translation for perks:', perks.map((_, index) => t(`tickets.${title}.perks.${index}`)));
  console.log('Translation for securePayment:', t('tickets.securePayment'));

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
            {t(`tickets.${title}.title`)}
          </CardTitle>
          <CardDescription className="text-white-secondary font-montserrat">
            {t(`tickets.${title}.subtitle`)}
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
                <span>{t(`tickets.${title}.perks.${index}`)}</span>
              </motion.li>
            ))}
          </ul>
          <p className="text-sm text-white-muted mt-6 font-montserrat">
            {t('tickets.securePayment')}
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full h-[48px] bg-maroon hover:bg-maroon-light text-white transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-glow rounded-lg font-montserrat focus-visible:ring-2 focus-visible:ring-red-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            size="lg"
            aria-label={t('tickets.selectTicket', { title: t(`tickets.${title}.title`) })}
          >
            {t('tickets.selectTicketButton')}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};