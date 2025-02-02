import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { ContactInfo } from '../types/about.types';

interface ContactSectionProps {
  contactInfo: ContactInfo;
}

export const ContactSection = ({ contactInfo }: ContactSectionProps) => {
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
          Get in Touch
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-fashion-pink" />
              <a href={`mailto:${contactInfo.email}`} className="text-gray-200 hover:text-fashion-pink transition-colors">
                {contactInfo.email}
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-fashion-pink" />
              <a href={`tel:${contactInfo.phone}`} className="text-gray-200 hover:text-fashion-pink transition-colors">
                {contactInfo.phone}
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-fashion-pink" />
              <span className="text-gray-200">{contactInfo.address}</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-6"
          >
            {contactInfo.social_media.instagram && (
              <a
                href={`https://instagram.com/${contactInfo.social_media.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-fashion-pink transition-colors"
              >
                <Instagram className="w-8 h-8" />
              </a>
            )}
            {contactInfo.social_media.facebook && (
              <a
                href={`https://facebook.com/${contactInfo.social_media.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-fashion-pink transition-colors"
              >
                <Facebook className="w-8 h-8" />
              </a>
            )}
            {contactInfo.social_media.twitter && (
              <a
                href={`https://twitter.com/${contactInfo.social_media.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-fashion-pink transition-colors"
              >
                <Twitter className="w-8 h-8" />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};