import React from 'react';
import { motion } from 'framer-motion';

interface CoreValue {
  title: string;
  description: string;
}

interface CoreValuesProps {
  values: CoreValue[];
}

export const CoreValues = ({ values }: CoreValuesProps) => {
  return (
    <section className="py-16 bg-black/20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-fashion-pink"
        >
          Our Core Values
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black/30 backdrop-blur-sm rounded-lg p-6 hover:bg-black/40 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-3 text-fashion-pink">{value.title}</h3>
              <p className="text-gray-200">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};