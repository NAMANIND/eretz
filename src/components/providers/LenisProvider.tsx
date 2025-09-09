"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with award-winning studio settings
    const lenis = new Lenis({
      lerp: 0.07, // Premium smoothness - lower = smoother but more CPU intensive
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo out easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
      prevent: (node) => node.classList.contains("lenis-prevent"),
    });

    lenisRef.current = lenis;

    // RAF function to update Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Update ScrollTrigger when Lenis scrolls
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Cleanup function
    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return <>{children}</>;
}
