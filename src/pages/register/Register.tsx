import React from 'react';
import { PageLayout } from "@/components/layout/PageLayout";
import { RoleSelector } from "@/components/forms/registration/RoleSelector";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    navigate(`/register/${role.toLowerCase()}`);
  };

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
            <p className="text-xl text-gray-300 font-montserrat mb-8">Begin your journey with Fashionistas</p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Select your role to start your application. Each role offers unique opportunities 
              to be part of our exclusive fashion event.
            </p>
          </div>
          <RoleSelector selectedRole="" onRoleSelect={handleRoleSelect} />
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Register;