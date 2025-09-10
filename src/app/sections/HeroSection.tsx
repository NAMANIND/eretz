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
      className={`relative w-full h-screen overflow-hidden ${className}`}
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
        <div className="text-center max-w-7xl mx-auto">
          {/* Main Title with GSAP Text Reveal */}
          <h1 className=" font-normal text-[36px] text-white mb-6  font-krona">
            <GSAPTextReveal
              delay={0.2}
              duration={0.8}
              stagger={0}
              splitBy="words"
              animationType="slideUp"
              className="inline-block "
            >
              WE DON&apos;T JUST BUILD HOMES,
            </GSAPTextReveal>
            <GSAPTextReveal
              delay={0.4}
              duration={0.8}
              stagger={0}
              splitBy="lines"
              animationType="slideUp"
              className="inline-block "
            >
              WE CRAFT LEGACIES THAT LAST GENERATIONS.
            </GSAPTextReveal>
          </h1>

          {/* Call to Action Button with GSAP Reveal */}
          <motion.div
            className="mt-10 flex items-center justify-center cursor-pointer transition-transform duration-500 ease-out"
            whileHover={{
              y: [0, -16, 0], // Moves up, then back down
              transition: {
                duration: 1, // One complete cycle (up and down)
                repeat: Infinity, // Repeat forever
                ease: "easeInOut",
              },
            }}
            onClick={() => {
              const scrollY = window.innerHeight;
              window.scrollTo({ top: scrollY, behavior: "smooth" });
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
