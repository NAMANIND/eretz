"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GSAPTextReveal from "@/components/ui/GSAPTextReveal";
import { useScreen } from "@/app/providers/Screen";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: number;
  title: string;
  shortDescription: string;
  expandedDescription: string;
  image: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 1,
    title: "Modern Living",
    shortDescription: "Contemporary spaces designed for today's lifestyle",
    expandedDescription:
      "Our modern living spaces combine cutting-edge design with functional elegance. Every detail is carefully crafted to create environments that inspire and comfort. From open-plan layouts to smart home integration, we redefine what it means to live beautifully in the 21st century.",
    image:
      "https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Sustainable Design",
    shortDescription: "Eco-conscious development for a better tomorrow",
    expandedDescription:
      "Sustainability is at the heart of our design philosophy. We integrate renewable energy systems, water conservation technologies, and locally sourced materials to minimize environmental impact while maximizing comfort and efficiency for our residents.",
    image:
      "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Premium Quality",
    shortDescription: "Uncompromising standards in every project",
    expandedDescription:
      "Quality is never an accident. Our rigorous selection process for materials, combined with expert craftsmanship and attention to detail, ensures that every ERETZ property meets the highest standards of excellence and durability.",
    image:
      "https://images.unsplash.com/photo-1569959220744-ff553533f492?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Innovation",
    shortDescription: "Pushing boundaries in property development",
    expandedDescription:
      "We embrace cutting-edge technology and innovative design solutions to create properties that stand the test of time. Our forward-thinking approach ensures that every project incorporates the latest advancements in construction, sustainability, and smart living.",
    image:
      "https://images.unsplash.com/photo-1607585011081-241d2bacb7de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    title: "Excellence",
    shortDescription: "Unwavering commitment to superior outcomes",
    expandedDescription:
      "Excellence is not just a goal, it's our standard. Every aspect of our development process, from initial concept to final delivery, is executed with meticulous attention to detail and an unwavering commitment to surpassing expectations.",
    image:
      "https://images.unsplash.com/photo-1449452198679-05c7fd30f416?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ExpandingGallery: React.FC = () => {
  const { isMobile } = useScreen();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Removed rotating text effect - now using static header

  // Update individual box text rotation based on active state
  useEffect(() => {
    boxRefs.current.forEach((box, index) => {
      if (!box) return;

      const collapsedContent = box.querySelector(
        ".collapsed-content .rotated-title"
      ) as HTMLElement;
      if (collapsedContent) {
        gsap.to(collapsedContent, {
          color: "#fff", // Different blue shades
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    });
  }, [activeIndex]);

  const updateCurrentBox = () => {
    setIsTransitioning(true);

    boxRefs.current.forEach((box, index) => {
      if (!box) return;

      const isActive = index === activeIndex;
      const isClosed = !isActive;

      if (isMobile) {
        gsap.to(box, {
          height: isActive ? "85%" : "20%",
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            if (index === galleryData.length - 1) {
              setIsTransitioning(false);
            }
          },
        });
      } else {
        gsap.to(box, {
          width: isActive ? "85%" : "5%",
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            if (index === galleryData.length - 1) {
              setIsTransitioning(false);
            }
          },
        });
      }

      const content = box.querySelector(".box-content") as HTMLElement;
      const collapsedContent = box.querySelector(
        ".collapsed-content"
      ) as HTMLElement;

      if (content && collapsedContent) {
        gsap.to(content, {
          opacity: isActive ? 1 : 0,
          duration: 0.5,
          ease: "power3.inOut",
          delay: isActive ? 0.3 : 0,
        });

        gsap.to(collapsedContent, {
          opacity: isClosed ? 1 : 0,
          duration: 0.5,
          ease: "power3.inOut",
          delay: isClosed ? 0.3 : 0,
        });
      }
    });
  };

  useEffect(() => {
    updateCurrentBox();
  }, [activeIndex]);

  const handleBoxClick = (index: number) => {
    if (isTransitioning) return;

    // Only expand if clicking on a different box, don't close if clicking the same box
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isTransitioning) return;

    if (event.key === "ArrowRight") {
      setActiveIndex((prev) => (prev + 1) % galleryData.length);
    } else if (event.key === "ArrowLeft") {
      setActiveIndex(
        (prev) => (prev - 1 + galleryData.length) % galleryData.length
      );
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isTransitioning]);

  if (isMobile) {
    return (
      <section ref={sectionRef} className="w-full bg-white pt-et">
        <div className="container-et mx-auto">
          <div className="text-center py-et">
            <h2 className="container-heading font-krona">
              <GSAPTextReveal
                splitBy="words"
                animationType="slideUp"
                stagger={0.1}
                duration={0.8}
                delay={0.2}
              >
                Our Expanding Vision
              </GSAPTextReveal>
            </h2>
          </div>

          <div className="flex flex-col w-full h-[70vh]">
            {galleryData.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  boxRefs.current[index] = el;
                }}
                className="relative overflow-hidden cursor-pointer bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  width: "100%",
                  height: activeIndex === index ? "85%" : "20%",
                  transition: "height 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onClick={() => handleBoxClick(index)}
              >
                <div className="overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100" />

                {/* Collapsed content - horizontal title for mobile */}
                <div className="collapsed-content absolute inset-0 flex items-center justify-center text-white z-10">
                  <div className="text-center">
                    <h3
                      className="text-lg font-semibold text-white"
                      style={{
                        letterSpacing: "0.1em",
                        textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Expanded content - full description */}
                <div className="box-content absolute bottom-4 left-4 right-4 text-white z-10 opacity-0">
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm opacity-90 mb-2">
                    {item.shortDescription}
                  </p>
                  <div className="mt-4">
                    <p className="text-sm leading-relaxed opacity-95">
                      {item.expandedDescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white flex items-center justify-center"
    >
      <div className="container-et mx-auto pt-et">
        <div className="text-center">
          <h2 className="container-heading font-krona py-et">
            <GSAPTextReveal
              splitBy="words"
              animationType="slideUp"
              stagger={0.1}
              duration={0.8}
              delay={0.2}
            >
              Our Expanding Vision
            </GSAPTextReveal>
          </h2>
        </div>

        <div className="flex items-center h-[80vh] w-full">
          {galleryData.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                boxRefs.current[index] = el;
              }}
              className="relative overflow-hidden cursor-pointer bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "auto 200%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: activeIndex === index ? "85%" : "5%",
                height: "100%",
                transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onClick={() => handleBoxClick(index)}
            >
              <div className="overlay absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100" />
              {/* Collapsed content - rotated title */}
              <div className="collapsed-content absolute inset-0 flex items-center justify-center text-white z-10">
                <div
                  className="rotated-title text-2xl font-semibold text-white"
                  style={{
                    transform: "rotate(-90deg)",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.1em",
                  }}
                >
                  {item.title}
                </div>
              </div>

              {/* Expanded content - full description */}
              <div className="box-content absolute bottom-6 left-6 right-6 text-white z-10 opacity-0">
                <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm opacity-90 mb-4">
                  {item.shortDescription}
                </p>
                <div className="mt-6">
                  <p className="text-base leading-relaxed opacity-95 max-w-md">
                    {item.expandedDescription}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-400 mt-2 text-sm">
            Use arrow keys to navigate • Click to expand
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExpandingGallery;
