import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface FooterQuickLinksProps {
  variants: any;
  scrollToSection: (sectionId: string) => void;
}

export const FooterQuickLinks = ({ variants, scrollToSection }: FooterQuickLinksProps) => {
  return (
    <motion.div variants={variants}>
      <h3 className="mb-4 text-lg font-semibold text-white/90">Quick Links</h3>
      <nav className="space-y-2 text-sm">
        <a 
          href="#home" 
          onClick={() => scrollToSection('home')}
          className="block text-white/60 transition-colors hover:text-white"
        >
          Home
        </a>
        <Link 
          to="/about" 
          className="block text-white/60 transition-colors hover:text-white"
        >
          About Us
        </Link>
        <Link 
          to="/events" 
          className="block text-white/60 transition-colors hover:text-white"
        >
          Events
        </Link>
        <a 
          href="#tickets" 
          onClick={() => scrollToSection('tickets')}
          className="block text-white/60 transition-colors hover:text-white"
        >
          Tickets
        </a>
        <Link 
          to="/sponsors" 
          className="block text-white/60 transition-colors hover:text-white"
        >
          Sponsors
        </Link>
        <Link 
          to="/models" 
          className="block text-white/60 transition-colors hover:text-white"
        >
          Models
        </Link>
        <Link 
          to="/designers" 
          className="block text-white/60 transition-colors hover:text-white"
        >
          Designers
        </Link>
        <a 
          href="#contact" 
          onClick={() => scrollToSection('contact')}
          className="block text-white/60 transition-colors hover:text-white"
        >
          Contact
        </a>
      </nav>
    </motion.div>
  );
};