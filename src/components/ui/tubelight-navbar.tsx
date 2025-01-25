"use client"

import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Logo } from "./navbar/Logo"
import { DesktopNav } from "./navbar/DesktopNav"
import { RightActions } from "./navbar/RightActions"
import { MobileMenu } from "./navbar/MobileMenu"
import { MobileMenuButton } from "./navbar/MobileMenuButton"

const defaultItems = [
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
        <Logo />
        <DesktopNav 
          items={defaultItems} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        <RightActions />
        <MobileMenuButton 
          isOpen={isMenuOpen} 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
        />
        <MobileMenu 
          isOpen={isMenuOpen} 
          items={defaultItems} 
          onClose={() => setIsMenuOpen(false)} 
        />
      </div>
    </nav>
  )
}