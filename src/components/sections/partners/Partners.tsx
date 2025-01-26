import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Partner {
  id: number;
  name: string;
  role: string;
  image: string;
}

const partners = {
  models: [
    { id: 1, name: "Sofia Martinez", role: "Lead Model", image: "/placeholder.svg" },
    { id: 2, name: "Isabella Rodriguez", role: "Fashion Model", image: "/placeholder.svg" },
  ],
  designers: [
    { id: 1, name: "Carlos Rivera", role: "Lead Designer", image: "/placeholder.svg" },
    { id: 2, name: "Maria Garcia", role: "Fashion Designer", image: "/placeholder.svg" },
  ],
  sponsors: [
    { id: 1, name: "Luxury Brand Co", role: "Platinum Sponsor", image: "/placeholder.svg" },
    { id: 2, name: "Fashion House", role: "Gold Sponsor", image: "/placeholder.svg" },
  ],
};

export const Partners = () => {
  const renderPartnerCategory = (title: string, items: Partner[]) => (
    <div className="mb-12">
      <h3 className="text-2xl font-playfair mb-6 text-center">{title}</h3>
      <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory">
        {items.map((partner) => (
          <motion.div
            key={partner.id}
            className="snap-center shrink-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-[300px] bg-black/40 border-fashion-pink/20">
              <CardContent className="p-6">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h4 className="text-xl font-montserrat mb-2">{partner.name}</h4>
                <p className="text-gray-400 font-inter">{partner.role}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-black to-deep-purple">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-playfair text-center mb-16">Our Partners</h2>
        {renderPartnerCategory("Featured Models", partners.models)}
        {renderPartnerCategory("Elite Designers", partners.designers)}
        {renderPartnerCategory("Valued Sponsors", partners.sponsors)}
      </div>
    </section>
  );
};