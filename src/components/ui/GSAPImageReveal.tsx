"use client";

import React, { useRef, useEffect, useState, use } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GSAPTextReveal from "./GSAPTextReveal";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface GSAPImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  delay?: number;
  duration?: number;
  cropFrom?: "top" | "bottom" | "none";
  text?: string;
  textAlign?: "left" | "center" | "right";
  reveal?: "onView" | "onTrigger";
}

export const GSAPImageReveal: React.FC<GSAPImageRevealProps> = ({
  src,
  alt,
  className = "",
  containerClassName = "",
  delay = 0,
  duration = 1.2,
  cropFrom = "none",
  text,
  textAlign = "center",
  reveal = "onView",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [show, setShow] = useState(false);

  // after this much duration set show to true
  useEffect(() => {
    if (reveal === "onTrigger") return;
    const timer = setTimeout(
      () => {
        setShow(true);
      },
      (duration + delay) * 1000
    ); // Convert to milliseconds

    return () => clearTimeout(timer);
  }, [duration, delay, reveal]);

  const getTextAlignmentClass = () => {
    switch (textAlign) {
      case "left":
        return "text-left";
      case "right":
        return "text-left";
      default:
        return "text-center";
    }
  };

  const getTextPositionClass = () => {
    return textAlign === "left"
      ? "items-start justify-start pb-8 "
      : "items-start justify-start pt-8 ";
  };

  const getcoldirection = () => {
    return textAlign === "left" ? "flex-col" : "flex-col-reverse";
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex  items-center ${getcoldirection()} h-full justify-between col-1`}
    >
      {/* Text content (behind image initially) */}
      {text && (
        <motion.div
          className={` absolute flex flex-1 ${getTextPositionClass()} w-full z-0 bg-white`}
          initial={textAlign === "left" ? { y: -150 } : { y: 150 }}
          animate={{ y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 1.8,
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <GSAPTextReveal
            delay={1.2}
            duration={1}
            splitBy="words"
            animationType="slideUp"
            stagger={0.1}
            className={`text-lg text-black font-medium   max-w-md ${getTextAlignmentClass()}`}
            reveal="onTrigger"
          >
            {text}
          </GSAPTextReveal>
        </motion.div>
      )}

      {/* Image (covers text initially, then gets cropped if cropFrom is not "none") */}

      <motion.img
        ref={imageRef}
        src={src}
        alt={alt}
        className={` ${text ? "p-[1px]" : "p-[0px]"}  w-full h-full object-cover`}
      />
    </div>
  );
};

export default GSAPImageReveal;
