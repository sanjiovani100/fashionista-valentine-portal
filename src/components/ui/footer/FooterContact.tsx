import { motion } from "framer-motion";

interface FooterContactProps {
  variants: any;
}

export const FooterContact = ({ variants }: FooterContactProps) => {
  return (
    <motion.div variants={variants}>
      <h3 className="mb-4 text-lg font-semibold text-white/90">Contact Us</h3>
      <address className="space-y-2 text-sm not-italic text-white/60">
        <p>123 Innovation Street</p>
        <p>Tech City, TC 12345</p>
        <p>Phone: (123) 456-7890</p>
        <p>Email: hello@example.com</p>
      </address>
    </motion.div>
  );
};