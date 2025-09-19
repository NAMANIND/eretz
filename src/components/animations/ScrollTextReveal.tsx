"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollTextRevealProps {
  children: string;
  className?: string;
  mode?: "words" | "characters";
  startOffset?:
    | "start start"
    | "start center"
    | "start end"
    | "start 0.8"
    | "start 0.9";
  endOffset?:
    | "end start"
    | "end center"
    | "end end"
    | "end 0.2"
    | "start 0.3"
    | "start center";
}

export const ScrollTextReveal: React.FC<ScrollTextRevealProps> = ({
  children,
  className = "",
  mode = "words",
  startOffset = "start 0.8",
  endOffset = "end 0.2",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [startOffset, endOffset],
  });

  const tokens = (children.match(/\S+|\s+/g) || []) as string[];
  const totalUnits =
    mode === "words"
      ? tokens.filter((t) => /\S/.test(t)).length
      : tokens.filter((t) => /\S/.test(t)).join("").length;

  let runningIndex = 0;

  const ElementComponent = ({
    element,
    index,
    totalCount,
  }: {
    element: string;
    index: number;
    totalCount: number;
  }) => {
    const start = index / totalCount;
    const end = (index + 1) / totalCount;

    const opacity = useTransform(
      scrollYProgress,
      [start - 0.1, start, end, end + 0.1],
      [0.2, 0.4, 1, 1]
    );

    const textColor = useTransform(
      scrollYProgress,
      [start, end],
      ["#6b7280", "var(--primary)"]
    );

    const scale = useTransform(scrollYProgress, [start, end], [0.98, 1]);

    return (
      <motion.span
        className="inline-block"
        style={{
          opacity,
          color: textColor,
          scale,
        }}
      >
        {element}
      </motion.span>
    );
  };

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {tokens.map((token, tokenIdx) => {
        if (/^\s+$/.test(token)) {
          return <span key={`space-${tokenIdx}`}>{token}</span>;
        }

        if (mode === "words") {
          const currentIndex = runningIndex++;
          return (
            <ElementComponent
              key={`word-${tokenIdx}`}
              element={token}
              index={currentIndex}
              totalCount={totalUnits}
            />
          );
        }

        return (
          <span key={`group-${tokenIdx}`} style={{ whiteSpace: "nowrap" }}>
            {token.split("").map((ch, chIdx) => {
              const currentIndex = runningIndex++;
              return (
                <ElementComponent
                  key={`char-${tokenIdx}-${chIdx}`}
                  element={ch}
                  index={currentIndex}
                  totalCount={totalUnits}
                />
              );
            })}
          </span>
        );
      })}
    </span>
  );
};

export default ScrollTextReveal;
