import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/sections/hero/Hero";
import { EventDetails } from "@/components/sections/event-details/EventDetails";
import { EventHighlights } from "@/components/sections/event-highlights/EventHighlights";
import { LingerieShowcase } from "@/components/sections/lingerie-showcase/LingerieShowcase";

const Index = () => {
  return (
    <PageLayout>
      <Hero />
      <EventDetails />
      <LingerieShowcase />
      <EventHighlights />
    </PageLayout>
  );
};

export default Index;