import React from "react";
import HeroSection from "./sections/HeroSection";
import ProductSection from "./sections/ProductSection";
import AboutSection from "./sections/AboutSection";
import Projects from "./sections/Projects";
import WhyDubai from "./sections/WhyDubai";
import WwdSection from "./sections/WwdSextion";
import ContactSection from "./sections/ContactSection";
import DockNavbar from "@/components/ui/DockNavbar";
import SlidelLayout from "./sections/SlidelLayout";

function page() {
  return (
    <div>
      <DockNavbar />
      <HeroSection />
      <div className="relative">
        <ProductSection />
        <AboutSection />
      </div>
      <WwdSection />
      <SlidelLayout />
      <Projects />

      {/* Parallax Container for WhyDubai and ContactSection */}
      <div className="relative">
        <WhyDubai />
        <ContactSection />
      </div>
    </div>
  );
}

export default page;
