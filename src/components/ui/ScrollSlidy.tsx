"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";
import { GSAPTextReveal } from "./GSAPTextReveal";

interface ScrollSlidyProps {
  containerRef: React.RefObject<HTMLElement>;
  beforeImage: string;
  afterImage: string;
  className?: string;
  showLabels?: boolean;
}

export default function ScrollSlidy({
  containerRef,
  beforeImage,
  afterImage,
  className = "",
  showLabels = true,
}: ScrollSlidyProps) {
  // Use Framer Motion's scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform scroll progress to slider position (0 to 100)
  const sliderPosition = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className=" relative sm:w-full   h-screen  md:h-[200vh] md:mt-[50vh] md:-mb-[50vh]">
      <div
        className={`relative md:sticky md:top-1/2 md:-translate-y-1/2 h-[85vh] w-full  flex items-center justify-center flex-row gap-4  `}
      >
        {/* Section Header */}
        <div className="text-left w-2/5">
          <h2 className="text-4xl w-full  mb-[20px] text-black">
            <GSAPTextReveal
              splitBy="lines"
              animationType="slideUp"
              delay={0.1}
              duration={0.8}
              stagger={0.05}
            >
              Every decision from design to layout reflects a deep understanding
              of how you truly want to live.
            </GSAPTextReveal>
          </h2>
        </div>
        <div className="w-3/5 ">
          <motion.div
            className={` overflow-hidden relative rounded-xl select-none h-full aspect-4/3  `}
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          >
            {/* Before Image */}
            <div className="absolute inset-0 ">
              <img
                src={afterImage}
                alt="after"
                className="h-full w-full object-cover"
                draggable={false}
              />
              {showLabels && (
                <motion.div
                  className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  After
                </motion.div>
              )}
            </div>

            {/* After Image with Clip Path */}
            <motion.div
              className="absolute inset-0 "
              style={{
                clipPath: useTransform(
                  sliderPosition,
                  (value) =>
                    `polygon(${value}% 0%, 100% 0%, 100% 100%, ${value}% 100%)`
                ),
              }}
            >
              <img
                src={beforeImage}
                alt="Before"
                className="h-full w-full object-cover"
                draggable={false}
              />
              {showLabels && (
                <motion.div
                  className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Before
                </motion.div>
              )}
            </motion.div>

            {/* Slider Line */}
            <motion.div
              className="absolute bottom-0 top-0 bg-white shadow-lg"
              style={{
                left: useTransform(sliderPosition, (value) => `${value}%`),
                width: "3px",
                transform: "translateX(-50%)",
                opacity: 1,
              }}
            >
              {/* Slider Handle */}
              {/* <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-200 bg-white shadow-lg ${
                  sliderStyle === "Circle" ? "border-4 border-blue-500" : ""
                }`}
              >
                <div className="h-4 w-1 rounded-full bg-slate-400"></div>
              </div>
            </motion.div> */}
            </motion.div>

            {/* Progress Indicator */}
            {/* <motion.div
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.span>
              {useTransform(sliderPosition, (value) => `${Math.round(value)}%`)}
            </motion.span>
          </motion.div> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
