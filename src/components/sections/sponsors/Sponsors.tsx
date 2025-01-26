import { motion } from "framer-motion";

export const Sponsors = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-deep-purple to-black">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-playfair text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Sponsors
        </motion.h2>
        <div className="text-center text-gray-400 font-inter">
          Coming Soon
        </div>
      </div>
    </section>
  );
};