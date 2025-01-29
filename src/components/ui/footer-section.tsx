"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

function Footerdemo() {
  const [isDarkMode, setIsDarkMode] = React.useState(true)

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-background to-background/80 text-foreground transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-maroon/5 to-purple-vivid/5 backdrop-blur-xl" />
      
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16 md:px-6 lg:px-8 relative z-10"
      >
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={item} className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Stay Connected
            </h2>
            <p className="mb-6 text-white/60">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="relative group">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 bg-white/5 border-white/10 focus:border-white/20 transition-colors duration-300"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-maroon text-white transition-all duration-300 hover:bg-maroon-light group-hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="mb-4 text-lg font-semibold text-white/90">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a href="#" className="block text-white/60 transition-colors hover:text-white">Home</a>
              <a href="#" className="block text-white/60 transition-colors hover:text-white">About Us</a>
              <a href="#" className="block text-white/60 transition-colors hover:text-white">Services</a>
              <a href="#" className="block text-white/60 transition-colors hover:text-white">Products</a>
              <a href="#" className="block text-white/60 transition-colors hover:text-white">Contact</a>
            </nav>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="mb-4 text-lg font-semibold text-white/90">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic text-white/60">
              <p>123 Innovation Street</p>
              <p>Tech City, TC 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: hello@example.com</p>
            </address>
          </motion.div>

          <motion.div variants={item} className="relative">
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
        </div>

        <motion.div 
          variants={item}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row"
        >
          <p className="text-sm text-white/60">
            © 2024 Your Company. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="text-white/60 transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 transition-colors hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-white/60 transition-colors hover:text-white">
              Cookie Settings
            </a>
          </nav>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export { Footerdemo }