"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon, Home, Calendar, Ticket, Users, Heart, Briefcase, MessageSquare, Globe, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  children?: { name: string; url: string }[]
}

interface NavBarProps {
  items?: NavItem[]
  className?: string
}

const defaultItems: NavItem[] = [
  { name: 'Home', url: '#home', icon: Home },
  { 
    name: 'Event Details', 
    url: '#about', 
    icon: Calendar,
    children: [
      { name: 'Schedule', url: '#schedule' },
      { name: 'Venue', url: '#venue' },
      { name: 'FAQ', url: '#faq' }
    ]
  },
  { name: 'Tickets', url: '#tickets', icon: Ticket },
  { 
    name: 'Designers & Models', 
    url: '#team', 
    icon: Users,
    children: [
      { name: 'Featured Designers', url: '#designers' },
      { name: 'Model Lineup', url: '#models' },
      { name: 'Apply', url: '#apply' }
    ]
  },
  { name: 'Sponsors', url: '#sponsors', icon: Briefcase },
  { name: 'Contact', url: '#contact', icon: MessageSquare }
]

export function NavBar({ items = defaultItems, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

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
          className="relative w-12 h-12 hover:brightness-125 transition-all"
          aria-label="Fashionistas Home"
        >
          <img 
            src="/fashionistas-logo.png" 
            alt="Fashionistas Logo"
            className="w-full h-full object-contain"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-3 bg-white/5 backdrop-blur-lg py-1 px-1 rounded-full">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name
            const hasDropdown = item.children && item.children.length > 0

            return (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => hasDropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
              >
                <a
                  href={item.url}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveTab(item.name)
                    const element = document.querySelector(item.url)
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={cn(
                    "relative cursor-pointer text-sm font-montserrat font-semibold px-6 py-2 rounded-full transition-colors flex items-center gap-1",
                    "text-white/80 hover:text-fashion-pink",
                    isActive && "text-fashion-pink"
                  )}
                >
                  <span className="hidden md:inline">{item.name}</span>
                  {hasDropdown && <ChevronDown className="w-4 h-4" />}
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
                {hasDropdown && openDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-48 py-2 bg-black/95 backdrop-blur-lg rounded-lg shadow-xl">
                    {item.children?.map((child) => (
                      <a
                        key={child.name}
                        href={child.url}
                        className="block px-4 py-2 text-sm text-white/80 hover:text-fashion-pink hover:bg-white/5"
                        onClick={(e) => {
                          e.preventDefault()
                          const element = document.querySelector(child.url)
                          element?.scrollIntoView({ behavior: 'smooth' })
                          setOpenDropdown(null)
                        }}
                      >
                        {child.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center space-x-6">
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
          <div className="container px-4 py-8 flex flex-col space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col"
              >
                <a
                  href={item.url}
                  className="text-white/90 hover:text-white font-montserrat text-lg flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </a>
                {item.children && (
                  <div className="ml-7 mt-2 flex flex-col gap-2">
                    {item.children.map((child) => (
                      <a
                        key={child.name}
                        href={child.url}
                        className="text-white/70 hover:text-white text-base"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {child.name}
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
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