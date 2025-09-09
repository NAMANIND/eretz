"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

interface RippleState {
  x: number;
  y: number;
  size: number;
  show: boolean;
  isExit: boolean;
}

export const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
}) => {
  const [ripple, setRipple] = useState<RippleState | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-primary text-background border-primary";
      case "secondary":
        return "bg-secondary text-background border-secondary";
      case "outline":
        return "bg-transparent text-foreground border-primary hover:text-background";
      default:
        return "bg-primary text-background border-primary";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-4 py-2 text-sm";
      case "md":
        return "px-6 py-3 text-base";
      case "lg":
        return "px-8 py-4 text-lg";
      default:
        return "px-6 py-3 text-base";
    }
  };

  const getRippleColor = () => {
    switch (variant) {
      case "primary":
        return "bg-primary-dark";
      case "secondary":
        return "bg-secondary/80";
      case "outline":
        return "bg-primary";
      default:
        return "bg-primary-dark";
    }
  };

  const createRipple = useCallback((e: React.MouseEvent, isExit = false) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate size to cover entire button
    const maxDistance = Math.max(
      Math.sqrt(x * x + y * y),
      Math.sqrt((rect.width - x) * (rect.width - x) + y * y),
      Math.sqrt(x * x + (rect.height - y) * (rect.height - y)),
      Math.sqrt(
        (rect.width - x) * (rect.width - x) +
          (rect.height - y) * (rect.height - y)
      )
    );

    setRipple({
      x,
      y,
      size: maxDistance * 2.5,
      show: true,
      isExit,
    });

    // Clear ripple after animation
    setTimeout(() => setRipple(null), isExit ? 600 : 1000);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent) => {
    createRipple(e, false);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    createRipple(e, true);
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`
        relative overflow-hidden rounded-full font-semibold
        border-2 transition-all duration-300 ease-out
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Ripple Effect */}
      {ripple && (
        <motion.div
          className={`absolute rounded-full ${getRippleColor()} pointer-events-none`}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
          initial={{
            width: 0,
            height: 0,
            x: "-50%",
            y: "-50%",
            opacity: ripple.isExit ? 1 : 0.3,
          }}
          animate={{
            width: ripple.size,
            height: ripple.size,
            opacity: ripple.isExit ? 0 : 0.8,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: ripple.isExit ? 0.6 : 0.8,
            ease: ripple.isExit ? "easeOut" : "easeInOut",
          }}
        />
      )}

      {/* Button Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default RippleButton;
