import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface HeroContentProps {
  role: "model" | "designer" | "sponsor";
}

export const HeroContent = ({ role }: HeroContentProps) => {
  const { t } = useTranslation('home');

  return (
    <div className="container relative z-20 max-w-[800px] mx-auto px-4 py-16">
      <div className="text-center space-y-8">
        <motion.h1 
          id="hero-title"
          className="font-poppins text-hero font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('hero.title')}
        </motion.h1>
        
        <motion.p 
          className="font-montserrat text-body-large text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          role="group"
          aria-label={t('cta.primary')}
        >
          <Button 
            size="lg"
            className="bg-primary-gradient hover:bg-hover-gradient active:bg-active-gradient
                     backdrop-blur-sm border border-white/10
                     min-w-[200px] h-[48px] px-8 font-medium
                     transition-all duration-300 ease-out transform hover:scale-105
                     hover:shadow-[0_0_20px_rgba(255,0,204,0.3)]"
          >
            {t('cta.primary')}
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="bg-black/20 backdrop-blur-sm border border-white/10
                     min-w-[200px] h-[48px] px-8 font-medium
                     transition-all duration-300 hover:bg-black/40
                     transform hover:scale-105
                     hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            {t('cta.secondary')}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};


