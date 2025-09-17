"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GSAPTextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  splitBy?: "chars" | "words" | "lines";
  animationType?: "slideUp" | "fadeUp" | "maskUp";
  reveal?: "onView" | "onTrigger";
}

export const GSAPTextReveal: React.FC<GSAPTextRevealProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
  splitBy = "words",
  animationType = "slideUp",
  reveal = "onView",
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const isAnimated = useRef(false);

  useEffect(() => {
    if (!textRef.current || isAnimated.current) return;

    const textElement = textRef.current;

    // Split text into specified units
    const splitText = (text: string, type: string) => {
      switch (type) {
        case "chars":
          return text
            .split("")
            .map((char, i) =>
              char === " "
                ? `<div class="single-line-wrap" style="overflow:hidden;display:inline-block;padding-bottom:0.1em;margin-bottom:-0.1em;"><div class="single-line" style="display:inline-block;position:relative;">&nbsp;</div></div>`
                : `<div class="single-line-wrap" style="overflow:hidden;display:inline-block;padding-bottom:0.1em;margin-bottom:-0.1em;"><div class="single-line" style="display:inline-block;position:relative;">${char}</div></div>`
            )
            .join("");
        case "lines":
          // Split by sentences or manual line breaks (handle both \n and literal \\n)
          const hasLineBreaks = text.includes("\n") || text.includes("\\n");
          let lines: string[];

          if (hasLineBreaks) {
            // Handle both actual newlines and literal \n strings
            lines = text
              .replace(/\\n/g, "\n") // Convert literal \n to actual newlines
              .split("\n")
              .map((line) => line.trim())
              .filter((line) => line.length > 0);
          } else {
            // Fall back to sentence splitting
            lines = text.split(".").filter((line) => line.trim());
          }

          return lines
            .map((line, i) => {
              const cleanLine =
                line.trim() +
                (hasLineBreaks ? "" : i < lines.length - 1 ? "." : "");
              return `<div class="single-line-wrap" style="overflow:hidden;display:block;padding-bottom:0.1em;margin-bottom:-0.1em;"><div class="single-line" style="display:block;position:relative;">${cleanLine}</div></div>`;
            })
            .join("");
        default: // words
          return text
            .split(" ")
            .map(
              (word, i) =>
                `<div class="single-line-wrap" style="overflow:hidden;height:100%;display:inline-block;padding-bottom:0.1em;margin-bottom:-0.3em;"><div class="single-line" style="display:inline-block;position:relative;">${word}</div></div>`
            )
            .join(" ");
      }
    };

    // Apply split text
    textElement.innerHTML = splitText(children, splitBy);

    // Get elements to animate
    const elements = textElement.querySelectorAll(".single-line");

    // Set initial state
    gsap.set(elements, {
      y: animationType.includes("Up") ? "100%" : 0,
      opacity: animationType.includes("fade") ? 0 : 1,
      rotationX: animationType === "maskUp" ? -90 : 0,
    });

    // Create animation timeline based on reveal mode
    const tl = gsap.timeline({
      ...(reveal === "onView" && {
        scrollTrigger: {
          trigger: textElement,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }),
      delay,
    });

    // Animate elements
    tl.to(elements, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration,
      stagger,
      ease: "power3.out",
      transformOrigin: "bottom center",
    });

    isAnimated.current = true;

    return () => {
      // Cleanup ScrollTrigger instances only if using onView
      if (reveal === "onView") {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === textElement) {
            trigger.kill();
          }
        });
      }

      if (textElement) {
        textElement.innerHTML = children;
      }
    };
  }, [children, delay, duration, stagger, splitBy, animationType, reveal]);

  return (
    <div
      ref={textRef}
      className={`${className}`}
      style={{
        display: "inline",
      }}
    >
      {children}
    </div>
  );
};

export default GSAPTextReveal;
