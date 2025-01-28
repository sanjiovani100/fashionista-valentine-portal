import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { CountdownTimer } from "./components/CountdownTimer";
import { TrustSignals } from "./components/TrustSignals";
import { TicketCard } from "./components/TicketCard";
import type { EventTicket } from "@/types/event.types";

interface TicketSelectionProps {
  tickets: EventTicket[];
  eventDate: string;
}

export const TicketSelection = ({ tickets, eventDate }: TicketSelectionProps) => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const transformedTickets = tickets.map(ticket => ({
    ...ticket,
    title: ticket.ticket_type,
    subtitle: `${ticket.ticket_type} access to the Fashionistas Valentine's Event`,
    perks: ticket.benefits || [],
    price: Number(ticket.price) // Convert price to number
  }));

  return (
    <section 
      className="pt-8 pb-20 md:pb-[80px] px-4 relative overflow-hidden bg-pure-black" 
      ref={ref}
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute animate-float-slow top-1/4 left-1/4">
          <Heart className="w-24 h-24 text-red-soft animate-pulse" />
        </div>
        <div className="absolute animate-float-medium top-1/2 right-1/4">
          <Heart className="w-16 h-16 text-red-soft animate-pulse" />
        </div>
        <div className="absolute animate-float-fast bottom-1/4 left-1/2">
          <Heart className="w-20 h-20 text-red-soft animate-pulse" />
        </div>
      </div>
      
      <motion.div 
        className="container mx-auto relative z-10 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <CountdownTimer />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {transformedTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              variants={cardVariants}
              className="transform transition-all duration-300"
            >
              <TicketCard
                {...ticket}
                isSelected={selectedTicket === ticket.title}
                onSelect={setSelectedTicket}
              />
            </motion.div>
          ))}
        </div>

        <TrustSignals />
      </motion.div>
    </section>
  );
};