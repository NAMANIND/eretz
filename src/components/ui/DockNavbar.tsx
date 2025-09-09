"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Mail, User } from "lucide-react";
import LiquidGlass from "./LiquidGlass";
import { HoverAnimation } from "./HoverAnimation";
import Link from "next/link";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const DockNavbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("");
  const navItems = [
    { id: "about", label: "About", href: "#about", icon: <User size={20} /> },
    {
      id: "what-we-do",
      label: "What We Do",
      href: "#what-we-do",
      icon: <Briefcase size={20} />,
    },
    {
      id: "contact",
      label: "Contact",
      href: "#contact",
      icon: <Mail size={20} />,
    },
  ];

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 justify-between items-center flex w-7xl`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <img src="/logo.svg" alt="logo" width={100} height={100} />

      <div className="flex items-center space-x-10">
        <LiquidGlass borderRadius="4xl" className="px-4 py-1 rounded-4xl">
          <div className="flex items-center gap-x-8">
            {navItems.map((item) => (
              <Link href={item.href} key={item.id}>
                <h3
                  key={item.id}
                  className="relative group cursor-pointer"
                  onClick={() => handleNavClick(item.href)}
                >
                  <HoverAnimation
                    className=" bg-clip-text text-white leading-[0.95]"
                    duration={0.5}
                    stagger={0.01}
                  >
                    {item.label}
                  </HoverAnimation>
                  <div className="absolute bottom-0 right-0 h-[2px] w-full overflow-hidden">
                    <div className="h-full bg-white transform scale-x-0 origin-right transition-transform duration-700 ease-in-out group-hover:scale-x-100 group-hover:origin-left"></div>
                  </div>
                </h3>
              </Link>
            ))}
          </div>
        </LiquidGlass>

        <Link href="tel:+18556531901">
          <h3 className="text-sm text-muted-foreground relative group cursor-pointer">
            <HoverAnimation
              className=" bg-clip-text text-white leading-[1.1]"
              duration={0.8}
              stagger={0.01}
            >
              +1 (855) 653-1901
            </HoverAnimation>
            <div className="absolute bottom-0 right-0 h-[1px] w-full overflow-hidden">
              <div className="h-full bg-white transform scale-x-0 origin-right transition-transform duration-1000 ease-in-out group-hover:scale-x-100 group-hover:origin-left"></div>
            </div>
          </h3>
        </Link>
      </div>
    </motion.nav>
  );
};

export default DockNavbar;
