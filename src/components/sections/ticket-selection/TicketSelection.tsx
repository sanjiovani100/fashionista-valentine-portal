import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, GlassWater, Gift, Clock, Shield, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";

interface TicketOption {
  title: string;
  price: string;
  perks: string[];
  limited?: boolean;
}

const tickets: TicketOption[] = [
  {
    title: "General Admission",
    price: "$50",
    perks: ["Entry to main event", "Welcome drink", "Photo opportunities"],
    limited: true,
  },
  {
    title: "VIP Experience",
    price: "$150",
    perks: ["Priority seating", "Exclusive cocktail hour", "Meet & Greet", "Swag bag"],
  },
  {
    title: "Sponsor Package",
    price: "$500",
    perks: ["VIP benefits", "Brand recognition", "Backstage access", "Private table"],
  },
];

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
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
        
        setTimeLeft({ days, hours, minutes });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4 mb-12">
      <h2 className="text-3xl md:text-4xl font-playfair text-white mb-4">
        Time is Running Out!
      </h2>
      <div className="flex gap-6 text-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-romantic mb-2">
              {value}
            </div>
            <div className="text-sm text-gray-300 uppercase">{unit}</div>
          </div>
        ))}
      </div>
      <p className="text-blush text-lg animate-pulse">
        Hurry! Limited tickets available
      </p>
    </div>
  );
};

const TrustSignals = () => (
  <div className="mt-12 border-t border-gray-800 pt-8">
    <div className="flex flex-col items-center space-y-6">
      <div className="flex gap-4 items-center">
        <Shield className="text-gray-400" />
        <CreditCard className="text-gray-400" />
      </div>
      <p className="text-gray-400 text-sm text-center max-w-md">
        Secure payment processing. All major credit cards accepted.
      </p>
      <div className="text-center">
        <p className="text-blush italic mb-2">
          "An unforgettable evening of fashion and romance!"
        </p>
        <p className="text-gray-400 text-sm">- Previous Attendee</p>
      </div>
    </div>
  </div>
);

export const TicketSelection = () => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-black to-burgundy">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iI0ZGQzFDMSIvPjwvc3ZnPg==')]" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <CountdownTimer />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tickets.map((ticket) => (
            <Card
              key={ticket.title}
              className={`bg-black/50 border-gray-800 backdrop-blur-sm transition-all duration-300 hover:shadow-glow ${
                selectedTicket === ticket.title
                  ? "border-romantic"
                  : "hover:border-gray-700"
              }`}
              onClick={() => setSelectedTicket(ticket.title)}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-playfair text-white">
                  {ticket.title}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {ticket.limited && (
                    <span className="text-romantic text-sm">
                      Only a few tickets left!
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-romantic mb-6">
                  {ticket.price}
                </div>
                <ul className="space-y-3">
                  {ticket.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-gray-300">
                      <Heart className="w-4 h-4 text-romantic" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-passion hover:bg-romantic text-white transition-colors"
                  size="lg"
                >
                  Reserve Now
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