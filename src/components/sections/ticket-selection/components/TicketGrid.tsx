import { motion } from "framer-motion";
import { TicketCard } from "./TicketCard";
import type { EventTicket } from "@/types/event.types";

interface TicketGridProps {
  tickets: EventTicket[];
  selectedTicket: string | null;
  onSelectTicket: (ticketType: string) => void;
}

export const TicketGrid = ({ tickets, selectedTicket, onSelectTicket }: TicketGridProps) => {
  const transformedTickets = tickets.map(ticket => ({
    ...ticket,
    title: ticket.ticket_type,
    subtitle: `${ticket.ticket_type} access to the Fashionistas Valentine's Event`,
    perks: ticket.benefits || [],
    price: Number(ticket.price)
  }));

  return (
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
            onSelect={onSelectTicket}
            tabIndex={0}
          />
        </motion.div>
      ))}
    </div>
  );
};


