import { motion } from "framer-motion";

interface FooterCopyrightProps {
  variants: any;
}

export const FooterCopyright = ({ variants }: FooterCopyrightProps) => {
  return (
    <motion.div 
      variants={variants}
      className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row"
    >
      <p className="text-sm text-white/60">
        © 2024 Fashionistas. All rights reserved.
      </p>
      <nav className="flex gap-4 text-sm">
        <a href="/privacy" className="text-white/60 transition-colors hover:text-white">
          Privacy Policy
        </a>
        <a href="/terms" className="text-white/60 transition-colors hover:text-white">
          Terms of Service
        </a>
        <a href="/cookies" className="text-white/60 transition-colors hover:text-white">
          Cookie Settings
        </a>
      </nav>
    </motion.div>
  );
};