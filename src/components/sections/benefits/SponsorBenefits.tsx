import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const SponsorBenefits = () => {
  const benefits = [
    "Premium brand visibility throughout the event venue",
    "VIP networking opportunities with industry leaders",
    "Strategic product placement and activation opportunities"
  ];

  return (
    <section 
      className="relative bg-pure-black overflow-hidden"
      style={{ 
        padding: 'clamp(3rem, 8vw, 6rem) 0'
      }}
    >
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text Column - 5/12 (approximately 40%) */}
          <motion.div 
            className="lg:col-span-5 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              variants={itemVariants}
              className="font-montserrat font-bold text-pure-white"
              style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: '1.2',
                letterSpacing: '-0.02em'
              }}
            >
              Why Sponsor Fashionistas Valentine's Event?
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="font-inter text-white/80"
              style={{ 
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                lineHeight: '1.6',
                fontWeight: '400'
              }}
            >
              Connect with an exclusive audience of fashion industry leaders, designers, 
              and influencers in an intimate setting designed for meaningful interactions.
            </motion.p>
            
            <motion.ul 
              variants={containerVariants}
              className="space-y-4"
            >
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-3 text-white/90"
                >
                  <span 
                    className="w-2 h-2 rounded-full bg-fashion-pink mt-2 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-inter text-lg leading-relaxed">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          {/* Image Column - 7/12 (approximately 60%) */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
              <img
                src="/lovable-uploads/a57efa58-209f-4d52-993f-474234e69609.png"
                alt="Fashion model representing our exclusive event, showcasing elegance and sophistication in a professional setting"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};