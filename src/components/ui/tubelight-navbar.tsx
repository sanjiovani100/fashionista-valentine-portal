"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon, Home, Calendar, Ticket, Users, Heart, Briefcase, MessageSquare, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items?: NavItem[]
  className?: string
}

const defaultItems: NavItem[] = [
  { name: 'Home', url: '#home', icon: Home },
  { name: 'Event', url: '#about', icon: Calendar },
  { name: 'Tickets', url: '#tickets', icon: Ticket },
  { name: 'Designers', url: '#designers', icon: Heart },
  { name: 'Sponsors', url: '#sponsors', icon: Briefcase },
  { name: 'Models', url: '#models', icon: Users },
  { name: 'Contact', url: '#contact', icon: MessageSquare },
]

export function NavBar({ items = defaultItems, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

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
        isScrolled ? "h-16 bg-black/95" : "h-20 bg-transparent",
        className
      )}
    >
      <div className="container h-full mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="font-playfair text-2xl font-bold text-white hover:brightness-125 transition-all"
        >
          Fashionistas
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-3 bg-white/5 backdrop-blur-lg py-1 px-1 rounded-full">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
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
                  "relative cursor-pointer text-sm font-montserrat font-semibold px-6 py-2 rounded-full transition-colors",
                  "text-white/80 hover:text-fashion-pink",
                  isActive && "text-fashion-pink"
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-fashion-pink/5 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-fashion-pink rounded-t-full">
                      <div className="absolute w-12 h-6 bg-fashion-pink/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-fashion-pink/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-fashion-pink/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </a>
            )
          })}
        </div>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center space-x-6">
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

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          <div className="container px-4 py-8 flex flex-col space-y-6">
            {items.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-white/90 hover:text-white font-montserrat text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: items.length * 0.1 }}
              className="pt-4 flex items-center justify-between"
            >
              <button className="text-white/90 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </button>
              <Button 
                className="bg-gradient-to-r from-fashion-pink to-deep-purple hover:brightness-110 active:brightness-90 transition-all duration-300"
                size="sm"
              >
                Get Tickets
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Progress */}
        <div 
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-fashion-pink to-deep-purple"
          style={{ 
            width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`,
            transition: 'width 0.1s ease-out'
          }}
        />
      </div>
    </nav>
  )
}