"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollTextRevealProps {
  children: string;
  className?: string;
  mode?: "words" | "characters";
  startOffset?:
    | "start start"
    | "start center"
    | "start end"
    | "start 0.8"
    | "start 0.9";
  endOffset?: "end start" | "end center" | "end end" | "end 0.2" | "start 0.3";
}

export const ScrollTextReveal: React.FC<ScrollTextRevealProps> = ({
  children,
  className = "",
  mode = "words",
  startOffset = "start 0.8",
  endOffset = "end 0.2",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [startOffset, endOffset],
  });

  const elements = mode === "words" ? children.split(" ") : children.split("");

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {elements.map((element, index) => {
        // Calculate the progress range for this element
        const start = index / elements.length;
        const end = (index + 1) / elements.length;

        // Transform scroll progress to opacity with smooth transitions
        const opacity = useTransform(
          scrollYProgress,
          [start - 0.1, start, end, end + 0.1],
          [0.2, 0.4, 1, 1]
        );

        // Transform scroll progress to color
        const textColor = useTransform(
          scrollYProgress,
          [start, end],
          ["var(--muted)", "var(--primary)"]
        );

        // Transform scroll progress to slight scale effect
        const scale = useTransform(scrollYProgress, [start, end], [0.98, 1]);

        return (
          <motion.span
            key={index}
            className={`inline-block ${mode === "words" ? "mr-1" : ""}`}
            style={{
              opacity,
              color: textColor,
              scale,
            }}
          >
            {element === " " ? "\u00A0" : element}
          </motion.span>
        );
      })}
    </span>
  );
};

export default ScrollTextReveal;
