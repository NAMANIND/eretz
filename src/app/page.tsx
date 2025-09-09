import React from "react";
import HeroSection from "./sections/HeroSection";
import ProductSection from "./sections/ProductSection";
import AboutSection from "./sections/AboutSection";
import WwdSection from "./sections/WwdSextion";
import DockNavbar from "@/components/ui/DockNavbar";
import SlidelLayout from "./sections/SlidelLayout";

function page() {
  return (
    <div>
      <DockNavbar />
      <HeroSection />
      <ProductSection />
      <AboutSection />
      <WwdSection />
      <SlidelLayout />
    </div>
  );
}

export default page;
