import { motion, AnimatePresence } from "framer-motion";
import { cx } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  type: 'hash' | 'route';
  disabled?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  items: NavItem[];
  activeTab: string;
  onNavigate: (item: NavItem) => void;
}

export const MobileMenu = ({ isOpen, items, activeTab, onNavigate }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden fixed inset-x-0 top-[64px] bg-black/95 backdrop-blur-lg border-t border-white/10"
        >
          <nav className="container mx-auto py-4 px-4 flex flex-col space-y-2">
            {items.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavigate(item)}
                disabled={item.disabled}
                className={cx(
                  "w-full text-left px-4 py-3 rounded-lg transition-colors",
                  "text-white/80 hover:text-fashion-pink hover:bg-white/5",
                  activeTab === item.name && "text-fashion-pink bg-white/5",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


