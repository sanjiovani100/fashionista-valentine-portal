import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ContactHero } from './components/ContactHero';
import { ContactForm } from './components/ContactForm';
import { ContactInfo } from './components/ContactInfo';
import { ContactFAQ } from './components/ContactFAQ';
import { Toaster } from 'sonner';

export const ContactPage = () => {
  return (
    <PageLayout>
      <Toaster />
      <ContactHero />
      <div className="container mx-auto px-4 py-12 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContactForm />
          <ContactInfo />
        </div>
        <ContactFAQ />
      </div>
    </PageLayout>
  );
};

export default ContactPage;