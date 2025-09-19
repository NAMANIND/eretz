"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalScrollProps {
  items: Item[];
  className?: string;
  containerClassName?: string;
  panelClassName?: string;
  scrubValue?: number;
  ease?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  sidePaddingVW?: number;
}

interface Item {
  image: string;
  title: string;
  description: string;
}

function HorizontalScroll({
  items,
  className = "",
  containerClassName = "container",
  panelClassName = "panel",
  scrubValue = 1,
  ease = "none",
  containerRef,
  sidePaddingVW = 4,
}: HorizontalScrollProps) {
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef?.current || !panelsRef.current) return;

    const container = containerRef.current;
    const panels = panelsRef.current;

    // Calculate the exact scroll distance needed accounting for side paddings
    const styles = window.getComputedStyle(container);
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddingRight = parseFloat(styles.paddingRight) || 180;
    const visibleWidth = container.clientWidth - paddingLeft - paddingRight;
    const totalContentWidth = panels.scrollWidth;
    const scrollDistance = Math.max(0, totalContentWidth - visibleWidth);

    // Create GSAP ScrollTrigger animation
    const animation = gsap.to(panels, {
      x: -scrollDistance,
      ease: ease,
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: scrubValue,
        end: `+=${scrollDistance}`,
        invalidateOnRefresh: true,
      },
    });

    // Cleanup function
    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [items.length, scrubValue, ease, sidePaddingVW]);

  return (
    <div
      className={`${containerClassName} ${className}`}
      ref={containerRef}
      style={{
        paddingLeft: `${sidePaddingVW}vw`,
        // paddingRight: `${sidePaddingVW}vw`,
      }}
    >
      <div className="flex" ref={panelsRef}>
        {items.map((item, index) => (
          <div key={index} className={`${panelClassName} flex-shrink-0 w-1/3 `}>
            <div className="px-4 w-full">
              <div className="relative group overflow-hidden rounded-2xl mx-auto">
                <div className=" h-[70vh] relative">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ScrollVelocityProps {
  items?: Item[];
  className?: string;
  containerClassName?: string;
  panelClassName?: string;
  scrubValue?: number;
  ease?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  sidePaddingVW?: number;
}

export const WhyDubaiHScroll = ({
  items = [],
  className = "",
  containerClassName = "container",
  panelClassName = "panel",
  scrubValue = 1,
  ease = "none",
  containerRef,
  sidePaddingVW = 5,
}: ScrollVelocityProps) => {
  return (
    <section className="space-y-4">
      <HorizontalScroll
        items={items}
        className={className}
        containerClassName={containerClassName}
        panelClassName={panelClassName}
        scrubValue={scrubValue}
        ease={ease}
        containerRef={containerRef}
        sidePaddingVW={sidePaddingVW}
      />
    </section>
  );
};
