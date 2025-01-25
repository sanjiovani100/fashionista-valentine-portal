"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavItem {
  name: string
  url: string
}

const defaultItems: NavItem[] = [
  { name: 'Home', url: '#home' },
  { name: 'Fashion', url: '#fashion' },
  { name: 'Tickets', url: '#tickets' },
  { name: 'Event', url: '#event' },
  { name: 'Contact Us', url: '#contact' }
]

export function NavBar() {
  const [activeTab, setActiveTab] = useState(defaultItems[0].name)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    
    handleResize()
    handleScroll()
    
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)
    
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "h-16 bg-black/95" : "h-20 bg-transparent"
      )}
    >
      <div className="container h-full mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="relative w-12 h-12 hover:brightness-125 transition-all"
          aria-label="Fashionistas Home"
        >
          <img 
            src="/lovable-uploads/780caef1-834f-4fa7-a143-60c38ed8afe1.png"
            alt="Fashionistas Logo"
            className="w-full h-full object-contain"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 bg-white/5 backdrop-blur-lg py-1 px-1 rounded-full">
          {defaultItems.map((item) => (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab(item.name)
                const element = document.querySelector(item.url)
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={cn(
                "relative px-2 py-1.5 rounded-full transition-colors text-sm font-montserrat",
                "text-white/80 hover:text-fashion-pink",
                activeTab === item.name && "text-fashion-pink"
              )}
            >
              {item.name}
              {activeTab === item.name && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 bg-fashion-pink/5 rounded-full -z-10"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <button 
            className="text-white/90 hover:text-white transition-colors"
            aria-label="Change Language"
          >
            <Globe className="w-5 h-5" />
          </button>
          <Button 
            className="bg-gradient-to-r from-fashion-pink to-deep-purple hover:brightness-110 active:brightness-90 transition-all duration-300 font-inter font-bold"
            size="sm"
          >
            Get Tickets
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : "100%" }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 top-16 bg-black/95 backdrop-blur-md lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          <div className="container px-4 py-8 flex flex-col space-y-4">
            {defaultItems.map((item) => (
              <a
                key={item.name}
                href={item.url}
                className="text-white/90 hover:text-white font-montserrat text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 flex items-center justify-between">
              <button className="text-white/90 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </button>
              <Button 
                className="bg-gradient-to-r from-fashion-pink to-deep-purple hover:brightness-110 active:brightness-90 transition-all duration-300"
                size="sm"
              >
                Get Tickets
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  )
}