import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Network, Target } from 'lucide-react';
import { cn } from "@/lib/utils";

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const BenefitItem = ({ icon, title, description, delay }: BenefitItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-fashion-pink/10 to-deep-purple/10 
               backdrop-blur-md border border-white/10 hover:border-fashion-pink/20 transition-all duration-300"
  >
    <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-fashion-pink to-deep-purple">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-montserrat font-semibold mb-2 
                     bg-gradient-to-r from-fashion-pink to-deep-purple bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-white/80 font-inter leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

export const SponsorBenefits = () => {
  const benefits = [
    {
      icon: <Building2 className="w-6 h-6 text-white" />,
      title: "Premium Brand Visibility",
      description: "Showcase your brand to our exclusive audience in prime locations throughout the venue.",
      delay: 0.2
    },
    {
      icon: <Network className="w-6 h-6 text-white" />,
      title: "VIP Networking",
      description: "Connect directly with industry leaders, designers, and influencers in an intimate setting.",
      delay: 0.4
    },
    {
      icon: <Target className="w-6 h-6 text-white" />,
      title: "Strategic Activation",
      description: "Create memorable brand experiences through custom product placement and activations.",
      delay: 0.6
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-fashion-pink/10" />
      
      <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-section-title font-montserrat font-bold leading-tight
                     bg-gradient-to-r from-fashion-pink to-deep-purple bg-clip-text text-transparent"
          >
            Why Sponsor Fashionistas Valentine's Event?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-body-large text-white/80 font-inter leading-relaxed max-w-xl"
          >
            Connect with an exclusive audience of fashion industry leaders, designers, and influencers 
            in an intimate setting designed for meaningful interactions and brand exposure.
          </motion.p>
          
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <BenefitItem key={index} {...benefit} />
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden"
        >
          <img
            src="/lovable-uploads/a4c0f17d-80b5-4e2d-8ec7-278953749977.png"
            alt="Fashion model representing our exclusive event atmosphere"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};