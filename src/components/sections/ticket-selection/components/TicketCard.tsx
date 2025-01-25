import { Check } from "lucide-react";
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
}: TicketCardProps) => (
  <Card
    className={`bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-glow ${
      isSelected ? "border-romantic" : "hover:border-white/20"
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
      <div className="text-[36px] font-bold font-montserrat text-romantic mb-8">
        {price}
        <span className="text-lg text-gray-400">/person</span>
      </div>
      <ul className="space-y-4">
        {perks.map((perk) => (
          <li key={perk} className="flex items-center gap-3 text-gray-300 font-montserrat">
            <Check className="w-5 h-5 text-romantic" />
            {perk}
          </li>
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
);