import React from "react";
import HeroSection from "./sections/HeroSection";
import Projects from "./sections/Projects";
import WhyDubai from "./sections/WhyDubai";
import WwdSection from "./sections/WwdSection";
import FooterSection from "./sections/FooterSection";
import DockNavbar from "@/components/ui/DockNavbar";
import SlidelLayout from "./sections/SlidelLayout";
import AboutHelper from "./sections/AboutHelper";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

function page() {
  return (
    <>
      <DockNavbar />
      <WhatsAppButton />
      <HeroSection />
      <div className="relative">
        <AboutHelper />
      </div>
      <WwdSection />
      <SlidelLayout />
      <Projects />
      <div className="relative">
        <WhyDubai />
        <FooterSection />
      </div>
    </>
  );
}

export default page;
