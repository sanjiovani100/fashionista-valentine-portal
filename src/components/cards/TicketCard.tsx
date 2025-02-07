import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface TicketCardProps {
  type: string;
  price: number;
  features: string[];
  benefits: string[];
  isEarlyBird?: boolean;
  earlyBirdPrice?: number;
  earlyBirdDeadline?: string;
  groupDiscount?: {
    threshold: number;
    percentage: number;
  };
  onBook: () => void;
}

export const TicketCard = ({
  type,
  price,
  features,
  benefits,
  isEarlyBird,
  earlyBirdPrice,
  earlyBirdDeadline,
  groupDiscount,
  onBook
}: TicketCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="
        w-full
        lg:w-[380px]
        md:w-[320px]
        bg-black/20 border-white/10 hover:border-white/20
        overflow-hidden
      ">
        {/* Price Header */}
        <CardHeader className="space-y-4 p-6 bg-black/40">
          <h3 className="text-2xl font-bold text-white">{type}</h3>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-fashion-pink">
              ${isEarlyBird && earlyBirdPrice ? earlyBirdPrice : price}
            </p>
            {isEarlyBird && earlyBirdDeadline && (
              <p className="text-sm text-white/60">
                Early bird price until {new Date(earlyBirdDeadline).toLocaleDateString()}
              </p>
            )}
          </div>
        </CardHeader>

        {/* Features List */}
        <CardContent className="p-6 space-y-6">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-white/80">
                <Check className="w-5 h-5 text-fashion-pink" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-black/20 p-3 rounded-lg">
                <p className="text-sm text-white/70">{benefit}</p>
              </div>
            ))}
          </div>

          {/* Group Discount */}
          {groupDiscount && (
            <div className="bg-fashion-pink/10 p-4 rounded-lg">
              <p className="text-sm text-white/90">
                Book {groupDiscount.threshold}+ tickets and save {groupDiscount.percentage}%
              </p>
            </div>
          )}
        </CardContent>

        {/* Booking CTA */}
        <CardFooter className="p-6 pt-0">
          <Button 
            onClick={onBook}
            className="w-full bg-fashion-pink hover:bg-fashion-pink/90"
          >
            Book Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}; 