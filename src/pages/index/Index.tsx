import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/sections/hero/Hero";
import { EventDetails } from "@/components/sections/event-details/EventDetails";
import { EventHighlights } from "@/components/sections/event-highlights/EventHighlights";

const Index = () => {
  return (
    <PageLayout>
      <Hero />
      <EventDetails />
      <EventHighlights />
    </PageLayout>
  );
};

export default Index;