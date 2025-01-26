import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

export const SponsorBenefits = () => {
  return (
    <section className="relative py-24 bg-pure-black overflow-hidden">
      <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[4.5rem] font-montserrat font-bold leading-tight text-pure-white"
          >
            Why Sponsor Fashionistas Valentine's Event?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 font-inter leading-relaxed"
          >
            Connect with an exclusive audience of fashion industry leaders, designers, 
            and influencers in an intimate setting designed for meaningful interactions.
          </motion.p>
          
          <motion.ul 
            className="space-y-4 text-lg text-white/90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-fashion-pink" />
              Premium brand visibility throughout the event venue
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-fashion-pink" />
              VIP networking opportunities with industry leaders
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-fashion-pink" />
              Strategic product placement and activation opportunities
            </li>
          </motion.ul>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden"
        >
          <img
            src="/lovable-uploads/a57efa58-209f-4d52-993f-474234e69609.png"
            alt="Fashion model representing our exclusive event"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};