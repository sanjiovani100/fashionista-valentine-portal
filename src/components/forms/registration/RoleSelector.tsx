import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Palette, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface RoleSelectorProps {
  selectedRole: string;
  onRoleSelect: (role: string) => void;
}

const roleInfo = {
  model: {
    icon: Camera,
    title: "Model",
    description: "Showcase your talent on the runway and be part of our exclusive fashion shows.",
    benefits: ["Professional portfolio opportunities", "Network with industry leaders", "Gain runway experience"]
  },
  designer: {
    icon: Palette,
    title: "Designer",
    description: "Present your collection to a curated audience of fashion enthusiasts and industry professionals.",
    benefits: ["Showcase your brand", "Connect with retailers", "Media exposure"]
  },
  sponsor: {
    icon: Building2,
    title: "Sponsor",
    description: "Partner with us to reach fashion-forward audiences and support emerging talent.",
    benefits: ["Brand visibility", "VIP event access", "Networking opportunities"]
  }
};

export const RoleSelector = ({ selectedRole, onRoleSelect }: RoleSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {Object.entries(roleInfo).map(([role, info], index) => {
        const Icon = info.icon;
        return (
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col"
          >
            <div className={`
              p-8 rounded-xl border backdrop-blur-md
              ${selectedRole === role ? 'bg-fashion-pink/10 border-fashion-pink' : 'bg-black/40 border-fashion-pink/20'}
              hover:border-fashion-pink/60 transition-all duration-300
            `}>
              <Icon className="w-12 h-12 mx-auto mb-4 text-fashion-pink" />
              <h3 className="text-2xl font-playfair text-center mb-4">{info.title}</h3>
              <p className="text-gray-300 text-center mb-6">{info.description}</p>
              <ul className="space-y-2 mb-6">
                {info.benefits.map((benefit, i) => (
                  <li key={i} className="text-sm text-gray-400 flex items-center">
                    <span className="w-1.5 h-1.5 bg-fashion-pink rounded-full mr-2" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => onRoleSelect(role)}
                variant={selectedRole === role ? 'default' : 'outline'}
                className={`w-full ${
                  selectedRole === role 
                    ? 'bg-gradient-to-r from-fashion-pink to-deep-purple' 
                    : 'hover:bg-fashion-pink/10'
                }`}
              >
                Apply as {info.title}
              </Button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};