import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface HeroContentProps {
  headline: string;
  subheading: string;
}

export const HeroContent = ({ headline, subheading }: HeroContentProps) => {
  const { t } = useTranslation('home');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 md:space-y-12 text-center max-w-4xl mx-auto"
    >
      <motion.h1 
        variants={itemVariants}
        id="hero-title"
        className="font-montserrat text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-shadow-xl leading-tight"
      >
        <span className="text-white">{t('hero.title.main')}</span>{' '}
        <span className="text-red-500">{t('hero.title.sub')}</span>
      </motion.h1>
      
      <motion.p 
        variants={itemVariants}
        className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
      >
        {t('hero.description')}
      </motion.p>
      
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Button 
          size="lg" 
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {t('hero.buttons.getTickets')}
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
        >
          <Calendar className="mr-2 h-5 w-5" />
          {t('hero.buttons.date')}
        </Button>
      </motion.div>
    </motion.div>
  );
};


