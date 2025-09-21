"use client";

import React from "react";
import { YouTubeBackground } from "@/components/ui/YouTubeBackground";
import { GSAPTextReveal } from "@/components/ui/GSAPTextReveal";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { ChevronDownIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useScreen } from "../providers/Screen";
interface HeroSectionProps {
  videoId?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  videoId = "Ut8t_CdUuzs", // Default video ID - replace with your desired video

  className = "",
}) => {
  const { isMobile } = useScreen();
  return (
    <section
      className={`relative z-10 w-full h-screen overflow-hidden ${className}`}
    >
      {/* YouTube Video Background */}
      <YouTubeBackground
        videoId={videoId}
        className="absolute inset-0 z-0"
        autoplay={true}
        muted={true}
        loop={true}
      />

      {/* Content Overlay */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 lg:px-8
      bg-black/40 w-full
      
      "
      >
        <div className="text-center  flex flex-col items-center gap-8 w-full">
          {/* Main Title with GSAP Text Reveal */}
          {isMobile ? (
            <h1 className=" font-normal  container-hero text-center w-full  font-krona">
              <GSAPTextReveal
                delay={0.6}
                duration={0.8}
                stagger={0.2}
                splitBy={"words"}
                animationType="slideUp"
                className="inline-block text-white "
              >
                WE DON&apos;T JUST BUILD HOMES,
              </GSAPTextReveal>
              <GSAPTextReveal
                delay={0.8}
                duration={0.8}
                stagger={0.2}
                splitBy={"words"}
                animationType="slideUp"
                className="inline-block text-white"
              >
                WE CRAFT LEGACIES THAT LAST GENERATIONS.
              </GSAPTextReveal>
            </h1>
          ) : (
            <h1 className=" font-normal  container-hero text-center w-full  font-krona">
              <GSAPTextReveal
                delay={0.2}
                duration={0.8}
                stagger={0.2}
                splitBy={"lines"}
                animationType="slideUp"
                className="inline-block text-white "
              >
                WE DON&apos;T JUST BUILD HOMES,
              </GSAPTextReveal>
              <GSAPTextReveal
                delay={0.4}
                duration={0.8}
                stagger={0.2}
                splitBy={"lines"}
                animationType="slideUp"
                className="inline-block text-white"
              >
                WE CRAFT LEGACIES THAT LAST GENERATIONS.
              </GSAPTextReveal>
            </h1>
          )}

          {/* Call to Action Button with GSAP Reveal */}
          <motion.div
            className="flex items-center justify-center cursor-pointer transition-transform duration-500 ease-out"
            whileHover={{
              y: [0, -8, 0], // subtle bounce
              transition: {
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            onClick={() => {
              const startY = window.scrollY;
              const targetY = startY + window.innerHeight; // scroll by one screen
              const duration = 750; // Balanced speed (ms)
              const startTime = performance.now();

              const easeInOutQuad = (t: number) =>
                t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

              const smoothScroll = (now: number) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1); // clamp 0 → 1
                const eased = easeInOutQuad(progress);

                window.scrollTo(0, startY + (targetY - startY) * eased);

                if (progress < 1) {
                  requestAnimationFrame(smoothScroll);
                }
              };

              requestAnimationFrame(smoothScroll);
            }}
          >
            <LiquidGlass
              borderRadius="4xl"
              className="rounded-full overflow-hidden w-10 h-10 flex items-center justify-center cursor-pointer"
            >
              <ChevronDownIcon className="w-6 h-6 text-white" />
            </LiquidGlass>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
