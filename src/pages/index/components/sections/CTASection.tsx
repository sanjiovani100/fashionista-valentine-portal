import { Cta11 } from "@/components/blocks/shadcnblocks-com-cta11";

export const CTASection = () => {
  return (
    <section className="bg-gradient-to-b from-black to-maroon/10 py-24">
      <div className="container mx-auto px-4 md:px-8">
        <Cta11
          heading="Join Our Valentine's Fashion Event"
          description="Be part of an unforgettable evening celebrating fashion, creativity, and empowerment"
          buttons={{
            primary: {
              text: "Get Your Tickets",
              url: "#tickets"
            },
            secondary: {
              text: "Learn More",
              url: "#about"
            }
          }}
        />
      </div>
    </section>
  );
};