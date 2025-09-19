"use client";

import React, { useRef } from "react";
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

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="bg-white  ">
      <div className="container-et mx-auto relative sm:pb-[150px] pb-[40px] flex items-center flex-col ">
        <ScrollSlidy
          containerRef={containerRef as React.RefObject<HTMLElement>}
          beforeImage={imageData[0].src}
          afterImage={imageData[1].src}
          showLabels={false}
          className="h-full w-full"
        />
      </div>
    </section>
  );
};

export default SlidelLayout;
