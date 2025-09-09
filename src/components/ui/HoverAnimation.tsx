"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface HoverAnimationProps {
  children: string;
  className?: string;
  splitBy?: "chars" | "words";
  duration?: number;
  stagger?: number;
  ease?: string;
}

export const HoverAnimation: React.FC<HoverAnimationProps> = ({
  children,
  className = "",
  splitBy = "chars",
  duration = 0.5,
  stagger = 0.01,
  ease = "expo.inOut",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Create TWO copies of the text - one for exit, one for entrance
    const createTextCopy = (copyClass: string, initialY: number) => {
      return children
        .split("")
        .map((char, index) => {
          return `<div style="display: inline-block; overflow: hidden; position: relative;" class="char-mask">
            <div style="position: relative; display: inline-block;" class="${copyClass}" data-index="${index}">
              ${char === " " ? "&nbsp;" : char}
            </div>
          </div>`;
        })
        .join("");
    };

    // Set innerHTML with TWO copies positioned exactly on top of each other
    container.innerHTML = `
      <div style="position: relative;">
        <div style="position: relative; z-index: 2; display: flex;  justify-content: center;">
          ${createTextCopy("original-text", 0)}
        </div>
        <div style="position: absolute; top: 0; left: 0; width: 100%; z-index: 1; display: flex;  justify-content: center;">
          ${createTextCopy("duplicate-text", 100)}
        </div>
      </div>
    `;

    // Get both sets of character elements
    const originalChars = container.querySelectorAll(".original-text");
    const duplicateChars = container.querySelectorAll(".duplicate-text");

    // Set initial states
    gsap.set(originalChars, { yPercent: 0 }); // Original visible
    gsap.set(duplicateChars, { yPercent: 100 }); // Duplicate hidden below

    // Create hover timeline with TWO text copies
    const createHoverTimeline = () => {
      const tl = gsap.timeline({ paused: true });

      // Simultaneously animate both copies
      tl.to(originalChars, {
        yPercent: -100, // Original slides UP and out
        duration: duration,
        stagger: {
          amount: stagger * originalChars.length,
          from: "start", // RIGHT to LEFT
        },
        ease: ease,
      }).to(
        duplicateChars,
        {
          yPercent: 0, // Duplicate slides UP from bottom
          duration: duration,
          stagger: {
            amount: stagger * duplicateChars.length,
            from: "start", // RIGHT to LEFT
          },
          ease: ease,
        },
        0
      ); // Start at same time (0 offset)

      return tl;
    };

    timelineRef.current = createHoverTimeline();

    // Mouse enter handler - play the animation
    const handleMouseEnter = () => {
      if (timelineRef.current) {
        timelineRef.current.restart();
      }
    };

    // Mouse leave handler - reverse back to start
    const handleMouseLeave = () => {
      if (timelineRef.current) {
        timelineRef.current.reverse();
      }
    };

    // Add event listeners
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup function
    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);

      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [children, splitBy, duration, stagger, ease]);

  return (
    <div
      ref={containerRef}
      className={`hover-animation-container ${className}`}
      style={{
        display: "inline-block",
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
};

export default HoverAnimation;
