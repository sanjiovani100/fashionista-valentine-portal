"use client"

import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Logo } from "./navbar/Logo"
import { DesktopNav } from "./navbar/DesktopNav"
import { RightActions } from "./navbar/RightActions"
import { MobileMenu } from "./navbar/MobileMenu"
import { MobileMenuButton } from "./navbar/MobileMenuButton"
import { useLocation, useNavigate } from "react-router-dom"

interface NavItem {
  name: string;
  url: string;
  type: 'hash' | 'route';
  disabled?: boolean;
}

const defaultItems: NavItem[] = [
  { name: 'Home', url: '#home', type: 'hash' },
  { name: 'About', url: '/about', type: 'route' },
  { name: 'Events', url: '/events', type: 'route' },
  { name: 'Tickets', url: '#tickets', type: 'hash' },
  { name: 'Contact', url: '#contact', type: 'hash', disabled: true }
]

export function NavBar() {
  const [activeTab, setActiveTab] = useState(defaultItems[0].name)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

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

  useEffect(() => {
    const path = location.pathname
    const hash = location.hash
    
    const currentItem = defaultItems.find(item => {
      if (item.type === 'route') return item.url === path
      return item.url === hash
    })
    
    if (currentItem) {
      setActiveTab(currentItem.name)
    }
  }, [location])

  const handleNavigation = (item: NavItem) => {
    if (item.disabled) {
      return
    }

    if (item.type === 'route') {
      navigate(item.url)
    } else {
      const element = document.querySelector(item.url)
      if (element) {
        const navbarHeight = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      }
    }
    setActiveTab(item.name)
    if (isMenuOpen) setIsMenuOpen(false)
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        isScrolled ? "h-16 bg-black" : "h-20 bg-transparent"
      )}
    >
      <div className="container h-full mx-auto px-4 flex items-center justify-between">
        <Logo />
        <DesktopNav 
          items={defaultItems} 
          activeTab={activeTab} 
          onNavigate={handleNavigation}
        />
        <RightActions />
        <MobileMenuButton 
          isOpen={isMenuOpen} 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
        />
        <MobileMenu 
          isOpen={isMenuOpen}
          items={defaultItems}
          activeTab={activeTab}
          onNavigate={handleNavigation}
        />
      </div>
    </nav>
  )
}