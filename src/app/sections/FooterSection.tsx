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
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to subscribe");
      }

      toast.success("Thank you for subscribing! We'll keep you updated.");
      setNewsletterEmail("");
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

  return (
    <>
      {/* Main Contact + Footer Section */}
      <section className="relative lg:sticky lg:-bottom-20 bg-black text-white overflow-hidden">
        <footer className="relative z-10 py-et container-et">
          <div className="px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
              {/* About ERETZ */}
              <div>
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
                <ul className="space-y-4">
                  <li>
                    <a
                      href="#about"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      Our Story
                    </a>
                  </li>
                  <li>
                    <a
                      href="#projects"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      Projects
                    </a>
                  </li>
                  <li>
                    <a
                      href="#what-we-do"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      What We Do
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      Investment Opportunities
                    </a>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-base sm:text-lg font-normal font-krona text-white mb-4 sm:mb-6">
                  <GSAPTextReveal
                    splitBy="words"
                    animationType="slideUp"
                    stagger={0.1}
                    duration={0.8}
                    delay={0.3}
                  >
                    SERVICES
                  </GSAPTextReveal>
                </h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      Property Development
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      Investment Consulting
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      Property Management
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      Golden Visa Assistance
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
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
                <ul className="space-y-4">
                  <li>
                    <a
                      href="mailto:info@eretz.ae"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      info@eretz.ae
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+971-4-123-4567"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      +971 4 123 4567
                    </a>
                  </li>
                  <li>
                    <span className="text-gray-300 text-sm">Dubai, UAE</span>
                  </li>
                </ul>
              </div>

              {/* Get Updates */}
              <div>
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
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      console.log("Input changed:", e.target.value);
                      setNewsletterEmail(e.target.value);
                    }}
                    placeholder="Your email address"
                    disabled={isSubscribing}
                    className="w-full bg-black border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ color: "white" }}
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubscribing}
                    className="w-full bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubscribing ? 1 : 1.02 }}
                    whileTap={{ scale: isSubscribing ? 1 : 0.98 }}
                  >
                    {isSubscribing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </div>
                    ) : (
                      "Subscribe"
                    )}
                  </motion.button>
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
                <span>Crafting Legacies That Last Generations</span>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-6">
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
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-6">
                <span>©2025 ERETZ PROPERTIES. ALL RIGHTS RESERVED</span>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};

export default FooterSection;
