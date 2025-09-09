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
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = children.split(" ");

  // Create individual components for each word to avoid hook violations
  const WordComponent = ({ word, index }: { word: string; index: number }) => {
    const start = index / words.length;
    const end = (index + 1) / words.length;

    const opacity = useTransform(
      scrollYProgress,
      [start, end, end + 0.1],
      [0.3, 1, 1]
    );

    const textColor = useTransform(
      scrollYProgress,
      [start, end],
      ["var(--muted)", "var(--primary)"]
    );

    return (
      <motion.span
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
  };

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <WordComponent key={index} word={word} index={index} />
      ))}
    </span>
  );
};

export default TextReveal;
