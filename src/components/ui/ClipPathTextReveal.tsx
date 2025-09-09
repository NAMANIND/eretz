"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface ClipPathTextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  splitType?: "words" | "chars" | "lines";
  clipDirection?: "left" | "right" | "top" | "bottom";
}

export const ClipPathTextReveal: React.FC<ClipPathTextRevealProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 1.2,
  splitType = "words",
  clipDirection = "left",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const getClipPath = (progress: number) => {
    switch (clipDirection) {
      case "right":
        return `polygon(${100 - progress * 100}% 0%, 100% 0%, 100% 100%, ${
          100 - progress * 100
        }% 100%)`;
      case "top":
        return `polygon(0% ${100 - progress * 100}%, 100% ${
          100 - progress * 100
        }%, 100% 100%, 0% 100%)`;
      case "bottom":
        return `polygon(0% 0%, 100% 0%, 100% ${progress * 100}%, 0% ${
          progress * 100
        }%)`;
      default: // left
        return `polygon(0% 0%, ${progress * 100}% 0%, ${
          progress * 100
        }% 100%, 0% 100%)`;
    }
  };

  const splitText = (text: string) => {
    switch (splitType) {
      case "chars":
        return text.split("");
      case "lines":
        return text.split("\n");
      default: // words
        return text.split(" ");
    }
  };

  const segments = splitText(children);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start("visible");
      setHasAnimated(true);
    }
  }, [isInView, controls, hasAnimated]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <div className="relative">
        {segments.map((segment, index) => (
          <motion.span
            key={index}
            className="relative inline-block"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: {
                clipPath: getClipPath(0),
              },
              visible: {
                clipPath: getClipPath(1),
                transition: {
                  duration,
                  delay: delay + index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              },
            }}
          >
            <span className="inline-block">
              {segment}
              {splitType === "words" && index < segments.length - 1 && " "}
              {splitType === "lines" && index < segments.length - 1 && <br />}
            </span>
          </motion.span>
        ))}
      </div>

      {/* Background text for smooth clipping effect */}
      <div
        className="absolute inset-0 text-white/10 select-none pointer-events-none"
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
};

export default ClipPathTextReveal;
