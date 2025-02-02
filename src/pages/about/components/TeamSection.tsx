import React from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/cloudinary';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface TeamSectionProps {
  members: TeamMember[];
}

export const TeamSection = ({ members }: TeamSectionProps) => {
  return (
    <section className="py-16 bg-gradient-to-b from-black/20 to-black/40">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-fashion-pink"
        >
          Meet Our Team
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-black/40 transition-colors"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <OptimizedImage
                  publicId={member.image}
                  alt={member.name}
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-fashion-pink">{member.name}</h3>
                <p className="text-gray-300 mb-3">{member.role}</p>
                <p className="text-gray-200">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};