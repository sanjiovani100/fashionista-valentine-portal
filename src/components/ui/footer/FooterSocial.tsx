import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Moon, Sun, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FooterSocialProps {
  variants: any;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export const FooterSocial = ({ variants, isDarkMode, setIsDarkMode }: FooterSocialProps) => {
  return (
    <motion.div variants={variants} className="relative">
      <h3 className="mb-4 text-lg font-semibold text-white/90">Follow Us</h3>
      <div className="mb-6 flex space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Follow us on Facebook</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Follow us on Twitter</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Follow us on Instagram</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Connect with us on LinkedIn</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex items-center space-x-2 text-white/60">
        <Sun className="h-4 w-4" />
        <Switch
          id="dark-mode"
          checked={isDarkMode}
          onCheckedChange={setIsDarkMode}
          className="data-[state=checked]:bg-maroon"
        />
        <Moon className="h-4 w-4" />
        <Label htmlFor="dark-mode" className="sr-only">
          Toggle dark mode
        </Label>
      </div>
    </motion.div>
  );
};