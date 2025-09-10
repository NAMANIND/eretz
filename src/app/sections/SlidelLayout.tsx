"use client";

import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GSAPTextReveal from "@/components/ui/GSAPTextReveal";
import ScrollSlidy from "@/components/ui/ScrollSlidy";

gsap.registerPlugin(ScrollTrigger);

const SlidelLayout = () => {
  const imageData = [
    {
      id: "image1",
      src: "/laya-lo.svg",
      alt: "Luxury Property 1",
      text: "At ERETZ, we transform land into living designing authentic, thoughtful residences rooted in integrity and timeless craftsmanship.",
      textAlign: "left",
      cropFrom: "top",
    },
    {
      id: "image2",
      src: "/laya-hi.svg",
      alt: "Luxury Property 2",
      text: "",
      textAlign: "center",
      cropFrom: "none",
    },
    {
      id: "image3",
      src: "/placeholder-3.jpg",
      alt: "Luxury Property 3",
      text: "We build homes for those who value genuine craftsmanship and thoughtful design.",
      textAlign: "right",
      cropFrom: "bottom",
    },
  ];

  return (
    <section className="bg-white  px-6 lg:px-12">
      <div className="max-w-7xl mx-auto py-24 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[30px] font-normal text-gray-900  leading-[1.1] font-krona">
            <GSAPTextReveal
              splitBy="words"
              animationType="slideUp"
              stagger={0.1}
              duration={0.2}
              delay={0}
            >
              Every decision from design to layout reflects a deep understanding
              of how you truly want to live.
            </GSAPTextReveal>
          </h2>
        </div>

        {/* Image Grid */}
        <ScrollSlidy
          beforeImage={imageData[0].src}
          afterImage={imageData[1].src}
          showLabels={false}
          className=" h-full w-full"
        />
      </div>
    </section>
  );
};

export default SlidelLayout;
