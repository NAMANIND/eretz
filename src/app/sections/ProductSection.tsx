"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GSAPImageReveal from "@/components/ui/GSAPImageReveal";
import GSAPTextReveal from "@/components/ui/GSAPTextReveal";
import { motion } from "framer-motion";
import { useScreen } from "../providers/Screen";

gsap.registerPlugin(ScrollTrigger);
const imageData = [
  {
    id: "image1",
    src: "/product/a.jpg",
    alt: "Luxury Property 1",
    text: "At ERETZ, we transform land into living designing authentic, thoughtful residences rooted in integrity and timeless craftsmanship.",
    textAlign: "left",
    cropFrom: "top",
  },
  {
    id: "image2",
    src: "/product/b.jpg",
    alt: "Luxury Property 2",
    text: "",
    textAlign: "center",
    cropFrom: "none",
  },
  {
    id: "image3",
    src: "/product/c.jpg",
    alt: "Luxury Property 3",
    text: "We build homes for those who value genuine craftsmanship and thoughtful design.",
    textAlign: "right",
    cropFrom: "bottom",
  },
];

const ProductSection = () => {
  const { isMobile } = useScreen();
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className=" w-full relative z-10 ">
      <div className="mx-auto container-et bg-white pt-et  overflow-hidden">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="container-heading font-krona py-et">
            <GSAPTextReveal
              splitBy="words"
              animationType="slideUp"
              stagger={0.1}
              duration={0.8}
              delay={0}
            >
              THE PREMIUM LUXURY PROPERTY DEVELOPER IN DUBAI
            </GSAPTextReveal>
          </h2>
        </div>

        {/* Image Grid */}
        {isMobile ? (
          <div className=" w-full flex flex-col gap-6 ">
            {/* Scroll-snap Carousel */}
            <h2 className="text-[15px] text-black font-medium text-center">
              At ERETZ, we transform land into living designing authentic,
              thoughtful residences rooted in integrity and timeless
              craftsmanship.
            </h2>
            <div
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-4  px-4"
              onScroll={(e) => {
                const target = e.currentTarget;
                const next = Math.round(target.scrollLeft / target.clientWidth);
                if (next !== activeIndex) setActiveIndex(next);
              }}
            >
              {imageData.map((image, idx) => (
                <div
                  key={image.id}
                  className="w-screen snap-start flex-shrink-0"
                >
                  <div className="overflow-hidden ">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-[60vh] object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination dots */}
            <div className="mt-6 flex items-center justify-center">
              <div className="relative w-[80%] h-0.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gray-900 rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${((activeIndex + 1) / imageData.length) * 100}%`,
                  }}
                />
              </div>
            </div>
            <h2 className="text-[15px] text-black font-medium text-center">
              We build homes for those who value genuine craftsmanship and
              thoughtful design.
            </h2>
          </div>
        ) : (
          <div className="flex flex-row gap-2  h-[60vh] w-full">
            {imageData.map((image, index) => {
              return (
                <motion.div
                  key={image.id}
                  className="w-1/3"
                  initial={{
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                    y: 150,
                    opacity: 0,
                  }}
                  whileInView={{
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    y: 0,
                    opacity: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <GSAPImageReveal
                    src={image.src}
                    alt={image.alt}
                    containerClassName=" ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)]"
                    delay={2}
                    duration={1.2}
                    cropFrom={image.cropFrom as "none" | "bottom" | "top"}
                    text={image.text}
                    textAlign={image.textAlign as "left" | "center" | "right"}
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
