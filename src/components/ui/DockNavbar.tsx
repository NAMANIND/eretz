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
      <motion.nav
        className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out ${
          isScrolled ? "backdrop-blur-2xl shadow-md" : "backdrop-blur-2xl"
        }`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between container mx-auto h-[60px] py-l">
          {/* Mobile left: hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
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
          <Link href="tel:+18556531901" className="md:hidden p-2">
            <Phone
              size={22}
              className={isScrolled ? "text-black" : "text-white"}
            />
          </Link>

          {/* Desktop right side content */}
          <div className="hidden md:flex items-center space-x-10">
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

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <motion.aside
          id="mobile-menu"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed inset-0 z-40 md:hidden"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            className={`relative h-full w-4/5 max-w-xs bg-white shadow-xl p-6 ${
              isScrolled ? "" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-8">
              <img src="/logo-black.svg" alt="logo" className="h-6 w-auto" />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <Menu size={22} />
              </button>
            </div>
            <nav className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                >
                  <span className="text-lg font-medium text-black">
                    {item.label}
                  </span>
                </Link>
              ))}
              <Link
                href="tel:+18556531901"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-lg font-medium text-black inline-flex items-center gap-2">
                  <Phone size={18} /> Call Us
                </span>
              </Link>
            </nav>
          </div>
        </motion.aside>
      )}
    </>
  );
};

export default DockNavbar;
