"use client";

import React from "react";

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  borderRadius?: string;
}

export const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  className = "",
  onClick,
  borderRadius,
}) => {
  // Extract border radius from className if not explicitly provided
  const extractBorderRadius = (borderRadius: string) => {
    if (borderRadius) {
      const radiusClass = borderRadius;
      switch (radiusClass) {
        case "sm":
          return "0.125rem";
        case "md":
          return "0.375rem";
        case "lg":
          return "0.5rem";
        case "xl":
          return "0.75rem";
        case "2xl":
          return "1rem";
        case "3xl":
          return "1.5rem";
        case "4xl":
          return "2rem";
        case "full":
          return "9999px";
        default:
          return "0.25rem"; // rounded default
      }
    }

    return "0";
  };

  const appliedBorderRadius = extractBorderRadius(borderRadius || "");
  return (
    <>
      {/* SVG Filter for glass distortion */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="glass-distortion">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="1"
              result="noise"
              seed="1"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              result="displacement"
            />
            <feGaussianBlur in="displacement" stdDeviation="2" result="blur" />
          </filter>
        </defs>
      </svg>

      <div
        className={`liquidGlass-wrapper ${className}`}
        onClick={onClick}
        style={{
          position: "relative",
          display: "flex",
          fontWeight: 600,
          overflow: "hidden",
          color: "black",
          cursor: onClick ? "pointer" : "default",
          border: "0.5px solid white",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2)",
          borderRadius: appliedBorderRadius,
        }}
      >
        {/* Glass effect layer */}
        <div
          className="liquidGlass-effect"
          style={{
            position: "absolute",
            zIndex: 0,
            inset: 0,
            backdropFilter: "blur(3px)",
            filter: "url(#glass-distortion)",
            overflow: "hidden",
            isolation: "isolate",
            borderRadius: appliedBorderRadius,
          }}
        />

        {/* Tint layer */}
        {/* <div
          className="liquidGlass-tint"
          style={{
            zIndex: 1,
            position: "absolute",
            inset: 0,
            background: "rgba(255, 255, 255, 0.25)",
            borderRadius: appliedBorderRadius,
          }}
        /> */}

        {/* Shine layer */}
        {/* <div
          className="liquidGlass-shine"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            overflow: "hidden",
            borderRadius: appliedBorderRadius,
            boxShadow:
              "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5)",
          }}
        /> */}

        {/* Content */}
        <div style={{ position: "relative", zIndex: 3 }}>{children}</div>
      </div>
    </>
  );
};

export default LiquidGlass;
