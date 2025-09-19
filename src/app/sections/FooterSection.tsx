"use client";

import React, { useState } from "react";
import { GSAPTextReveal } from "@/components/ui/GSAPTextReveal";
import { motion } from "framer-motion";

const FooterSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    message: "",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
    setIsFormOpen(false);
    setFormData({ firstName: "", email: "", message: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {/* Main Contact + Footer Section */}
      <section className="relative lg:sticky lg:-bottom-20 bg-black text-white overflow-hidden -z-20">
        <footer className="relative z-10 py-14 container-et">
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
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full bg-black border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors text-sm"
                  />
                  <button className="w-full bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center w-full h-24 sm:h-40 lg:h-full">
              <img
                src="/logo.svg"
                alt="ERETZ"
                className="w-full h-full opacity-[0.1] object-contain"
              />
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 text-xs sm:text-sm text-white -mt-4 lg:-mt-6 px-4">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <span>©2025 ERETZ PROPERTIES. ALL RIGHTS RESERVED</span>
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
              <div className="text-center lg:text-right">
                <span>Crafting Legacies That Last Generations</span>
              </div>
            </div>
          </div>
        </footer>
      </section>

      {/* Contact Form Modal */}
      {isFormOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-gray-800 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-normal font-krona text-white">
                GET IN TOUCH
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400 hover:text-white text-2xl transition-colors p-1"
              >
                ×
              </button>
            </div>

            <p className="text-gray-300 mb-8 leading-relaxed">
              Ready to start your investment journey with ERETZ? Fill out the
              form below and our team will get back to you within 24 hours.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-white mb-3"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white bg-gray-700 transition-all"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white mb-3"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white bg-gray-700 transition-all"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white mb-3"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Tell us about your investment goals and how we can help..."
                  className="w-full px-4 py-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white bg-gray-700 resize-none transition-all"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <motion.button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 py-4 px-6 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="flex-1 py-4 px-6 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default FooterSection;
