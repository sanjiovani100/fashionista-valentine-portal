import { SwimwearTestRunner } from "@/features/events/components/SwimwearTestRunner";

export const TestRunnerSection = () => {
  return (
    <section className="bg-black py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-8">Event Tests</h2>
        <SwimwearTestRunner />
      </div>
    </section>
  );
};