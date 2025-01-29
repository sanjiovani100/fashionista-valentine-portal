import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { useReducedMotion } from "framer-motion";

const sponsorLogos = [
  { id: 1, name: "Fashion Brand 1", src: "/lovable-uploads/252b7b0b-6130-4274-b1dc-f368cd218a9d.png" },
  { id: 2, name: "Fashion Brand 2", src: "/lovable-uploads/30ae724b-7186-449a-ba71-b9438b79458f.png" },
  { id: 3, name: "Fashion Brand 3", src: "/lovable-uploads/780caef1-834f-4fa7-a143-60c38ed8afe1.png" },
  { id: 4, name: "Fashion Brand 4", src: "/lovable-uploads/a4c0f17d-80b5-4e2d-8ec7-278953749977.png" },
  { id: 5, name: "Fashion Brand 5", src: "/lovable-uploads/a57efa58-209f-4d52-993f-474234e69609.png" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const Sponsors = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      className="relative py-20 overflow-hidden"
      aria-labelledby="sponsors-title"
    >
      {/* Background with gradient and blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-maroon/20 to-black pointer-events-none" />
      <div className="absolute inset-0 backdrop-blur-[100px]" />

      <Card className="container mx-auto relative z-10 bg-black/40 border-white/10 backdrop-blur-sm">
        <CardContent className="pt-6">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center space-y-4 mb-12"
          >
            <motion.p 
              variants={itemVariants}
              className="text-sm font-medium tracking-widest text-white/60 uppercase"
            >
              Proudly Supported By Leading Fashion Brands
            </motion.p>
            
            <motion.h2 
              id="sponsors-title"
              variants={itemVariants}
              className="text-4xl md:text-[3.5rem] font-bold tracking-tight leading-none bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
            >
              Our Esteemed Sponsors
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="max-w-2xl mx-auto text-white/80 text-lg"
            >
              Join these industry leaders in supporting fashion innovation and creativity
            </motion.p>
          </motion.div>

          {/* Enhanced Logo Carousel */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 pointer-events-none z-10" />
            <LogoCarousel 
              logos={sponsorLogos} 
              columns={3} 
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};