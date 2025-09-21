"use client";
import React from "react";
import ProductSection from "./ProductSection";
import AboutSection from "./AboutSection";
import { useScreen } from "@/app/providers/Screen";

function AboutHelper() {
  const { isMobile } = useScreen();
  return (
    <>
      {isMobile ? (
        <></>
      ) : (
        <div className=" w-full h-[60vh]   mx-auto  sticky top-1/2 container-et -translate-y-1/2 z-4">
          <div className="grid grid-cols-3  gap-0 w-full ">
            <div className="  h-[60vh] opacity-0  ">
              <img
                src="/about/a.png"
                alt="Frame Left"
                className="w-full h-full object-cover"
              />
            </div>
            <div className=" bg-transparent  top-0 left-0 flex items-center justify-center h-[60vh] ">
              <img
                src="/about/b.png"
                alt="Frame Center"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className=" h-[60vh] opacity-0">
              <img
                src="/about/c.png"
                alt="Frame Right"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      <div className="relative mt-0 lg:-mt-[60vh]">
        <ProductSection />
        <AboutSection />
      </div>
    </>
  );
}

export default AboutHelper;
