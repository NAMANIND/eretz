"use client";

import React, { useState, useEffect, useRef } from "react";
import GSAPTextReveal from "@/components/ui/GSAPTextReveal";

const WwdSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imageScale, setImageScale] = useState(1);
  const [fadeImageIndex, setFadeImageIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile breakpoint detection
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Initialize
    setIsMobile(mediaQuery.matches);

    // Subscribe with fallback for older browsers
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange);
      } else if (typeof mediaQuery.removeListener === "function") {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const services = [
    {
      id: 1,
      title: "Residential real estate development",
      description:
        "We design and build premium residential properties that blend timeless architecture with modern living, ensuring comfort, elegance, and long-term value.",
      details: [
        "Luxury villa and apartment construction",
        "Master-planned residential communities",
        "Sustainable and energy-efficient design",
        "Turnkey project delivery",
      ],
      image: "/placeholder-1.jpg",
    },
    {
      id: 2,
      title: "Commercial real estate development",
      description:
        "We develop high-quality commercial spaces tailored for business success, combining strategic locations with innovative design and robust construction.",
      details: [
        "Office towers and business parks",
        "Retail and mixed-use developments",
        "Flexible workspace solutions",
        "End-to-end project management",
      ],
      image: "/placeholder-2.jpg",
    },
    {
      id: 3,
      title: "Strategic plot development",
      description:
        "We identify, acquire, and transform strategic land plots into valuable assets, maximizing potential through thoughtful planning and expert execution.",
      details: [
        "Land acquisition and feasibility analysis",
        "Urban planning and zoning optimization",
        "Infrastructure and site development",
        "Investment and joint venture opportunities",
      ],
      image: "/placeholder-3.jpg",
    },
  ];

  const changeImageWithTransition = (newIndex: number) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setFadeImageIndex(newIndex);
    setImageScale(1);

    setTimeout(() => {
      setImageScale(1.001);
      setCurrentImageIndex(newIndex);
      setFadeImageIndex(null);
      setIsTransitioning(false);
    }, 400);
  };

  useEffect(() => {
    const zoomInterval = setInterval(() => {
      setImageScale((prevScale) => {
        const increment = 0.0005;
        const nextScale = prevScale + increment;
        return nextScale >= 1.2 ? 1.2 : nextScale;
      });
    }, 32);
    return () => clearInterval(zoomInterval);
  }, [currentImageIndex]);

  function hoverEnterHandler(index: number) {
    setHoveredIndex(index);
    setIsHovered(true);
    if (index === currentImageIndex) return;
    changeImageWithTransition(index);
  }

  function hoverLeaveHandler() {
    setHoveredIndex(null);
    setIsHovered(false);
  }

  useEffect(() => {
    if (!services.length) return;
    intervalRef.current = setInterval(() => {
      if (!isTransitioning) {
        const nextIndex = (currentImageIndex + 1) % services.length;
        if (isHovered && hoveredIndex !== currentImageIndex) return;
        changeImageWithTransition(nextIndex);
      }
    }, 10000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentImageIndex, isTransitioning, isHovered, services.length]);

  /** Determine which image to show */
  const getCurrentImage = () => services[currentImageIndex].image;

  // Mobile layout with stacked cards
  if (isMobile) {
    return (
      <section
        className="relative min-h-screen w-full bg-white py-12"
        id="what-we-do"
      >
        <div className="mx-auto container-f px-4 max-w-screen-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-krona text-gray-900 mb-2">
              What We Do
            </h2>
            <p className="text-gray-600 text-base">
              Premium development across residential, commercial, and strategic
              land.
            </p>
          </div>

          <div className="space-y-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="relative rounded-2xl overflow-hidden border border-gray-100 bg-gradient-to-b from-white to-gray-50 shadow-sm active:shadow-md transition-shadow"
              >
                {/* Service Image */}
                <div className="relative aspect-[16/9]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 will-change-transform active:scale-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block text-[10px] tracking-wide uppercase text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-2 py-1 mb-2">
                      Service
                    </span>
                    <h3 className="text-white text-2xl font-bold leading-tight drop-shadow-md">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-5">
                  <p className="text-gray-700 text-[15px] leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <div>
                    <h4 className="text-base font-semibold text-gray-900 mb-3">
                      Key Services:
                    </h4>
                    <ul className="space-y-2.5">
                      {service.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-start text-gray-800 text-[15px]"
                        >
                          <svg
                            className="mt-0.5 mr-3 h-5 w-5 text-emerald-600 flex-shrink-0"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.704 5.29a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414L8.75 11.586l6.543-6.543a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* <div className="mt-6">
                    <button
                      type="button"
                      className="w-full inline-flex items-center justify-center rounded-xl bg-gray-900 text-white px-4 py-3 text-[15px] font-medium active:scale-[0.98] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900"
                    >
                      Learn more
                    </button>
                  </div> */}
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
      className="relative min-h-screen w-full overflow-hidden"
      id="what-we-do"
    >
      <div className=" mx-auto  container-f">
        <div className="text-center">
          <h2 className="container-heading font-krona">
            <GSAPTextReveal
              splitBy="words"
              animationType="slideUp"
              stagger={0.1}
              duration={0.8}
              delay={0}
            >
              What We Do
            </GSAPTextReveal>
          </h2>
        </div>

        {/* Main Container */}
        <div className="relative w-full h-[calc(100vh-200px)] max-h-[880px] min-h-[600px] overflow-hidden">
          {/* Background Images */}
          <div className="absolute inset-0">
            {/* Current Image */}
            <div
              className="absolute inset-0 w-full h-full transition-transform duration-[100ms] ease-linear"
              style={{
                backgroundImage: `url('${getCurrentImage()}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `scale(${imageScale})`,
                zIndex: 1,
              }}
            />

            {/* Fade Image (Next) */}
            {fadeImageIndex !== null && (
              <div
                className={`absolute inset-0 w-full h-full opacity-0 animate-fadeInSlow duration-[400ms]`}
                style={{
                  backgroundImage: `url('${services[fadeImageIndex].image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform: `scale(${imageScale})`,
                  zIndex: 2,
                }}
              />
            )}
          </div>

          {/* Three Column Grid */}
          <div className="relative z-10 grid grid-rows-3 h-full">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative flex flex-col justify-center items-center transition-all duration-500 group cursor-pointer"
                onMouseEnter={() => hoverEnterHandler(index)}
                onMouseLeave={() => hoverLeaveHandler()}
                style={{
                  background:
                    hoveredIndex === index
                      ? "linear-gradient(180deg, rgba(6,22,46,0.56) 0%, rgba(6,22,46,0.24) 100%)"
                      : "linear-gradient( 180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)",
                  backdropFilter:
                    hoveredIndex === index ? "blur(10px)" : "none",
                  borderTop: index === 0 ? "none" : "5px solid white",
                  borderBottom:
                    index === services.length - 1 ? "none" : "5px solid white",
                }}
              >
                <div
                  className="max-w-full mx-auto text-center flex flex-row transition-transform justify-between duration-500 ease-[cubic-bezier(0.87,-0.005,0.215,0.985)] px-8"
                  style={{
                    transform:
                      hoveredIndex === index
                        ? "translateX(0)"
                        : "translateX(calc(33%))",
                  }}
                >
                  {/* Always Visible Title */}
                  <h3 className="text-[30px]  font-bold w-1/3 text-white mb-6 drop-shadow-lg uppercase font-krona  transition-all  duration-500 ease-[cubic-bezier(0.87,-0.005,0.215,0.985)] ">
                    {service.title}
                  </h3>

                  {/* Content Appears on Hover */}

                  <div
                    className="transition-opacity duration-500 w-1/2 ease-out"
                    style={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  >
                    <p className="text-white/90 text-lg leading-relaxed mb-8 text-right drop-shadow-md">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* <a
                  href="#"
                  className="absolute inset-0 z-20 text-transparent select-none"
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn More
                </a> */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fade Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeInSlow {
          animation: fadeIn 0.4s ease-in-out forwards;
        }
      `}</style>
    </section>
  );
};

export default WwdSection;
