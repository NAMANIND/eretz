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

  // Create individual components for each element to avoid hook violations
  const ElementComponent = ({
    element,
    index,
  }: {
    element: string;
    index: number;
  }) => {
    const start = index / elements.length;
    const end = (index + 1) / elements.length;

    const opacity = useTransform(
      scrollYProgress,
      [start - 0.1, start, end, end + 0.1],
      [0.2, 0.4, 1, 1]
    );

    const textColor = useTransform(
      scrollYProgress,
      [start, end],
      ["var(--muted)", "var(--primary)"]
    );

    const scale = useTransform(scrollYProgress, [start, end], [0.98, 1]);

    return (
      <motion.span
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
  };

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {elements.map((element, index) => (
        <ElementComponent key={index} element={element} index={index} />
      ))}
    </span>
  );
};

export default ScrollTextReveal;
