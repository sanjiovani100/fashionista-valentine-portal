import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Grid, GridItem } from '@/components/layout/Grid';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Ticket,
  CreditCard,
  Users,
  Clock,
  ChevronRight,
  ChevronLeft,
  Star,
  Gift,
  Calendar,
  Check,
} from 'lucide-react';
import type { EventDetails, TicketTier } from '@/types/event';

interface RegistrationCheckoutProps {
  event: EventDetails;
}

type Step = 'tickets' | 'details' | 'payment' | 'confirmation';

interface TicketSelection {
  tierId: string;
  quantity: number;
}

interface AttendeeDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const RegistrationCheckout = ({ event }: RegistrationCheckoutProps) => {
  const [currentStep, setCurrentStep] = useState<Step>('tickets');
  const [selectedTickets, setSelectedTickets] = useState<TicketSelection[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [attendeeDetails, setAttendeeDetails] = useState<AttendeeDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  // Calculate totals
  const totals = useMemo(() => {
    let subtotal = 0;
    let discount = 0;

    selectedTickets.forEach(selection => {
      const ticket = event.tickets.find(t => t.id === selection.tierId);
      if (ticket) {
        const basePrice = ticket.price;
        const quantity = selection.quantity;

        // Apply early bird discount if applicable
        if (ticket.early_bird_deadline && ticket.early_bird_price) {
          const deadline = new Date(ticket.early_bird_deadline);
          if (new Date() < deadline) {
            subtotal += ticket.early_bird_price * quantity;
            discount += (basePrice - ticket.early_bird_price) * quantity;
          } else {
            subtotal += basePrice * quantity;
          }
        } else {
          subtotal += basePrice * quantity;
        }

        // Apply group discount if applicable
        if (
          ticket.group_discount_threshold &&
          ticket.group_discount_percentage &&
          quantity >= ticket.group_discount_threshold
        ) {
          const groupDiscount =
            (subtotal * ticket.group_discount_percentage) / 100;
          discount += groupDiscount;
        }
      }
    });

    return {
      subtotal,
      discount,
      total: subtotal - discount,
    };
  }, [selectedTickets, event.tickets]);

  // Handle ticket quantity change
  const handleQuantityChange = (tierId: string, quantity: number) => {
    setSelectedTickets(prev => {
      const existing = prev.find(t => t.tierId === tierId);
      if (existing) {
        if (quantity === 0) {
          return prev.filter(t => t.tierId !== tierId);
        }
        return prev.map(t =>
          t.tierId === tierId ? { ...t, quantity } : t
        );
      }
      return [...prev, { tierId, quantity }];
    });
  };

  // Navigation handlers
  const handleNext = () => {
    const steps: Step[] = ['tickets', 'details', 'payment', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: Step[] = ['tickets', 'details', 'payment', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  return (
    <Section
      variant="alternate"
      spacing="wide"
      className="bg-gradient-to-b from-black/40 to-black/20"
    >
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-fashion-pink font-montserrat">
            Event Registration
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter">
            Secure your spot at this exclusive fashion event
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between">
            {['tickets', 'details', 'payment', 'confirmation'].map((step, index) => (
              <div
                key={step}
                className="flex items-center"
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep === step
                      ? 'border-fashion-pink bg-fashion-pink text-white'
                      : currentStep === 'confirmation' || 
                        ['tickets', 'details', 'payment'].indexOf(currentStep) > 
                        ['tickets', 'details', 'payment'].indexOf(step)
                      ? 'border-fashion-pink bg-fashion-pink/20 text-fashion-pink'
                      : 'border-white/20 text-white/40'
                  }`}
                >
                  {currentStep === 'confirmation' || 
                   ['tickets', 'details', 'payment'].indexOf(currentStep) > 
                   ['tickets', 'details', 'payment'].indexOf(step) ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < 3 && (
                  <div
                    className={`w-full h-0.5 mx-2 ${
                      currentStep === 'confirmation' || 
                      ['tickets', 'details', 'payment'].indexOf(currentStep) > 
                      ['tickets', 'details', 'payment'].indexOf(step)
                        ? 'bg-fashion-pink'
                        : 'bg-white/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === 'tickets' && (
              <motion.div
                key="tickets"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Ticket Selection */}
                {event.tickets.map(ticket => (
                  <Card
                    key={ticket.id}
                    className="bg-black/20 border-white/10 p-6"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-white">
                              {ticket.ticket_type}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant="outline"
                                className="border-fashion-pink/30 text-fashion-pink"
                              >
                                {ticket.quantity_available} remaining
                              </Badge>
                              {ticket.early_bird_deadline && (
                                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                  Early Bird
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">
                              ${ticket.price}
                            </div>
                            {ticket.early_bird_deadline && ticket.early_bird_price && (
                              <div className="text-sm text-fashion-pink">
                                Early Bird: ${ticket.early_bird_price}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          {ticket.benefits.map((benefit, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-white/70"
                            >
                              <Star className="w-4 h-4 text-fashion-pink" />
                              {benefit}
                            </div>
                          ))}
                        </div>

                        {ticket.group_discount_threshold && (
                          <div className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 px-3 py-2 rounded-md">
                            <Users className="w-4 h-4" />
                            Group discount: {ticket.group_discount_percentage}% off for {ticket.group_discount_threshold}+ tickets
                          </div>
                        )}
                      </div>

                      <div className="md:w-48 space-y-4">
                        <Label htmlFor={`quantity-${ticket.id}`}>Quantity</Label>
                        <Select
                          value={String(
                            selectedTickets.find(t => t.tierId === ticket.id)?.quantity || '0'
                          )}
                          onValueChange={(value) =>
                            handleQuantityChange(ticket.id, parseInt(value))
                          }
                        >
                          <SelectTrigger
                            id={`quantity-${ticket.id}`}
                            className="bg-black/20 border-white/10 text-white"
                          >
                            <SelectValue placeholder="0" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from(
                              { length: Math.min(10, ticket.quantity_available) + 1 },
                              (_, i) => (
                                <SelectItem key={i} value={String(i)}>
                                  {i}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Promo Code */}
                <Card className="bg-black/20 border-white/10 p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="promo">Promotional Code</Label>
                      <div className="flex gap-4 mt-2">
                        <Input
                          id="promo"
                          placeholder="Enter code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="bg-black/20 border-white/10 text-white"
                        />
                        <Button
                          variant="outline"
                          className="border-fashion-pink text-fashion-pink hover:bg-fashion-pink hover:text-white"
                        >
                          <Gift className="w-4 h-4 mr-2" />
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Order Summary */}
                <Card className="bg-black/20 border-white/10 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Order Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-white/70">
                      <span>Subtotal</span>
                      <span>${totals.subtotal.toFixed(2)}</span>
                    </div>
                    {totals.discount > 0 && (
                      <div className="flex justify-between text-fashion-pink">
                        <span>Discount</span>
                        <span>-${totals.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator className="bg-white/10" />
                    <div className="flex justify-between text-xl font-semibold text-white">
                      <span>Total</span>
                      <span>${totals.total.toFixed(2)}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {currentStep === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <Card className="bg-black/20 border-white/10 p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">
                    Attendee Information
                  </h3>
                  <Grid columns={{ mobile: 1, tablet: 2, desktop: 2 }} gap={{ desktop: 6 }}>
                    <GridItem>
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={attendeeDetails.firstName}
                          onChange={(e) =>
                            setAttendeeDetails(prev => ({
                              ...prev,
                              firstName: e.target.value,
                            }))
                          }
                          className="bg-black/20 border-white/10 text-white"
                        />
                      </div>
                    </GridItem>
                    <GridItem>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={attendeeDetails.lastName}
                          onChange={(e) =>
                            setAttendeeDetails(prev => ({
                              ...prev,
                              lastName: e.target.value,
                            }))
                          }
                          className="bg-black/20 border-white/10 text-white"
                        />
                      </div>
                    </GridItem>
                    <GridItem>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={attendeeDetails.email}
                          onChange={(e) =>
                            setAttendeeDetails(prev => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className="bg-black/20 border-white/10 text-white"
                        />
                      </div>
                    </GridItem>
                    <GridItem>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={attendeeDetails.phone}
                          onChange={(e) =>
                            setAttendeeDetails(prev => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          className="bg-black/20 border-white/10 text-white"
                        />
                      </div>
                    </GridItem>
                  </Grid>
                </Card>
              </motion.div>
            )}

            {currentStep === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <Card className="bg-black/20 border-white/10 p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">
                    Payment Information
                  </h3>
                  {/* Payment form would go here - integrate with your payment provider */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="bg-black/20 border-white/10 text-white"
                      />
                    </div>
                    <Grid columns={{ mobile: 1, tablet: 3, desktop: 3 }} gap={{ desktop: 6 }}>
                      <GridItem className="tablet:col-span-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          className="bg-black/20 border-white/10 text-white"
                        />
                      </GridItem>
                      <GridItem>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          className="bg-black/20 border-white/10 text-white"
                        />
                      </GridItem>
                    </Grid>
                  </div>
                </Card>
              </motion.div>
            )}

            {currentStep === 'confirmation' && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <Card className="bg-black/20 border-white/10 p-6 text-center">
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-fashion-pink/20 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 text-fashion-pink" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Registration Complete!
                    </h3>
                    <p className="text-white/70">
                      Thank you for registering for our event. You will receive a confirmation
                      email shortly with your ticket details.
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button className="bg-fashion-pink hover:bg-fashion-pink/90">
                        <Calendar className="w-4 h-4 mr-2" />
                        Add to Calendar
                      </Button>
                      <Button variant="outline" className="border-fashion-pink text-fashion-pink hover:bg-fashion-pink hover:text-white">
                        <Ticket className="w-4 h-4 mr-2" />
                        View Tickets
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto flex justify-between">
          {currentStep !== 'tickets' && currentStep !== 'confirmation' && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="border-fashion-pink text-fashion-pink hover:bg-fashion-pink hover:text-white"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          {currentStep !== 'confirmation' && (
            <Button
              onClick={handleNext}
              className="ml-auto bg-fashion-pink hover:bg-fashion-pink/90"
              disabled={
                (currentStep === 'tickets' && selectedTickets.length === 0) ||
                (currentStep === 'details' &&
                  (!attendeeDetails.firstName ||
                    !attendeeDetails.lastName ||
                    !attendeeDetails.email ||
                    !attendeeDetails.phone))
              }
            >
              {currentStep === 'payment' ? 'Complete Purchase' : 'Continue'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}; 