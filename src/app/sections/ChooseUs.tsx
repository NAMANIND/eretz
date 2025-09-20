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
    title: "Ethics",
    shortDescription:
      "We operate with integrity, guided by honesty and fairness at every stage",
    expandedDescription:
      "We operate with integrity, guided by honesty and fairness at every stage. From planning to handover, our approach is guided by doing what is right for our customers and partners.",
    image:
      "https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Transparency",
    shortDescription:
      "With open communication, clear documentation, and genuine updates at every stage",
    expandedDescription:
      "With open communication, clear documentation, and genuine updates at every stage, we ensure there are no surprises just confidence in your investment.",
    image:
      "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Quality",
    shortDescription:
      "Quality isn't just a promise, it's the foundation of every ERETZ project",
    expandedDescription:
      "Quality isn't just a promise, it's the foundation of every ERETZ project. We use trusted materials and expert craftsmanship to deliver residences that last for generations.",
    image:
      "https://images.unsplash.com/photo-1569959220744-ff553533f492?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Safety",
    shortDescription:
      "We value the well-being of everyone involved in our projects",
    expandedDescription:
      "We value the well-being of everyone involved in our projects. By adhering to the highest safety standards on-site, we create secure environments that protect our people.",
    image:
      "https://images.unsplash.com/photo-1607585011081-241d2bacb7de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    title: "Timely Delivery",
    shortDescription:
      "With disciplined project management and a transparent process",
    expandedDescription:
      "With disciplined project management and a transparent process, we make sure your home is ready when we promise without compromising on quality or detail.",
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
          <div className="text-center py-et w-full">
            <h2 className="container-heading font-krona">
              <GSAPTextReveal
                splitBy="words"
                animationType="slideUp"
                stagger={0.1}
                duration={0.8}
                delay={0.2}
              >
                Why Choose ERETZ?
              </GSAPTextReveal>
            </h2>

            <h5 className="text-[15px] text-black  leading-[1.3] text-center">
              <GSAPTextReveal
                splitBy="lines"
                animationType="slideUp"
                stagger={0.3}
                duration={0.8}
                delay={0.2}
                className="text-justify-center"
              >
                At ERETZ Developers, trust is the foundation of everything we
                build. Our promise is simple, homes crafted with ethics,
                quality, and care.
              </GSAPTextReveal>
            </h5>
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
                  <div className="mt-2">
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
        <div className="text-center w-full">
          <h2 className="container-heading font-krona py-et">
            <GSAPTextReveal
              splitBy="words"
              animationType="slideUp"
              stagger={0.1}
              duration={0.8}
              delay={0.2}
            >
              Why Choose ERETZ?
            </GSAPTextReveal>
          </h2>

          <h5 className="text-xl text-black  leading-[1.3] ">
            <GSAPTextReveal
              splitBy="words"
              animationType="slideUp"
              stagger={0.05}
              duration={0.8}
              delay={0.2}
            >
              At ERETZ Developers, trust is the foundation of everything we
              build. Our promise is simple, homes crafted with ethics, quality,
              and care.
            </GSAPTextReveal>
          </h5>
        </div>

        <div className="flex items-center h-[80vh] w-full my-5">
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

                <div className="mt-2">
                  <p className="text-base leading-relaxed opacity-95 max-w-md">
                    {item.expandedDescription}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-400  text-sm">
            Use arrow keys to navigate • Click to expand
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExpandingGallery;
