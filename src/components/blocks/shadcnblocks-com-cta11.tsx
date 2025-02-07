import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Cta11Props {
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
      className?: string;
    };
    secondary?: {
      text: string;
      url: string;
      className?: string;
    };
  };
}

const Cta11 = ({
  heading = "Ready to Get Started?",
  description = "Join thousands of satisfied customers using our platform to build amazing websites.",
  buttons = {
    primary: {
      text: "Get Started",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "Learn More",
      url: "https://www.shadcnblocks.com",
    },
  },
}: Cta11Props) => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-maroon/20 to-purple-vivid/20 backdrop-blur-3xl" />
      
      <div className="container flex items-center justify-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center rounded-2xl bg-gradient-to-br from-maroon to-purple-vivid p-8 text-center md:rounded-3xl lg:p-16 w-full max-w-4xl shadow-2xl"
        >
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-3 max-w-3xl text-2xl font-bold md:mb-4 md:text-4xl lg:mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
          >
            {heading}
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-8 max-w-2xl text-white/80 lg:text-lg"
          >
            {description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex w-full flex-col justify-center gap-4 sm:flex-row"
          >
            {buttons.secondary && (
              <Button 
                variant="outline" 
                className={`w-full sm:w-auto border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 ${buttons.secondary.className || ''}`}
                asChild
              >
                <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
              </Button>
            )}
            {buttons.primary && (
              <Button 
                className={`w-full sm:w-auto bg-white text-maroon hover:bg-white/90 transition-all duration-300 ${buttons.primary.className || ''}`}
                asChild
              >
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export { Cta11 };