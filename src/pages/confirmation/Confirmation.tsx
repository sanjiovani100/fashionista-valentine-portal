import React from 'react';
import { PageLayout } from "@/components/layout/PageLayout";
import { useSearchParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');
  const applicationId = searchParams.get('id');
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-black via-deep-purple to-black py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <div className="max-w-2xl mx-auto text-center bg-black/40 backdrop-blur-md p-8 rounded-xl border border-fashion-pink/20">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-green-500" />
            <h1 className="text-4xl md:text-5xl font-playfair mb-4">Application Submitted!</h1>
            <p className="text-xl text-gray-300 font-montserrat mb-8">
              Thank you for applying to be a {role} at Fashionistas Valentine's Event.
            </p>
            <div className="space-y-4 mb-8 text-left bg-white/5 p-6 rounded-lg">
              <h2 className="text-2xl font-playfair mb-4">Next Steps</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  Our team will review your application within 2-3 business days.
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  You'll receive an email confirmation with your application details.
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  We'll schedule a follow-up call if additional information is needed.
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-gray-400">
                Your application ID: <span className="font-mono bg-white/10 px-2 py-1 rounded">{applicationId}</span>
              </p>
              <Button 
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-fashion-pink to-deep-purple hover:opacity-90"
              >
                Return to Homepage
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Confirmation;


