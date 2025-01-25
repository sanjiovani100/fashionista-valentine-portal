import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Shield, CreditCard, Check } from "lucide-react";
import { useEffect, useState } from "react";

interface TicketOption {
  title: string;
  subtitle: string;
  price: string;
  perks: string[];
  limited?: boolean;
}

const tickets: TicketOption[] = [
  {
    title: "General Admission",
    subtitle: "Standard access to the Fashionistas Valentine's Event",
    price: "$99",
    perks: [
      "Standard seating",
      "Welcome drink",
      "Event program",
      "Access to general areas",
      "Basic networking opportunities"
    ],
  },
  {
    title: "VIP Experience",
    subtitle: "Premium access with exclusive perks and privileges",
    price: "$249",
    perks: [
      "Front-row seating",
      "Welcome champagne",
      "VIP lounge access",
      "Meet & Greet opportunities",
      "After-party entry"
    ],
    limited: true,
  },
  {
    title: "Sponsor Package",
    subtitle: "Ultimate experience with maximum visibility",
    price: "$499",
    perks: [
      "Premium seating",
      "Unlimited premium drinks",
      "Private suite access",
      "Brand visibility opportunities",
      "Private after-party suite"
    ],
  },
];

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date("2024-02-14T20:00:00");
    
    const updateTimer = () => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-8 mb-16">
      <h1 className="text-5xl md:text-[48px] font-playfair text-white mb-6 text-center transition-all">
        Choose Your Perfect Ticket
      </h1>
      <p className="text-xl md:text-2xl text-blush mb-4 text-center font-montserrat">
        Reserve your spot for Medellín's most glamorous night!
      </p>
      <p className="text-lg text-gray-300 mb-8 text-center font-montserrat">
        Join 100+ attendees who've already secured their tickets
      </p>
      <div className="flex gap-6 text-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex items-center">
            <div className="flex flex-col items-center transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-romantic mb-2 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/10">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-300 font-montserrat">{unit}</div>
            </div>
            {unit !== 'seconds' && (
              <div className="text-4xl text-gray-500 mx-2">:</div>
            )}
          </div>
        ))}
      </div>
      <p className="text-blush text-lg animate-pulse mt-6 font-montserrat">
        Don't miss out on Medellín's most glamorous event!
      </p>
    </div>
  );
};

const TrustSignals = () => (
  <div className="mt-16 border-t border-white/10 pt-8">
    <div className="flex flex-col items-center space-y-6">
      <p className="text-romantic font-semibold text-xl font-montserrat">
        Limited Tickets Remaining
      </p>
      <p className="text-gray-300 font-montserrat">
        Only 20 VIP Tickets Left
      </p>
      <div className="flex gap-4 items-center text-gray-400 font-montserrat">
        <Shield className="w-5 h-5" />
        <span>Secure Checkout</span>
        <span>•</span>
        <span>Verified by Stripe</span>
        <CreditCard className="w-5 h-5" />
      </div>
    </div>
  </div>
);

export const TicketSelection = () => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  return (
    <section className="py-20 md:py-[80px] px-4 relative overflow-hidden bg-gradient-to-br from-romantic to-[#333399]">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute animate-float-1 top-1/4 left-1/4">
          <Heart className="w-24 h-24 text-romantic" />
        </div>
        <div className="absolute animate-float-2 top-1/2 right-1/4">
          <Heart className="w-16 h-16 text-romantic" />
        </div>
        <div className="absolute animate-float-3 bottom-1/4 left-1/2">
          <Heart className="w-20 h-20 text-romantic" />
        </div>
      </div>
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        <CountdownTimer />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {tickets.map((ticket) => (
            <Card
              key={ticket.title}
              className={`bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-glow ${
                selectedTicket === ticket.title
                  ? "border-romantic"
                  : "hover:border-white/20"
              }`}
              onClick={() => setSelectedTicket(ticket.title)}
            >
              <CardHeader>
                <CardTitle className="text-2xl md:text-[24px] font-playfair text-white">
                  {ticket.title}
                </CardTitle>
                <CardDescription className="text-gray-300 font-montserrat">
                  {ticket.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-[36px] font-bold font-montserrat text-romantic mb-8">
                  {ticket.price}
                  <span className="text-lg text-gray-400">/person</span>
                </div>
                <ul className="space-y-4">
                  {ticket.perks.map((perk) => (
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
          ))}
        </div>

        <TrustSignals />
      </div>
    </section>
  );
};
