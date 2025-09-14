"use client";

import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GSAPImageReveal from "@/components/ui/GSAPImageReveal";
import GSAPTextReveal from "@/components/ui/GSAPTextReveal";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const ProductSection = () => {
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

  return (
    <section className="bg-white">
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
                      textAlign={image.textAlign as "left" | "center" | "right"}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
