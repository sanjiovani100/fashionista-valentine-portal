import React from 'react';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { roleContent } from "@/constants/role-content";

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
        className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:30px_30px] pointer-events-none"
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
            className="text-4xl md:text-[3.5rem] font-poppins font-bold tracking-tight leading-none text-white"
          >
            Join Our Fashion Community
          </h2>
          <p className="text-white font-montserrat max-w-2xl mx-auto text-lg">
            Be part of an exclusive network of fashion industry professionals and enthusiasts
          </p>
        </motion.div>

        {/* Partner Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {Object.entries(roleContent).map(([role, content]) => (
            <motion.div
              key={role}
              variants={itemVariants}
              className="card-base card-hover rounded-xl p-8 flex flex-col"
            >
              <h3 className="text-2xl font-poppins font-bold mb-4 text-white">
                {content.hero.title}
              </h3>
              <p className="text-white font-montserrat mb-6">
                {content.hero.subtitle}
              </p>
              
              {/* Benefits List */}
              <ul className="space-y-4 mb-8 flex-grow font-montserrat">
                {content.benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-white">
                          {benefit.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* CTA Button */}
              <Link
                to={`/register/${role}`}
                className="bg-white text-black hover:bg-white/90 transition-all duration-300 
                         w-full text-center py-3 px-6 rounded-lg font-montserrat font-semibold
                         hover:scale-[1.02] active:scale-[0.98]"
                aria-label={`Register as ${role}`}
              >
                Register Now
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          className="mt-16 text-center font-montserrat"
          variants={itemVariants}
        >
          <p className="text-white mb-4">
            Want to learn more about partnership opportunities?
          </p>
          <Link
            to="/sponsors"
            className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white 
                     text-white hover:bg-white hover:text-black transition-all duration-300
                     rounded-lg font-semibold hover:scale-[1.02] active:scale-[0.98]"
          >
            View Partnership Details
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};