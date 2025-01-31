import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface FooterLogoProps {
  variants: any;
}

export const FooterLogo = ({ variants }: FooterLogoProps) => {
  return (
    <motion.div variants={variants} className="relative">
      <img 
        src="/lovable-uploads/780caef1-834f-4fa7-a143-60c38ed8afe1.png" 
        alt="Fashionistas Logo" 
        className="h-12 mb-4 object-contain"
      />
      <p className="mb-6 text-white/60">
        Join our newsletter for the latest updates and exclusive offers.
      </p>
      <form className="relative group">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full pr-12 bg-white/5 border-white/10 focus:border-white/20 transition-colors duration-300 rounded-md px-3 py-2"
        />
        <button
          type="submit"
          className="absolute right-1 top-1 h-8 w-8 rounded-full bg-maroon text-white transition-all duration-300 hover:bg-maroon-light group-hover:scale-105 flex items-center justify-center"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Subscribe</span>
        </button>
      </form>
    </motion.div>
  );
};