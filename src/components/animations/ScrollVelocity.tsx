"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ScrollVelocityItem {
  id: string | number;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface ScrollVelocityProps {
  items: ScrollVelocityItem[];
  direction?: "horizontal" | "vertical";
  speed?: number;
  className?: string;
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  items,
  direction = "horizontal",
  speed = 1,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Simplified transform without spring for stability
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "horizontal" ? [-200 * speed, 200 * speed] : [0, 0]
  );

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        ref={ref}
        className={`flex ${
          direction === "horizontal" ? "flex-row gap-8" : "flex-col gap-6"
        }`}
        style={{
          x: direction === "horizontal" ? x : 0,
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex-shrink-0 group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="relative w-80 h-96 premium-card p-0 overflow-hidden">
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full text-xs font-semibold text-background">
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-muted text-sm">{item.description}</p>
              </div>

              {/* Simple hover border */}
              <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-primary/30 transition-colors duration-300" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// Wrapper component for full-width velocity section
export const VelocitySection: React.FC<{
  title: string;
  description: string;
  items: ScrollVelocityItem[];
}> = ({ title, description, items }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="velocity-projects" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-lg mb-6">
            {title.split(" ").map((word, index) => (
              <span key={index}>
                {index === 1 ? (
                  <span className="gradient-text">{word}</span>
                ) : (
                  word
                )}
                {index < title.split(" ").length - 1 && " "}
              </span>
            ))}
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">{description}</p>
        </motion.div>

        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <ScrollVelocity items={items} speed={0.3} />
        </div>
      </div>
    </section>
  );
};

export default ScrollVelocity;
