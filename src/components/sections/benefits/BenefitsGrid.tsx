import * as React from 'react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface BenefitsGridProps {
  benefits: Benefit[];
  className?: string;
  role: "model" | "designer" | "sponsor";
  section?: string;
}

export const BenefitsGrid = ({ benefits, className, role, section = 'benefits' }: BenefitsGridProps) => {
  const { t } = useTranslation(role);

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8", className)}>
      {benefits.map((benefit, index) => (
        <motion.div
          key={benefit.title}
          className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm 
                     hover:bg-white/10 transition-all duration-300
                     transform hover:-translate-y-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <benefit.icon className="w-8 h-8 text-fashion-pink 
                                     group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <h3 className="text-h4 font-playfair mb-2 
                           group-hover:text-fashion-pink transition-colors duration-300">
                {t(`${section}.${benefit.title}.title`)}
              </h3>
              <p className="text-gray-300">
                {t(`${section}.${benefit.title}.description`)}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};