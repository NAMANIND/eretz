"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GSAPImageReveal from "@/components/ui/GSAPImageReveal";
import GSAPTextReveal from "@/components/ui/GSAPTextReveal";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);
const imageData = [
  {
    id: "image1",
    src: "/placeholder-1.jpg",
    alt: "Luxury Property 1",
    text: "At ERETZ, we transform land into living designing authentic, thoughtful residences rooted in integrity and timeless craftsmanship.",
    textAlign: "left",
    cropFrom: "top",
  },
  {
    id: "image2",
    src: "/placeholder-2.jpg",
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

const ProductSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Initialize
    setIsMobile(mediaQuery.matches);

    // Subscribe with fallback for older browsers
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange);
      } else if (typeof mediaQuery.removeListener === "function") {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return (
    <section className="bg-white overflow-x-hidden">
      <div className="container-w mx-auto">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="container-heading font-krona">
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
          <div className="relative w-full">
            {/* Scroll-snap Carousel */}
            <div
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-4 -mx-4 px-4"
              onScroll={(e) => {
                const target = e.currentTarget;
                const next = Math.round(target.scrollLeft / target.clientWidth);
                if (next !== activeIndex) setActiveIndex(next);
              }}
            >
              {imageData.map((image, idx) => (
                <div key={image.id} className="space-y-8">
                  <div className="relative">
                    <div className="aspect-[4/5] overflow-hidden h-[60vh]">
                      <GSAPImageReveal
                        src={image.src}
                        alt={image.alt}
                        containerClassName="w-full h-full ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)]"
                        delay={1.3}
                        duration={1.2}
                        cropFrom={image.cropFrom as "none" | "bottom" | "top"}
                        text={image.text}
                        textAlign={
                          image.textAlign as "left" | "center" | "right"
                        }
                        reveal="onTrigger"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination dots */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {imageData.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => {
                    if (!carouselRef.current) return;
                    const width = carouselRef.current.clientWidth;
                    carouselRef.current.scrollTo({
                      left: width * idx,
                      behavior: "smooth",
                    });
                    setActiveIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? "w-6 bg-gray-900" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {imageData.map((image, index) => {
              return (
                <motion.div
                  key={image.id}
                  className="space-y-8"
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
                  <div className="relative">
                    <div className="aspect-[4/5] overflow-hidden h-[60vh]">
                      <GSAPImageReveal
                        src={image.src}
                        alt={image.alt}
                        containerClassName="w-full h-full ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)]"
                        delay={1.3}
                        duration={1.2}
                        cropFrom={image.cropFrom as "none" | "bottom" | "top"}
                        text={image.text}
                        textAlign={
                          image.textAlign as "left" | "center" | "right"
                        }
                      />
                    </div>
                  </div>
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
