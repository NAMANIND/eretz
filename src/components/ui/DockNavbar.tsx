"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Folder,
  Mail,
  MapPin,
  User,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { HoverAnimation } from "./HoverAnimation";
import Link from "next/link";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const DockNavbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { id: "about", label: "About", href: "#about", icon: <User size={20} /> },
    {
      id: "what-we-do",
      label: "What We Do",
      href: "#what-we-do",
      icon: <Briefcase size={20} />,
    },
    {
      id: "projects",
      label: "Projects",
      href: "#projects",
      icon: <Folder size={20} />,
    },
    {
      id: "why-dubai",
      label: "Why Dubai",
      href: "#why-dubai",
      icon: <MapPin size={20} />,
    },
    {
      id: "contact",
      label: "Contact",
      href: "#contact",
      icon: <Mail size={20} />,
    },
  ];

  // Track active section and scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Toggle navbar style after 100vh scroll
      setIsScrolled(scrollY > viewportHeight);

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
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {!isMobileMenuOpen && (
        <motion.nav
          className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out ${
            isScrolled ? "backdrop-blur-2xl shadow-md" : "backdrop-blur-2xl"
          }`}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className=" container-et  !flex-row justify-between  h-[60px] py-4">
            {/* Mobile left: hamburger */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="lg:hidden p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              <Menu
                size={24}
                className={isScrolled ? "text-black" : "text-white"}
              />
            </button>

            {/* Center logo */}
            <img
              src={isScrolled ? "/logo-black.svg" : "/logo.svg"}
              alt="logo"
              height={100}
              className="h-[20px]  transition-all duration-500 ease-in-out"
            />

            {/* Mobile right: phone icon */}
            <Link href="tel:+18556531901" className="lg:hidden p-2">
              <Phone
                size={22}
                className={isScrolled ? "text-black" : "text-white"}
              />
            </Link>

            {/* Desktop right side content */}
            <div className="hidden lg:flex items-center space-x-10">
              <div className="flex items-center gap-x-8">
                {navItems.map((item) => (
                  <Link href={item.href} key={item.id}>
                    <h3
                      key={item.id}
                      className="relative group cursor-pointer"
                      onClick={() => handleNavClick(item.href)}
                    >
                      <HoverAnimation
                        className={`bg-clip-text leading-[1.3] transition-colors duration-500 ease-in-out ${
                          isScrolled ? "text-black" : "text-white"
                        }`}
                        duration={0.6}
                        stagger={0.02}
                      >
                        {item.label}
                      </HoverAnimation>
                      <div className="absolute bottom-0 right-0 h-[1px] w-full overflow-hidden">
                        <div
                          className={`h-full ${
                            isScrolled ? "bg-black" : "bg-white"
                          } transform scale-x-0 origin-right transition-transform duration-700 ease-in-out group-hover:scale-x-100 group-hover:origin-left`}
                        ></div>
                      </div>
                    </h3>
                  </Link>
                ))}
              </div>

              <Link href="tel:+18556531901">
                <h3
                  className={`text-sm text-muted-foreground relative group cursor-pointer leading-[1.2] pb-1 transition-colors duration-500 ease-in-out inline-block whitespace-nowrap ${
                    isScrolled ? "text-black" : "text-white"
                  }`}
                >
                  +1 (855) 653-1901
                  <div className="absolute bottom-0 right-0 h-[1px] w-full overflow-hidden">
                    <div
                      className={`h-full ${
                        isScrolled ? "bg-black" : "bg-white"
                      } transform scale-x-0 origin-right transition-transform duration-700 ease-in-out group-hover:scale-x-100 group-hover:origin-left`}
                    ></div>
                  </div>
                </h3>
              </Link>
            </div>
          </div>
        </motion.nav>
      )}

      {/* Full-screen mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-40 lg:hidden bg-white"
        >
          {/* Menu content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full w-full flex flex-col"
          >
            {/* Header with close button */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
              className="flex items-center justify-between p-4 border-b border-gray-100"
            >
              <img src="/logo-black.svg" alt="logo" className="h-6 w-auto" />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <X size={24} className="text-black" />
              </button>
            </motion.div>

            {/* Navigation items */}
            <nav className="flex-1 flex flex-col justify-center px-6">
              <div className="space-y-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2 + index * 0.1,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className="group block"
                    >
                      <span className="text-3xl font-medium text-black hover:text-gray-600 transition-colors duration-300">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Footer with phone */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.2 + navItems.length * 0.1,
                duration: 0.4,
                ease: "easeOut",
              }}
              className="p-6 border-t border-gray-100"
            >
              <Link
                href="tel:+18556531901"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center gap-3 text-lg font-light text-gray-600 hover:text-black transition-colors duration-300"
              >
                <Phone size={20} />
                +1 (855) 653-1901
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default DockNavbar;
