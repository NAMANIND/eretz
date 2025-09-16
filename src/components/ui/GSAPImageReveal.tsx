"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GSAPTextReveal from "./GSAPTextReveal";

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

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const container = containerRef.current;
    const image = imageRef.current;

    const finalClipPath =
      cropFrom === "top"
        ? "polygon(0% 20%, 100% 20%, 100% 100%, 0% 100%)"
        : cropFrom === "bottom"
        ? "polygon(0% 0%, 100% 0%, 100% 85%, 0% 85%)"
        : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

    // Cleanup any previous ScrollTriggers tied to this container
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === container) trigger.kill();
    });

    if (reveal === "onTrigger") {
      // Immediately set to final state without creating ScrollTrigger
      gsap.set(image, {
        clipPath: finalClipPath,
      });
      return;
    }

    // onView: start fully covered, then animate crop on enter
    gsap.set(image, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    if (cropFrom !== "none") {
      tl.to(image, {
        clipPath: finalClipPath,
        duration: duration,
        delay: delay,
        ease: "power3.out",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [delay, duration, cropFrom, reveal]);

  const getTextAlignmentClass = () => {
    switch (textAlign) {
      case "left":
        return "text-left";
      case "right":
        return "text-right";
      default:
        return "text-center";
    }
  };

  const getTextPositionClass = () => {
    return textAlign === "left"
      ? "items-start justify-start "
      : "items-end justify-end ";
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-between gap-4 ${containerClassName}`}
    >
      {/* Text content (behind image initially) */}
      {text && (
        <div className={`absolute inset-0 flex ${getTextPositionClass()} z-0`}>
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
        </div>
      )}

      {/* Image (covers text initially, then gets cropped if cropFrom is not "none") */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`relative z-10 w-full h-full object-cover ${className}`}
      />
    </div>
  );
};

export default GSAPImageReveal;
