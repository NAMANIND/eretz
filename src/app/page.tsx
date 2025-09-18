import React from "react";
import HeroSection from "./sections/HeroSection";
import ProductSection from "./sections/ProductSection";
import AboutSection from "./sections/AboutSection";
import Projects from "./sections/Projects";
import WhyDubai from "./sections/WhyDubai";
import WwdSection from "./sections/WwdSection";
import FooterSection from "./sections/FooterSection";
import DockNavbar from "@/components/ui/DockNavbar";
import SlidelLayout from "./sections/SlidelLayout";

function page() {
  return (
    <div>
      <DockNavbar />
      <HeroSection />
      <div className="relative">
        <div className=" w-full h-[60vh] hidden sm:flex  mx-auto  sticky top-1/2 container -translate-y-1/2 z-4">
          <div className="grid grid-cols-3  gap-0 ">
            <div className="  h-[60vh] opacity-0  ">
              <img
                src="/placeholder-1.jpg"
                alt="Frame Left"
                className="w-full h-full object-cover"
              />
            </div>
            <div className=" bg-transparent  top-0 left-0 flex items-center justify-center h-[60vh] ">
              <img
                src="/placeholder-2.jpg"
                alt="Frame Center"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className=" h-[60vh] opacity-0">
              <img
                src="/placeholder-3.jpg"
                alt="Frame Right"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="relative mt-0 sm:-mt-[60vh]">
          <ProductSection />
          <AboutSection />
        </div>
      </div>
      <WwdSection />
      <SlidelLayout />
      <Projects />

      {/* Parallax Container for WhyDubai and ContactSection */}
      <div className="relative">
        <WhyDubai />

        <FooterSection />
      </div>
    </div>
  );
}

export default page;
