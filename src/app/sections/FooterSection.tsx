"use client";

import React, { useState } from "react";
import { GSAPTextReveal } from "@/components/ui/GSAPTextReveal";
import { motion } from "framer-motion";
import { toast } from "sonner";

const FooterSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    message: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterName, setNewsletterName] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
    setIsFormOpen(false);
    setFormData({ firstName: "", email: "", message: "" });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newsletterName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!newsletterEmail.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubscribing(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newsletterName, email: newsletterEmail }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to subscribe");
      }

      toast.success("Thank you for subscribing! We'll keep you updated.");
      setNewsletterEmail("");
      setNewsletterName("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubscribing(false);
    }
  };

  const navItems = [
    { id: "about", label: "About", href: "#about" },
    {
      id: "what-we-do",
      label: "What We Do",
      href: "#what-we-do",
    },
    {
      id: "projects",
      label: "Projects",
      href: "#projects",
    },
    {
      id: "why-eretz",
      label: "Why Eretz",
      href: "#why-eretz",
    },
  ];

  return (
    <>
      {/* Main Contact + Footer Section */}
      <section className="relative lg:sticky lg:-bottom-20 bg-black text-white overflow-hidden">
        <footer className="relative z-10 py-et container-et">
          <div className="w-full">
            <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-24 mb-10">
              <div className="w-full lg:w-1/2 flex flex-col sm:flex-row gap-8 lg:gap-16">
                {/* About ERETZ */}
                <div className="w-full sm:w-1/2">
                  <h3 className="text-base sm:text-lg font-normal font-krona text-white mb-4 sm:mb-6">
                    <GSAPTextReveal
                      splitBy="words"
                      animationType="slideUp"
                      stagger={0.1}
                      duration={0.8}
                      delay={0.2}
                    >
                      ABOUT ERETZ
                    </GSAPTextReveal>
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    {navItems.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.href}
                          className="text-gray-300 hover:text-white transition-colors text-sm"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div className="w-full sm:w-1/2">
                  <h3 className="text-base sm:text-lg font-normal font-krona text-white mb-4 sm:mb-6">
                    <GSAPTextReveal
                      splitBy="words"
                      animationType="slideUp"
                      stagger={0.1}
                      duration={0.8}
                      delay={0.4}
                    >
                      CONTACT
                    </GSAPTextReveal>
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    <li>
                      <a
                        href="mailto:info@eretzdevelopers.com"
                        className="text-gray-300 hover:text-white transition-colors text-sm break-all"
                      >
                        info@eretzdevelopers.com
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+971543574545"
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        +971 54 357 4545
                      </a>
                    </li>
                    <li>
                      <span className="text-gray-300 text-sm">Dubai, UAE</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Get Updates */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-base sm:text-lg font-normal font-krona text-white mb-4 sm:mb-6">
                  <GSAPTextReveal
                    splitBy="words"
                    animationType="slideUp"
                    stagger={0.1}
                    duration={0.8}
                    delay={0.5}
                  >
                    STAY UPDATED
                  </GSAPTextReveal>
                </h3>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  Get the latest updates on our projects and investment
                  opportunities.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={newsletterName}
                        onChange={(e) => setNewsletterName(e.target.value)}
                        placeholder="Your name"
                        disabled={isSubscribing}
                        className="w-full bg-transparent border-0 border-b border-gray-600 px-0 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ color: "white" }}
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => {
                          console.log("Input changed:", e.target.value);
                          setNewsletterEmail(e.target.value);
                        }}
                        placeholder="Your email address"
                        disabled={isSubscribing}
                        className="w-full bg-transparent border-0 border-b border-gray-600 px-0 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ color: "white" }}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isSubscribing}
                      className="w-full lg:w-auto lg:flex-shrink-0 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed lg:self-end"
                      whileHover={{ scale: isSubscribing ? 1 : 1.02 }}
                      whileTap={{ scale: isSubscribing ? 1 : 0.98 }}
                    >
                      Subscribe
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex logo justify-center w-full h-24 sm:h-40 lg:h-full linear-wipe">
              <img
                src="/logo.svg"
                alt="ERETZ"
                className="w-full h-full opacity-[0.1] object-contain"
              />
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 text-xs sm:text-sm text-white  ">
              <div className="text-center lg:text-right">
                <span>Building Beyond Bricks.</span>
              </div>
              {/* <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="flex items-center gap-4">
                  <a href="#" className="hover:text-gray-300 transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="hover:text-gray-300 transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="hover:text-gray-300 transition-colors">
                    Twitter
                  </a>
                </div>
              </div> */}

              <div className="flex flex-col lg:flex-row items-center gap-6">
                <span>
                  © {new Date().getFullYear()} ERETZ DEVELOPERS. ALL RIGHTS
                  RESERVED
                </span>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};

export default FooterSection;
