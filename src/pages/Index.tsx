import { Hero } from "@/components/Hero";
import { EventDetails } from "@/components/EventDetails";

const Index = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <EventDetails />
    </main>
  );
};

export default Index;