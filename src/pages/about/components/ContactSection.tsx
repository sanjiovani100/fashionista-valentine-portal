import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { ContactInfo } from '../types/about.types';

interface ContactSectionProps {
  contactInfo: ContactInfo;
}

export const ContactSection = ({ contactInfo }: ContactSectionProps) => {
  return (
    <section className="py-16 bg-gradient-to-b from-black/40 to-black/20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient"
        >
          Get in Touch
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div 
              className="flex items-center space-x-4 group"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Mail className="w-6 h-6 text-red-primary group-hover:scale-110 transition-transform" />
              <a 
                href={`mailto:${contactInfo.email}`} 
                className="text-gray-200 hover:text-red-primary transition-colors"
              >
                {contactInfo.email}
              </a>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-4 group"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Phone className="w-6 h-6 text-red-primary group-hover:scale-110 transition-transform" />
              <a 
                href={`tel:${contactInfo.phone}`} 
                className="text-gray-200 hover:text-red-primary transition-colors"
              >
                {contactInfo.phone}
              </a>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-4 group"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <MapPin className="w-6 h-6 text-red-primary group-hover:scale-110 transition-transform" />
              <span className="text-gray-200">{contactInfo.address}</span>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center items-center space-x-8"
          >
            {contactInfo.social_media.instagram && (
              <motion.a
                href={`https://instagram.com/${contactInfo.social_media.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-red-primary transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Instagram className="w-8 h-8" />
              </motion.a>
            )}
            {contactInfo.social_media.facebook && (
              <motion.a
                href={`https://facebook.com/${contactInfo.social_media.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-red-primary transition-colors"
                whileHover={{ scale: 1.2, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Facebook className="w-8 h-8" />
              </motion.a>
            )}
            {contactInfo.social_media.twitter && (
              <motion.a
                href={`https://twitter.com/${contactInfo.social_media.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-red-primary transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Twitter className="w-8 h-8" />
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};