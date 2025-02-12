"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { FooterLogo } from "./footer/FooterLogo"
import { FooterQuickLinks } from "./footer/FooterQuickLinks"
import { FooterContact } from "./footer/FooterContact"
import { FooterSocial } from "./footer/FooterSocial"
import { FooterCopyright } from "./footer/FooterCopyright"

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative border-t border-white/10 bg-black text-foreground transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/95 backdrop-blur-xl" />
      
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16 md:px-6 lg:px-8 relative z-10"
      >
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <FooterLogo variants={item} />
          <FooterQuickLinks variants={item} scrollToSection={scrollToSection} />
          <FooterContact variants={item} />
          <FooterSocial 
            variants={item} 
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        </div>

        <FooterCopyright variants={item} />
      </motion.div>
    </footer>
  )
}

export { Footerdemo }


