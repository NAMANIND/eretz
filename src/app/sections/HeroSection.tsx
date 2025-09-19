"use client";

import React from "react";
import { YouTubeBackground } from "@/components/ui/YouTubeBackground";
import { GSAPTextReveal } from "@/components/ui/GSAPTextReveal";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { ChevronDownIcon } from "lucide-react";
import { motion } from "framer-motion";
interface HeroSectionProps {
  videoId?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  videoId = "nQmFpa3yxxg", // Default video ID - replace with your desired video

  className = "",
}) => {
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
      bg-black/40
      
      "
      >
        <div className="text-center sm:container mx-auto flex flex-col items-center gap-8">
          {/* Main Title with GSAP Text Reveal */}
          <h1 className=" font-normal  container-hero text-center  font-krona">
            <GSAPTextReveal
              delay={0.2}
              duration={0.8}
              stagger={0.2}
              splitBy="lines"
              animationType="slideUp"
              className="inline-block text-white "
            >
              WE DON&apos;T JUST BUILD HOMES,
            </GSAPTextReveal>
            <GSAPTextReveal
              delay={0.4}
              duration={0.8}
              stagger={0.2}
              splitBy="lines"
              animationType="slideUp"
              className="inline-block text-white"
            >
              WE CRAFT LEGACIES THAT LAST GENERATIONS.
            </GSAPTextReveal>
          </h1>

          {/* Call to Action Button with GSAP Reveal */}
          <motion.div
            className=" flex items-center justify-center cursor-pointer transition-transform duration-500 ease-out"
            whileHover={{
              y: [0, -16, 0], // Moves up, then back down
              transition: {
                duration: 1, // One complete cycle (up and down)
                repeat: Infinity, // Repeat forever
                ease: "easeInOut",
              },
            }}
            onClick={() => {
              const startY = window.scrollY;
              const targetY = startY + window.innerHeight;
              const duration = 1400;
              const startTime = performance.now();

              const easeInOutQuint = (t: number) =>
                t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;

              const smoothScroll = (now: number) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeInOutQuint(progress);

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
