import React from 'react';
import { PageLayout } from "@/components/layout/PageLayout";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { SponsorRegistrationForm } from '@/components/forms/sponsor/SponsorRegistrationForm';

const SponsorRegistration = () => {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-black via-deep-purple to-black py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <Link 
            to="/register" 
            className="inline-flex items-center text-fashion-pink hover:text-fashion-pink/80 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Role Selection
          </Link>

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-playfair mb-4">Sponsor Application</h1>
            <p className="text-xl text-gray-300 font-montserrat">Partner with us to make this event unforgettable</p>
          </div>

          <SponsorRegistrationForm />
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default SponsorRegistration;