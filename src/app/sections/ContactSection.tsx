"use client";

import React, { useState } from "react";
import { GSAPTextReveal } from "@/components/ui/GSAPTextReveal";
import { motion } from "framer-motion";

const ContactSection = () => {
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
      <section
        id="contact"
        className="relative bg-white text-gray-900 overflow-hidden pt-12 pb-8 px-6 lg:px-12"
      >
        {/* Hero/CTA Section */}
        <div className="relative z-10 text-center">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-4xl  font-normal mb-8 leading-[1.1] font-krona">
              <GSAPTextReveal
                splitBy="words"
                animationType="slideUp"
                stagger={0.1}
                duration={0.8}
                delay={0.2}
              >
                LET&apos;S MAKE THIS OFFICIAL, GET IN TOUCH
              </GSAPTextReveal>
              <br />
              <GSAPTextReveal
                splitBy="words"
                animationType="slideUp"
                stagger={0.1}
                duration={0.8}
                delay={0.4}
              >
                AND START YOUR INVESTMENT JOURNEY
              </GSAPTextReveal>
            </h1>

            {/* Description */}
            <div className="max-w-5xl mx-auto text-center mb-12">
              <h4 className="text-lg text-gray-700 leading-relaxed text-center">
                Ready to invest in Dubai&apos;s premium real estate market? Our
                team is here to guide you through every step of your property
                investment journey. From exclusive developments to personalized
                investment strategies.
              </h4>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={() => setIsFormOpen(true)}
              className="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </div>
        </div>
        <hr className="my-12 border-gray-200" />
        {/* Footer Section */}
        <footer className="relative z-10 ">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              {/* About ERETZ */}
              <div>
                <h3 className="text-lg font-normal font-krona text-gray-900 mb-6">
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
                      className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
                    >
                      Our Story
                    </a>
                  </li>
                  <li>
                    <a
                      href="#projects"
                      className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
                    >
                      Projects
                    </a>
                  </li>
                  <li>
                    <a
                      href="#what-we-do"
                      className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
                    >
                      What We Do
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
                    >
                      Investment Opportunities
                    </a>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-lg font-normal font-krona text-gray-900 mb-6">
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
                      className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
                    >
                      Property Development
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
                    >
                      Investment Consulting
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
                    >
                      Property Management
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
                    >
                      Golden Visa Assistance
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-normal font-krona text-gray-900 mb-6">
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
                      className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
                    >
                      info@eretz.ae
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+971-4-123-4567"
                      className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
                    >
                      +971 4 123 4567
                    </a>
                  </li>
                  <li>
                    <span className="text-gray-700 text-sm">Dubai, UAE</span>
                  </li>
                </ul>
              </div>

              {/* Get Updates */}
              <div>
                <h3 className="text-lg font-normal font-krona text-gray-900 mb-6">
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
                <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                  Get the latest updates on our projects and investment
                  opportunities.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors text-sm"
                  />
                  <button className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center w-full h-full">
              <img
                src="/logo-black.svg"
                alt="ERETZ"
                className="w-full h-full opacity-[0.1]"
              />
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-sm text-black -mt-6">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <span>©2025 ERETZ PROPERTIES. ALL RIGHTS RESERVED</span>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="flex items-center gap-4">
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="hover:text-gray-900 transition-colors">
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
            className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-normal font-krona text-gray-900">
                GET IN TOUCH
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-900 text-2xl transition-colors p-1"
              >
                ×
              </button>
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">
              Ready to start your investment journey with ERETZ? Fill out the
              form below and our team will get back to you within 24 hours.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-900 mb-3"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 transition-all"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900 mb-3"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 transition-all"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-900 mb-3"
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
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 resize-none transition-all"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <motion.button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 py-4 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="flex-1 py-4 px-6 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
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

export default ContactSection;
