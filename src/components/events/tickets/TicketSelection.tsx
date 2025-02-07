import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Grid, GridItem } from '@/components/layout/Grid';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Timer, 
  Users, 
  CreditCard, 
  Gift, 
  Star, 
  Clock,
  HelpCircle
} from 'lucide-react';
import type { EventDetails, TicketTier } from '@/types/event';

interface TicketSelectionProps {
  event: EventDetails;
}

export const TicketSelection = ({ event }: TicketSelectionProps) => {
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // Calculate time remaining for early bird pricing
  const getEarlyBirdTimeRemaining = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate.getTime() - now.getTime();
    
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return { days, hours };
  };

  // Calculate group discount if applicable
  const calculateGroupPrice = (ticket: TicketTier, qty: number) => {
    if (!ticket.group_discount_threshold || !ticket.group_discount_percentage) {
      return ticket.price * qty;
    }

    if (qty >= ticket.group_discount_threshold) {
      const discount = ticket.price * (ticket.group_discount_percentage / 100);
      return (ticket.price - discount) * qty;
    }

    return ticket.price * qty;
  };

  // Check if early bird pricing is available
  const isEarlyBird = (ticket: TicketTier) => {
    return ticket.early_bird_deadline && 
           new Date(ticket.early_bird_deadline) > new Date() &&
           ticket.early_bird_price;
  };

  return (
    <Section
      variant="highlight"
      spacing="wide"
      className="bg-gradient-to-b from-black/40 to-black/20"
    >
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-fashion-pink font-montserrat">
            Choose Your Experience
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter">
            Select from our carefully curated ticket packages for an unforgettable fashion experience
          </p>
        </div>

        {/* Ticket Tiers Grid */}
        <Grid columns={{ mobile: 1, tablet: 2, desktop: 3 }} gap={{ desktop: 8 }}>
          {event.tickets.map((ticket) => {
            const earlyBirdTime = ticket.early_bird_deadline ? 
              getEarlyBirdTimeRemaining(ticket.early_bird_deadline) : null;

            return (
              <GridItem key={ticket.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-black/20 border-white/10 overflow-hidden">
                    {/* Ticket Header */}
                    <div className="p-6 bg-black/40 border-b border-white/10 space-y-4">
                      {isEarlyBird(ticket) && (
                        <Badge className="bg-fashion-pink text-white">
                          Early Bird Offer
                        </Badge>
                      )}
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">
                          {ticket.ticket_type}
                        </h3>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-fashion-pink">
                            ${isEarlyBird(ticket) ? ticket.early_bird_price : ticket.price}
                          </span>
                          {isEarlyBird(ticket) && (
                            <span className="text-lg text-white/60 line-through">
                              ${ticket.price}
                            </span>
                          )}
                        </div>
                        {earlyBirdTime && (
                          <div className="flex items-center gap-2 text-white/60">
                            <Timer className="w-4 h-4" />
                            <span>
                              Ends in {earlyBirdTime.days}d {earlyBirdTime.hours}h
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Benefits List */}
                    <div className="p-6 space-y-6">
                      <ul className="space-y-3">
                        {ticket.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Star className="w-5 h-5 text-fashion-pink shrink-0 mt-0.5" />
                            <span className="text-white/70">{benefit}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Group Discount */}
                      {ticket.group_discount_threshold && (
                        <div className="bg-fashion-pink/10 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-fashion-pink">
                            <Users className="w-5 h-5" />
                            <span className="font-semibold">Group Discount</span>
                          </div>
                          <p className="text-white/70 mt-1">
                            Book {ticket.group_discount_threshold}+ tickets and save {ticket.group_discount_percentage}%
                          </p>
                        </div>
                      )}

                      {/* Availability */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Availability</span>
                          <span className="text-white">
                            {ticket.quantity_available} remaining
                          </span>
                        </div>
                        <div className="w-full bg-black/40 rounded-full h-2">
                          <div 
                            className="bg-fashion-pink h-full rounded-full"
                            style={{ 
                              width: `${Math.min(100, (ticket.quantity_available / 100) * 100)}%` 
                            }}
                          />
                        </div>
                      </div>

                      {/* Purchase Button */}
                      <Button
                        className="w-full bg-fashion-pink hover:bg-fashion-pink/90"
                        onClick={() => {
                          setSelectedTier(ticket);
                          setShowPurchaseModal(true);
                        }}
                      >
                        Select Package
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </GridItem>
            );
          })}
        </Grid>

        {/* Purchase Modal */}
        <Dialog open={showPurchaseModal} onOpenChange={setShowPurchaseModal}>
          <DialogContent className="bg-black/95 border-white/10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                Complete Your Purchase
              </DialogTitle>
            </DialogHeader>
            
            {selectedTier && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">
                    {selectedTier.ticket_type}
                  </h4>
                  
                  {/* Quantity Selection */}
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      className="text-white"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="text-xl text-white">{quantity}</span>
                    <Button
                      variant="outline"
                      className="text-white"
                      onClick={() => setQuantity(Math.min(selectedTier.quantity_available, quantity + 1))}
                    >
                      +
                    </Button>
                  </div>

                  {/* Price Breakdown */}
                  <Card className="bg-black/40 border-white/10 p-4 space-y-2">
                    <div className="flex justify-between text-white/70">
                      <span>Base Price</span>
                      <span>${selectedTier.price} × {quantity}</span>
                    </div>
                    {quantity >= (selectedTier.group_discount_threshold || Infinity) && (
                      <div className="flex justify-between text-fashion-pink">
                        <span>Group Discount</span>
                        <span>-{selectedTier.group_discount_percentage}%</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/10">
                      <span>Total</span>
                      <span>${calculateGroupPrice(selectedTier, quantity)}</span>
                    </div>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    className="flex-1 bg-fashion-pink hover:bg-fashion-pink/90"
                    onClick={() => {
                      // Handle purchase
                      setShowPurchaseModal(false);
                    }}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Purchase Now
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-fashion-pink text-fashion-pink hover:bg-fashion-pink hover:text-white"
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Gift Tickets
                  </Button>
                </div>

                {/* Terms and Support */}
                <div className="text-sm text-white/60 space-y-2">
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Tickets will be held for 10 minutes
                  </p>
                  <p className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    Need help? Contact support
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Section>
  );
}; 