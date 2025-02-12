import { motion } from "framer-motion";

interface TicketHeaderProps {
  controls: any;
  eventTitle?: string;
}

export const TicketHeader = ({ controls, eventTitle = "Fashion Event" }: TicketHeaderProps) => {
  return (
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
        Select from our carefully curated ticket options and be part of this exclusive {eventTitle} celebration
      </motion.p>
    </div>
  );
};


