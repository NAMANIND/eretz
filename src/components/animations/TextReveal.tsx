"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  threshold?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = children.split(" ");

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, index) => {
        // Calculate the progress range for this word
        const start = index / words.length;
        const end = (index + 1) / words.length;

        // Transform scroll progress to word opacity
        const opacity = useTransform(
          scrollYProgress,
          [start, end, end + 0.1],
          [0.3, 1, 1]
        );

        // Transform scroll progress to word color
        const textColor = useTransform(
          scrollYProgress,
          [start, end],
          ["var(--muted)", "var(--primary)"]
        );

        return (
          <motion.span
            key={index}
            className="inline-block mr-1"
            style={{
              opacity,
              color: textColor,
            }}
            transition={{
              duration: 0.1,
              ease: "easeOut",
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
};

export default TextReveal;
