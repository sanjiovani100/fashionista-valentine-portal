import React from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/cloudinary';
import { UserRound } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
  const { ref, inView, shouldAnimate } = useScrollAnimation(0.1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section 
      className="py-8 md:py-16 bg-gradient-to-b from-black/20 to-black/40"
      aria-labelledby="team-section-title"
      role="region"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          id="team-section-title"
          initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 text-gradient"
          tabIndex={0}
        >
          Meet Our Team
        </motion.h2>
        <motion.div
          ref={ref}
          variants={shouldAnimate ? containerVariants : {}}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          {members.map((member, index) => (
            <motion.article
              key={member.name}
              variants={shouldAnimate ? itemVariants : {}}
              whileHover={shouldAnimate ? { 
                scale: 1.02,
                transition: { duration: 0.2 }
              } : {}}
              className="group relative bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-white/20 focus-within:ring-2 focus-within:ring-red-primary focus-within:border-transparent"
              role="listitem"
              aria-labelledby={`team-member-${index}`}
              tabIndex={0}
            >
              <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                {member.image ? (
                  <OptimizedImage
                    publicId={member.image}
                    alt={`${member.name} - ${member.role}`}
                    width={600}
                    height={400}
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center bg-gray-800"
                    aria-label="Profile image placeholder"
                  >
                    <UserRound size={64} className="text-gray-400" />
                  </div>
                )}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />
              </div>
              <div className="p-4 md:p-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                <h3 
                  id={`team-member-${index}`}
                  className="text-lg md:text-xl font-semibold text-red-primary mb-1"
                >
                  {member.name}
                </h3>
                <p className="text-sm md:text-base text-gray-300 mb-2 md:mb-3">
                  {member.role}
                </p>
                <p className="text-sm md:text-base text-gray-200 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                  {member.bio}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};