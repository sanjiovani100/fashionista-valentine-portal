import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { CountdownTimer } from "./components/CountdownTimer";
import { TrustSignals } from "./components/TrustSignals";
import { TicketHeader } from "./components/TicketHeader";
import { TicketGrid } from "./components/TicketGrid";
import type { EventTicket } from "@/types/event.types";
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('home');

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
        <TicketHeader />
        
        <TicketGrid 
          tickets={tickets}
          selectedTicket={selectedTicket}
          onSelectTicket={setSelectedTicket}
        />

        <div className="mt-12">
          <TrustSignals />
        </div>

        <div className="mt-8">
          <CountdownTimer eventDate={eventDate} />
        </div>
      </motion.div>

      <div 
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent" />
      </div>
    </section>
  );
};