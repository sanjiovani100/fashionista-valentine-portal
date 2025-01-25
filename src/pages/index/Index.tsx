import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/sections/hero/Hero";
import { EventDetails } from "@/components/sections/event-details/EventDetails";
import { LingerieShowcase } from "@/components/sections/lingerie-showcase/LingerieShowcase";
import { TicketSelection } from "@/components/sections/ticket-selection/TicketSelection";
import { EventHighlights } from "@/components/sections/event-highlights/EventHighlights";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import "@/styles/parallax.css";

const Index = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3 });
  const [detailsRef, detailsInView] = useInView({ threshold: 0.3 });
  const [showcaseRef, showcaseInView] = useInView({ threshold: 0.3 });
  const [ticketsRef, ticketsInView] = useInView({ threshold: 0.3 });

  return (
    <PageLayout>
      <motion.div ref={heroRef} className="parallax-section">
        <Hero />
      </motion.div>

      <motion.div 
        ref={detailsRef}
        className={`parallax-section section-transition ${detailsInView ? 'in-view' : ''}`}
        style={{ '--parallax-speed': '0.2' } as React.CSSProperties}
      >
        <EventDetails />
      </motion.div>

      <motion.div 
        ref={showcaseRef}
        className={`parallax-section section-transition ${showcaseInView ? 'in-view' : ''}`}
        style={{ '--parallax-speed': '0.3' } as React.CSSProperties}
      >
        <LingerieShowcase />
      </motion.div>

      <motion.div 
        ref={ticketsRef}
        className={`parallax-section section-transition ${ticketsInView ? 'in-view' : ''}`}
        style={{ '--parallax-speed': '0.4' } as React.CSSProperties}
      >
        <TicketSelection />
      </motion.div>

      <motion.div className="parallax-section">
        <EventHighlights />
      </motion.div>
    </PageLayout>
  );
};

export default Index;