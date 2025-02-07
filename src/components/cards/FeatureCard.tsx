import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  link
}: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="
        w-full
        lg:w-[280px] lg:h-[320px]
        md:w-[240px] md:h-[280px]
        bg-black/20 border-white/10 hover:border-white/20
        p-6 space-y-4
      ">
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-fashion-pink/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-fashion-pink" />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold font-montserrat text-white">{title}</h3>
          <p className="text-base font-inter text-white/70">{description}</p>
        </div>

        {/* Optional Link */}
        {link && (
          <a
            href={link.href}
            className="inline-block text-fashion-pink hover:text-fashion-pink/80 transition-colors"
          >
            {link.text}
          </a>
        )}
      </Card>
    </motion.div>
  );
}; 