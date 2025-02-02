import React from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/cloudinary';
import { UserRound } from 'lucide-react';

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
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient"
        >
          Meet Our Team
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-white/20"
            >
              <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                {member.image ? (
                  <OptimizedImage
                    publicId={member.image}
                    alt={member.name}
                    width={600}
                    height={400}
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <UserRound size={64} className="text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-xl font-semibold text-red-primary mb-1">{member.name}</h3>
                <p className="text-gray-300 mb-3">{member.role}</p>
                <p className="text-gray-200 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};