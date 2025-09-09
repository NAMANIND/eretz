"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { gsap } from "gsap";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  aspectRatio?: "16:9" | "4:3" | "1:1" | "9:16";
  rounding?: "None" | "Soft" | "Double";
  shadow?: "None" | "Soft" | "Double";
  padding?: number;
  background?: "Auto" | "Image" | "Solid" | "Gradient";
  autoplay?: boolean | null;
  sliderStyle?: "Line" | "Fade" | "Circle";
  showLabels?: boolean;
  speed?: number; // Animation speed multiplier (1 = normal, 2 = 2x faster, 0.5 = half speed)
  className?: string;
}

export default function SlidyComponent({
  beforeImage,
  afterImage,
  aspectRatio = "16:9",
  rounding = "None",
  shadow = "None",
  padding = 0,
  background = "Auto",
  autoplay = null,
  sliderStyle = "Line",
  showLabels = true,
  speed = 1,
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isPlaying, setIsPlaying] = useState(autoplay === true);
  const [currentTime, setCurrentTime] = useState(0);
  const [logoUploaded, setLogoUploaded] = useState(false);
  const [fadeEnabled, setFadeEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverPosition, setHoverPosition] = useState(50);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lastHoverPosition, setLastHoverPosition] = useState(50);

  const containerRef = useRef<HTMLDivElement>(null);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const afterImageRef = useRef<HTMLDivElement>(null);
  const sliderLineRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Smooth position update using GSAP
  const updatePositionSmooth = useCallback(
    (targetPosition: number, duration = 0.15) => {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(
        { position: sliderPosition },
        {
          position: targetPosition,
          duration,
          ease: "power2.out",
          onUpdate: function () {
            const pos = this.targets()[0].position;
            setSliderPosition(pos);

            // Update clip path and slider line immediately
            if (afterImageRef.current) {
              afterImageRef.current.style.clipPath = `polygon(${pos}% 0%, 100% 0%, 100% 100%, ${pos}% 100%)`;
            }
            if (sliderLineRef.current) {
              sliderLineRef.current.style.left = `${pos}%`;
            }
          },
        }
      );
    },
    [sliderPosition]
  );

  const handleSliderMove = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      if (!containerRef.current || autoplay) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

      // Kill any existing animation for immediate response
      if (animationRef.current) {
        animationRef.current.kill();
      }

      setSliderPosition(percentage);

      // Update immediately for responsive feel
      if (afterImageRef.current) {
        afterImageRef.current.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
      }
      if (sliderLineRef.current) {
        sliderLineRef.current.style.left = `${percentage}%`;
      }
    },
    [autoplay]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (autoplay) return;

      e.preventDefault();
      handleSliderMove(e);

      const handleMouseMove = (e: MouseEvent) => handleSliderMove(e);
      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [handleSliderMove, autoplay]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setHoverPosition(percentage);

      // For smoother hover experience, update position immediately during hover
      if (isHovering && !autoplay) {
        if (animationRef.current) {
          animationRef.current.kill();
        }
        setSliderPosition(percentage);

        if (afterImageRef.current) {
          afterImageRef.current.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
        }
        if (sliderLineRef.current) {
          sliderLineRef.current.style.left = `${percentage}%`;
        }
      }
    },
    [isHovering, autoplay]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setLastHoverPosition(hoverPosition);
    setIsTransitioning(true);

    if (autoplay) {
      // For autoplay: Smoothly move to center with cubic ease over 1 second
      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(
        { position: hoverPosition },
        {
          position: 50,
          duration: 1.0,
          ease: "power3.inOut", // Beautiful cubic ease
          onUpdate: function () {
            const pos = this.targets()[0].position;
            setSliderPosition(pos);

            // Update clip path and slider line immediately
            if (afterImageRef.current) {
              afterImageRef.current.style.clipPath = `polygon(${pos}% 0%, 100% 0%, 100% 100%, ${pos}% 100%)`;
            }
            if (sliderLineRef.current) {
              sliderLineRef.current.style.left = `${pos}%`;
            }
          },
          onComplete: () => {
            // Resume autoplay from center
            setCurrentTime(0);
            setIsTransitioning(false);
          },
        }
      );
    } else {
      // Smooth return to center with natural easing
      updatePositionSmooth(50, 0.8);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }
  }, [hoverPosition, autoplay]);

  // Handle autoplay animation with speed control
  useEffect(() => {
    if (isPlaying || autoplay) {
      const baseInterval = 100; // Base interval in ms
      const intervalTime = baseInterval / speed; // Adjust interval based on speed

      playIntervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const increment = 0.1 * speed; // Increment based on speed
          const maxTime = 7; // Fixed cycle duration

          if (prev >= maxTime) {
            return 0; // Always loop
          }
          return prev + increment;
        });
      }, intervalTime);
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    }

    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, [isPlaying, autoplay, speed]);

  // Handle slider animation during playback or autoplay
  useEffect(() => {
    if (!isHovering && !isTransitioning && (isPlaying || autoplay)) {
      const progress = (currentTime / 7) * 100;
      const newPosition = 50 + Math.sin(progress * 0.06) * 40;

      // Use smooth update for autoplay as well
      updatePositionSmooth(newPosition, 0.1);
    }
  }, [
    currentTime,
    isPlaying,
    autoplay,
    isHovering,
    isTransitioning,
    updatePositionSmooth,
  ]);

  // Handle smooth transition from hover back to autoplay or center
  useEffect(() => {
    // Don't interfere during transition - let handleMouseLeave control the positioning
    // The CSS transitions will handle the smooth movement
  }, []);

  // Get current display position with priority: hover > transitioning > normal
  const getDisplayPosition = () => {
    if (isHovering) return hoverPosition;
    if (isTransitioning) {
      // Use lastHoverPosition as the base, then transition to sliderPosition via CSS
      return sliderPosition;
    }
    return sliderPosition;
  };

  const displayPosition = getDisplayPosition();

  // Auto-start autoplay
  useEffect(() => {
    if (autoplay === true) {
      setIsPlaying(true);
    }
  }, [autoplay]);

  // Cleanup animations on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, []);

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "16:9":
        return "aspect-video";
      case "4:3":
        return "aspect-[4/3]";
      case "1:1":
        return "aspect-square";
      case "9:16":
        return "aspect-[9/16]";
      default:
        return "aspect-video";
    }
  };

  const getRoundingClass = () => {
    switch (rounding) {
      case "Soft":
        return "rounded-lg";
      case "Double":
        return "rounded-2xl";
      default:
        return "rounded-none";
    }
  };

  const getShadowClass = () => {
    switch (shadow) {
      case "Soft":
        return "shadow-lg";
      case "Double":
        return "shadow-2xl";
      default:
        return "shadow-none";
    }
  };

  const getBackgroundStyle = () => {
    switch (background) {
      case "Gradient":
        return "bg-gradient-to-br from-slate-50 to-slate-100";
      case "Solid":
        return "bg-white";
      case "Image":
        return "bg-slate-100";
      default:
        return "bg-transparent";
    }
  };

  return (
    <div style={{ padding: ` 0px ${padding}px` }}>
      {/* Image Comparison Container */}
      <div
        ref={containerRef}
        className={`relative ${getAspectRatioClass()} ${getRoundingClass()} ${getShadowClass()} ${getBackgroundStyle()} overflow-hidden ${
          autoplay ? "cursor-default" : "cursor-col-resize"
        } select-none ${className}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Before Image */}
        <div className="absolute inset-0">
          <img
            src={beforeImage}
            alt="Before"
            className="h-full w-full object-cover "
            draggable={false}
          />
          {showLabels && (
            <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white">
              Before
            </div>
          )}
        </div>

        {/* After Image with Clip Path */}
        <div
          ref={afterImageRef}
          className="absolute inset-0"
          style={{
            clipPath: `polygon(${displayPosition}% 0%, 100% 0%, 100% 100%, ${displayPosition}% 100%)`,
            opacity: fadeEnabled ? 0.8 : 1,
          }}
        >
          <img
            src={afterImage}
            alt="After"
            className="h-full w-full object-cover"
            draggable={false}
          />
          {showLabels && (
            <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white">
              After
            </div>
          )}
        </div>

        {/* Slider Line */}
        <div
          ref={sliderLineRef}
          className="absolute bottom-0 top-0 bg-white shadow-lg"
          style={{
            left: `${displayPosition}%`,
            width: sliderStyle === "Line" ? "3px" : "2px",
            transform: "translateX(-50%)",
            opacity: sliderStyle === "Fade" ? 0.5 : 1,
          }}
        >
          {/* Slider Handle */}
          {!autoplay && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <div
                className={`flex h-8 w-8 cursor-col-resize items-center justify-center rounded-full border-2 border-slate-200 bg-white shadow-lg transition-transform hover:scale-110 ${
                  sliderStyle === "Circle" ? "border-4 border-blue-500" : ""
                }`}
              >
                <div className="h-4 w-1 rounded-full bg-slate-400"></div>
              </div>
            </div>
          )}
        </div>

        {/* Logo Overlay */}
        {logoUploaded && (
          <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/90">
            <div className="h-8 w-8 rounded bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>
        )}

        {/* Autoplay Indicator */}
        {/* {autoplay && (
          <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-blue-500/80 px-3 py-1 text-xs font-medium text-white">
            <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
            Auto Play
          </div>
        )} */}
      </div>
    </div>
  );
}
