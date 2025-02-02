import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { ContactInfo } from '../types/about.types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ContactSectionProps {
  contactInfo: ContactInfo;
}

export const ContactSection = ({ contactInfo }: ContactSectionProps) => {
  const { ref, inView, shouldAnimate } = useScrollAnimation(0.1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
  };

  return (
    <section className="py-8 md:py-16 bg-gradient-to-b from-black/40 to-black/20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 text-gradient"
        >
          Get in Touch
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            ref={ref}
            variants={shouldAnimate ? containerVariants : {}}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-4 md:space-y-6"
          >
            <motion.div 
              variants={shouldAnimate ? itemVariants : {}}
              className="flex items-center space-x-4 group touch-none"
            >
              <Mail className="w-5 h-5 md:w-6 md:h-6 text-red-primary group-hover:scale-110 transition-transform" />
              <a 
                href={`mailto:${contactInfo.email}`} 
                className="text-sm md:text-base text-gray-200 hover:text-red-primary transition-colors"
              >
                {contactInfo.email}
              </a>
            </motion.div>
            <motion.div 
              variants={shouldAnimate ? itemVariants : {}}
              className="flex items-center space-x-4 group touch-none"
            >
              <Phone className="w-5 h-5 md:w-6 md:h-6 text-red-primary group-hover:scale-110 transition-transform" />
              <a 
                href={`tel:${contactInfo.phone}`} 
                className="text-sm md:text-base text-gray-200 hover:text-red-primary transition-colors"
              >
                {contactInfo.phone}
              </a>
            </motion.div>
            <motion.div 
              variants={shouldAnimate ? itemVariants : {}}
              className="flex items-center space-x-4 group touch-none"
            >
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-red-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm md:text-base text-gray-200">{contactInfo.address}</span>
            </motion.div>
          </motion.div>
          <motion.div
            variants={shouldAnimate ? containerVariants : {}}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex justify-center items-center space-x-6 md:space-x-8"
          >
            {contactInfo.social_media.instagram && (
              <motion.a
                href={`https://instagram.com/${contactInfo.social_media.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-red-primary transition-colors touch-none"
                variants={shouldAnimate ? socialVariants : {}}
                whileHover={shouldAnimate ? { scale: 1.2, rotate: 5 } : {}}
              >
                <Instagram className="w-6 h-6 md:w-8 md:h-8" />
              </motion.a>
            )}
            {contactInfo.social_media.facebook && (
              <motion.a
                href={`https://facebook.com/${contactInfo.social_media.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-red-primary transition-colors touch-none"
                variants={shouldAnimate ? socialVariants : {}}
                whileHover={shouldAnimate ? { scale: 1.2, rotate: -5 } : {}}
              >
                <Facebook className="w-6 h-6 md:w-8 md:h-8" />
              </motion.a>
            )}
            {contactInfo.social_media.twitter && (
              <motion.a
                href={`https://twitter.com/${contactInfo.social_media.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-red-primary transition-colors touch-none"
                variants={shouldAnimate ? socialVariants : {}}
                whileHover={shouldAnimate ? { scale: 1.2, rotate: 5 } : {}}
              >
                <Twitter className="w-6 h-6 md:w-8 md:h-8" />
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};