import React from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram } from 'lucide-react';

export const ContactInfo = () => {
  return (
    <div className="bg-card border rounded-lg p-6 space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Contact Information</h2>
        <p className="text-muted-foreground">
          Get in touch with us through any of these channels
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <MapPin className="w-5 h-5 mt-1 text-primary" />
          <div>
            <h3 className="font-medium">Address</h3>
            <p className="text-muted-foreground">
              123 Fashion Avenue<br />
              Toronto, ON M5V 2T6<br />
              Canada
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Mail className="w-5 h-5 mt-1 text-primary" />
          <div>
            <h3 className="font-medium">Email</h3>
            <p className="text-muted-foreground">
              General: info@fashionistas.com<br />
              Support: support@fashionistas.com<br />
              Press: press@fashionistas.com
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Phone className="w-5 h-5 mt-1 text-primary" />
          <div>
            <h3 className="font-medium">Phone</h3>
            <p className="text-muted-foreground">
              Main: +1 (416) 555-0123<br />
              Toll-free: 1-800-555-0123
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="w-5 h-5 mt-1 text-primary" />
          <div>
            <h3 className="font-medium">Business Hours</h3>
            <p className="text-muted-foreground">
              Monday - Friday: 9:00 AM - 6:00 PM EST<br />
              Saturday: 10:00 AM - 4:00 PM EST<br />
              Sunday: Closed
            </p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-medium mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://facebook.com/fashionistas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com/fashionistas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};