"use client";

import { useRef, useLayoutEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import GSAPTextReveal from "./GSAPTextReveal";

function useElementWidth(ref: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
}

interface VelocityTextProps {
  items: Item[];
  baseVelocity?: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: { input: number[]; output: number[] };
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

interface Item {
  image: string;
  title: string;
  description: string;
}

function VelocityText({
  items,
  baseVelocity = 100,
  scrollContainerRef,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = "overflow-hidden whitespace-nowrap",
  scrollerClassName = "flex whitespace-nowrap",
  parallaxStyle,
  scrollerStyle,
}: VelocityTextProps) {
  const baseX = useMotionValue(0);
  const scrollOptions = scrollContainerRef
    ? { container: scrollContainerRef }
    : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: damping,
    stiffness: stiffness,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping.input,
    velocityMapping.output,
    { clamp: false }
  );

  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);

  function wrap(min: number, max: number, v: number) {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  // Calculate the total width of one complete set of items
  const singleSetWidth = copyWidth * items.length;

  const x = useTransform(baseX, (v) => {
    if (singleSetWidth === 0) return "0px";
    // Wrap within the range of one complete set
    return `${wrap(-singleSetWidth, 0, v)}px`;
  });

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  // Create multiple copies of items for seamless infinite scroll
  // We need at least 3 full sets to ensure smooth infinite scrolling
  const actualCopies = Math.max(numCopies, 3);
  const repeatedItems = Array.from({ length: actualCopies }, (_, copyIndex) =>
    items.map((item, itemIndex) => ({
      ...item,
      key: `${copyIndex}-${itemIndex}`,
    }))
  ).flat();

  return (
    <div className={parallaxClassName} style={parallaxStyle}>
      <motion.div className={scrollerClassName} style={{ x, ...scrollerStyle }}>
        {repeatedItems.map((item, i) => {
          return (
            <span
              className={`whitespace-nowrap px-4 ${className}`}
              key={item.key}
              ref={i === 0 ? copyRef : null}
            >
              <div className="relative group overflow-hidden rounded-2xl w-80 lg:w-96">
                <div className="h-[400px] lg:h-[500px] relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight font-krona text-wrap">
                      {item.title.toUpperCase()}
                    </h3>
                    <div className="text-sm lg:text-base leading-relaxed opacity-90 text-wrap">
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  items?: Item[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: { input: number[]; output: number[] };
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  direction?: "left" | "right" | "alternate";
}

export const WhyDubaiScrollVelocity = ({
  scrollContainerRef,
  items = [],
  velocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 8,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = "overflow-hidden whitespace-nowrap",
  scrollerClassName = "flex whitespace-nowrap",
  parallaxStyle,
  scrollerStyle,
  direction = "alternate",
}: ScrollVelocityProps) => {
  let textVelocity = velocity;
  if (direction === "left") textVelocity = velocity;
  else if (direction === "right") textVelocity = -velocity;
  else if (direction === "alternate")
    textVelocity = items.length % 2 !== 0 ? -velocity : velocity;
  return (
    <section className="space-y-4">
      <VelocityText
        items={items}
        className={className}
        baseVelocity={textVelocity}
        scrollContainerRef={scrollContainerRef}
        damping={damping}
        stiffness={stiffness}
        numCopies={numCopies}
        velocityMapping={velocityMapping}
        parallaxClassName={parallaxClassName}
        scrollerClassName={scrollerClassName}
        parallaxStyle={parallaxStyle}
        scrollerStyle={scrollerStyle}
      />
    </section>
  );
};
