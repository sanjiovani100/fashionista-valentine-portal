import { TicketSelection } from "@/components/sections/ticket-selection/TicketSelection";
import type { TicketDisplay } from "@/types/event.types";

interface TicketSectionProps {
  tickets: TicketDisplay[];
  eventDate: string;
}

export const TicketSection = ({ tickets, eventDate }: TicketSectionProps) => {
  return (
    <section className="bg-gradient-to-b from-black to-maroon/5 py-24" id="tickets">
      <div className="container mx-auto px-4 md:px-8">
        <TicketSelection 
          tickets={tickets}
          eventDate={eventDate}
        />
      </div>
    </section>
  );
};