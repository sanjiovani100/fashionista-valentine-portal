import { useState } from "react";
import { Heart } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { CountdownTimer } from "./components/CountdownTimer";
import { TrustSignals } from "./components/TrustSignals";
import { TicketCard } from "./components/TicketCard";
import { tickets } from "./data/tickets";

export const TicketSelection = () => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 md:py-[80px] px-4 relative overflow-hidden bg-gradient-to-br from-romantic to-[#333399]" ref={ref}>
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
          {tickets.map((ticket, index) => (
            <div
              key={ticket.title}
              className={`fade-up ${inView ? 'in-view' : ''}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <TicketCard
                {...ticket}
                isSelected={selectedTicket === ticket.title}
                onSelect={setSelectedTicket}
              />
            </div>
          ))}
        </div>

        <TrustSignals />
      </div>
    </section>
  );
};