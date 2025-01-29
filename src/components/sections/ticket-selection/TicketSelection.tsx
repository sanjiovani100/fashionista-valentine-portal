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
      className="relative min-h-screen bg-gradient-to-b from-maroon/5 to-black/95 pt-8 pb-20 md:pb-[80px] px-4 overflow-hidden"
      ref={ref}
      aria-labelledby="ticket-selection-title"
    >
      {/* Decorative Hearts */}
      <div 
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {[1, 2, 3].map((_, index) => (
          <motion.div
            key={index}
            className={`absolute ${index === 0 ? 'top-1/4 left-1/4' : index === 1 ? 'top-1/2 right-1/4' : 'bottom-1/4 left-1/2'}`}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className={`w-${16 + index * 4} h-${16 + index * 4} text-red-soft/10`} />
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="container mx-auto relative z-10 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="text-center mb-12 space-y-4">
          <motion.h2
            id="ticket-selection-title"
            className="text-4xl md:text-[3.5rem] font-bold tracking-tight leading-none text-gradient bg-accent-gradient"
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