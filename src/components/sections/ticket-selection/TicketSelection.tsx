import { useState, useEffect } from "react";
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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const transformedTickets = tickets.map(ticket => ({
    ...ticket,
    title: ticket.ticket_type,
    subtitle: `${ticket.ticket_type} access to the Fashionistas Valentine's Event`,
    perks: ticket.benefits || [],
    price: Number(ticket.price)
  }));

  return (
    <section 
      className="relative bg-gradient-to-b from-maroon/5 to-black/95 pt-8 pb-20 md:pb-[80px] px-4 overflow-hidden"
      ref={ref}
      aria-labelledby="ticket-selection-title"
    >
      <motion.div 
        className="container mx-auto relative z-10 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="text-center mb-12 space-y-4">
          <motion.h2
            id="ticket-selection-title"
            className="text-4xl md:text-[3.5rem] font-bold tracking-tight leading-none text-white"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            Choose Your Perfect Ticket
          </motion.h2>
          <motion.p
            className="text-white-secondary max-w-2xl mx-auto text-lg"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            Select from our carefully curated ticket options and be part of this exclusive Valentine's fashion celebration
          </motion.p>
        </div>

        <CountdownTimer eventDate={eventDate} />
        
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
          role="list"
          aria-label="Available ticket options"
        >
          {transformedTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.1
                  }
                }
              }}
              className="transform transition-all duration-300 will-change-transform"
              role="listitem"
            >
              <TicketCard
                {...ticket}
                isSelected={selectedTicket === ticket.title}
                onSelect={setSelectedTicket}
                tabIndex={0}
              />
            </motion.div>
          ))}
        </div>

        <TrustSignals />
      </motion.div>
    </section>
  );
};