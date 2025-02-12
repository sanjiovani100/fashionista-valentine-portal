import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
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
              className="text-sm font-montserrat font-medium tracking-widest text-white uppercase"
            >
              Proudly Supported By Leading Fashion Brands
            </motion.p>
            
            <motion.h2 
              id="sponsors-title"
              variants={itemVariants}
              className="text-4xl md:text-[3.5rem] font-poppins font-bold tracking-tight leading-none text-white"
            >
              Our Esteemed Sponsors
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="max-w-2xl mx-auto text-white font-montserrat text-lg"
            >
              Join these industry leaders in supporting fashion innovation and creativity
            </motion.p>
          </motion.div>

          {/* Enhanced Logo Marquee */}
          <div className="relative w-full overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black/80 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black/80 to-transparent z-10" />
            
            <Marquee 
              className="py-8" 
              speed={40} 
              pauseOnHover={true}
            >
              {sponsorLogos.map((logo) => (
                <div
                  key={logo.id}
                  className="relative h-20 w-[200px] mx-12 flex items-center justify-center"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-full w-auto object-contain"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};


