import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export const ContactInfo = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-fashion-pink mb-6">Contact Information</h2>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-fashion-pink mt-1" />
          <div>
            <h3 className="font-semibold">Location</h3>
            <p className="text-gray-200">
              123 Fashion Avenue<br />
              Style District, NY 10001
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Mail className="w-6 h-6 text-fashion-pink mt-1" />
          <div>
            <h3 className="font-semibold">Email</h3>
            <p className="text-gray-200">
              General: info@fashionistas.com<br />
              Support: support@fashionistas.com<br />
              Press: press@fashionistas.com
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Phone className="w-6 h-6 text-fashion-pink mt-1" />
          <div>
            <h3 className="font-semibold">Phone</h3>
            <p className="text-gray-200">
              Main: +1 (555) 123-4567<br />
              Toll-free: 1-800-555-0123
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-fashion-pink/20">
          <h3 className="font-semibold mb-4">Connect With Us</h3>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/fashionistas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fashion-pink hover:text-fashion-pink/80 transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://facebook.com/fashionistas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fashion-pink hover:text-fashion-pink/80 transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/fashionistas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fashion-pink hover:text-fashion-pink/80 transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};