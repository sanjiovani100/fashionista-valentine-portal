import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LogoCarousel } from "@/components/ui/logo-carousel";

const sponsorLogos = [
  { id: 1, name: "Fashion Brand 1", src: "/lovable-uploads/252b7b0b-6130-4274-b1dc-f368cd218a9d.png" },
  { id: 2, name: "Fashion Brand 2", src: "/lovable-uploads/30ae724b-7186-449a-ba71-b9438b79458f.png" },
  { id: 3, name: "Fashion Brand 3", src: "/lovable-uploads/780caef1-834f-4fa7-a143-60c38ed8afe1.png" },
  { id: 4, name: "Fashion Brand 4", src: "/lovable-uploads/a4c0f17d-80b5-4e2d-8ec7-278953749977.png" },
  { id: 5, name: "Fashion Brand 5", src: "/lovable-uploads/a57efa58-209f-4d52-993f-474234e69609.png" },
];

export const Sponsors = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-deep-purple to-black">
      <Card className="container mx-auto bg-black/50 border-white/10">
        <CardContent className="pt-6">
          <div className="text-center space-y-4 mb-12">
            <motion.p 
              className="text-sm font-medium tracking-widest text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              PROUDLY SUPPORTED BY LEADING FASHION BRANDS
            </motion.p>
            <motion.h2 
              className="text-4xl md:text-[3.5rem] font-bold tracking-tight leading-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Our Esteemed Sponsors
            </motion.h2>
          </div>
          <LogoCarousel logos={sponsorLogos} columns={3} />
        </CardContent>
      </Card>
    </section>
  );
};