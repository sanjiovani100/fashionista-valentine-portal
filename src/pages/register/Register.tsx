import React from 'react';
import { PageLayout } from "@/components/layout/PageLayout";
import { RegistrationForm } from "@/components/forms/registration/RegistrationForm";
import { motion } from "framer-motion";

const Register = () => {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-black via-deep-purple to-black py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-playfair mb-4">Join the Experience</h1>
            <p className="text-xl text-gray-300 font-montserrat">Begin your journey with Fashionistas</p>
          </div>
          <RegistrationForm />
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Register;