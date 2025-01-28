import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/sections/hero/Hero";
import { EventsSection } from "@/components/sections/events/EventsSection";
import { EventHighlights } from "@/components/sections/event-highlights/EventHighlights";
import { LingerieShowcase } from "@/components/sections/lingerie-showcase/LingerieShowcase";
import { TicketSelection } from "@/components/sections/ticket-selection/TicketSelection";
import { Partners } from "@/components/sections/partners/Partners";
import { Sponsors } from "@/components/sections/sponsors/Sponsors";
import { Cta } from "@/components/sections/cta/Cta";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import "@/styles/parallax.css";

const Index = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3 });
  const [eventsRef, eventsInView] = useInView({ threshold: 0.3 });
  const [highlightsRef, highlightsInView] = useInView({ threshold: 0.3 });
  const [showcaseRef, showcaseInView] = useInView({ threshold: 0.3 });
  const [ticketsRef, ticketsInView] = useInView({ threshold: 0.3 });
  const [partnersRef, partnersInView] = useInView({ threshold: 0.3 });

  return (
    <PageLayout>
      <motion.div ref={heroRef} className="parallax-section">
        <Hero />
      </motion.div>

      <motion.div 
        ref={eventsRef}
        className={`parallax-section section-transition ${eventsInView ? 'in-view' : ''}`}
        style={{ '--parallax-speed': '0.2' } as React.CSSProperties}
      >
        <EventsSection />
      </motion.div>

      <motion.div 
        ref={highlightsRef}
        className={`parallax-section section-transition ${highlightsInView ? 'in-view' : ''}`}
        style={{ '--parallax-speed': '0.3' } as React.CSSProperties}
      >
        <EventHighlights />
      </motion.div>

      <motion.div 
        ref={showcaseRef}
        className={`parallax-section section-transition ${showcaseInView ? 'in-view' : ''}`}
        style={{ '--parallax-speed': '0.4' } as React.CSSProperties}
      >
        <LingerieShowcase />
      </motion.div>

      <motion.div 
        ref={ticketsRef}
        className={`parallax-section section-transition ${ticketsInView ? 'in-view' : ''}`}
        style={{ '--parallax-speed': '0.3' } as React.CSSProperties}
      >
        <TicketSelection />
      </motion.div>

      <motion.div 
        ref={partnersRef}
        className={`parallax-section section-transition ${partnersInView ? 'in-view' : ''}`}
        style={{ '--parallax-speed': '0.2' } as React.CSSProperties}
      >
        <Partners />
      </motion.div>

      <motion.div className="parallax-section">
        <Sponsors />
      </motion.div>

      <motion.div className="parallax-section">
        <Cta />
      </motion.div>
    </PageLayout>
  );
};

export default Index;