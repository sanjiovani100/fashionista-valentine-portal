import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/sections/hero/Hero";
import { EventDetails } from "@/components/sections/event-details/EventDetails";

const Index = () => {
  return (
    <PageLayout>
      <Hero />
      <EventDetails />
    </PageLayout>
  );
};

export default Index;