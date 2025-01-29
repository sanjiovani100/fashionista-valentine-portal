import React from 'react';
import { motion } from "framer-motion";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { useInView } from "react-intersection-observer";

const partnerLogos = [
  { id: 1, name: "Partner 1", src: "/placeholder.svg" },
  { id: 2, name: "Partner 2", src: "/placeholder.svg" },
  { id: 3, name: "Partner 3", src: "/placeholder.svg" },
  { id: 4, name: "Partner 4", src: "/placeholder.svg" },
  { id: 5, name: "Partner 5", src: "/placeholder.svg" },
  { id: 6, name: "Partner 6", src: "/placeholder.svg" },
];

export const Partners = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden bg-gradient-to-b from-black/95 to-maroon/5"
      aria-labelledby="partners-title"
    >
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,51,102,0.05)_1px,transparent_0)] bg-[size:30px_30px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Content container */}
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div
          className="text-center mb-12 space-y-4"
          variants={itemVariants}
        >
          <h2
            id="partners-title"
            className="text-4xl md:text-[3.5rem] font-bold tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-red-accent via-pink-magenta to-purple-vivid"
          >
            Our Partners
          </h2>
          <p className="text-white-secondary max-w-2xl mx-auto text-lg">
            Collaborating with industry leaders to bring you an unforgettable fashion experience
          </p>
        </motion.div>

        {/* Logo carousel with improved accessibility */}
        <div
          className="backdrop-blur-sm bg-black/30 rounded-xl border border-white/10 p-8 shadow-glow"
          role="region"
          aria-label="Partner logos carousel"
        >
          <LogoCarousel logos={partnerLogos} columns={3} />
        </div>

        {/* Call to action */}
        <motion.div
          className="mt-12 text-center"
          variants={itemVariants}
        >
          <p className="text-white-secondary mb-4">
            Interested in becoming a partner?
          </p>
          <a
            href="/sponsors"
            className="inline-flex items-center px-6 py-3 bg-red-accent hover:bg-red-accent/90 text-white rounded-lg transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-red-accent focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
            aria-label="Learn more about partnership opportunities"
          >
            Become a Partner
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};