"use client";

import React, { useState, useEffect, useRef } from "react";
import { useScreen } from "@/app/providers/Screen";
import GSAPTextReveal from "@/components/ui/GSAPTextReveal";

const WwdSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imageScale, setImageScale] = useState(1);
  const [fadeImageIndex, setFadeImageIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile } = useScreen();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile breakpoint detection

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
      <section className="relative w-full bg-white " id="what-we-do">
        <div className="mx-auto container-et">
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
    <section className="relative w-full overflow-hidden" id="what-we-do">
      <div className=" mx-auto  container-f">
        <div className="text-center">
          <h2 className="container-heading font-krona py-et">
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
          <div className="relative z-10 grid grid-cols-3 h-full">
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
                      : "linear-gradient(180deg, rgba(6,22,46,0.36) 0%, rgba(6,22,46,0.12) 100%)",
                  backdropFilter:
                    hoveredIndex === index ? "blur(10px)" : "none",
                  borderLeft: index === 0 ? "none" : "3px solid white",
                  borderRight:
                    index === services.length - 1 ? "none" : "3px solid white",
                }}
              >
                <div
                  className="max-w-[390px] mx-auto text-center transition-all duration-500 ease-[cubic-bezier(0.87,-0.005,0.215,0.985)]"
                  style={{
                    transform:
                      hoveredIndex === index
                        ? "translateY(0)"
                        : "translateY(calc(50% - 100px))",
                  }}
                >
                  {/* Always Visible Title */}
                  <h3 className="text-[30px] font-bold text-white mb-6 drop-shadow-lg uppercase">
                    {service.title}
                  </h3>

                  {/* Content Appears on Hover */}
                  <div
                    className="transition-opacity duration-500 ease-out"
                    style={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  >
                    <p className="text-white/90 text-lg leading-relaxed mb-8 drop-shadow-md">
                      {service.description}
                    </p>

                    {/* <div className="mb-8">
                      <h4 className="text-lg font-semibold text-white mb-4 drop-shadow-md">
                        Key Services:
                      </h4>
                      <ul className="space-y-3 text-left">
                        {service.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-center text-white/95 text-sm drop-shadow-sm"
                          >
                            <span className="mr-3 h-2 w-2 rounded-full bg-white/80 drop-shadow-sm" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div> */}

                    {/* <div className="inline-flex items-center text-white hover:text-white/80 transition-colors duration-300 group/btn">
                      <span className="text-lg font-medium mr-3 drop-shadow-md">
                        Learn More
                      </span>
                      <svg
                        className="w-6 h-3 transition-transform duration-300 group-hover/btn:translate-x-1 drop-shadow-sm"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 22 12"
                        fill="currentColor"
                      >
                        <path d="M15 0.749925C14.9297 0.819647 14.8739 0.902598 14.8358 0.993992C14.7978 1.08539 14.7782 1.18342 14.7782 1.28242C14.7782 1.38143 14.7978 1.47946 14.8358 1.57086C14.8739 1.66225 14.9297 1.7452 15 1.81492L18.45 5.26493H0.795013C0.596101 5.26493 0.405336 5.34394 0.264683 5.48459C0.124031 5.62525 0.0450134 5.81601 0.0450134 6.01493C0.0450134 6.21384 0.124031 6.4046 0.264683 6.54525C0.405336 6.68591 0.596101 6.76493 0.795013 6.76493H18.435L15 10.1924C14.8603 10.3329 14.7819 10.523 14.7819 10.7212C14.7819 10.9193 14.8603 11.1094 15 11.2499C15.1405 11.3896 15.3306 11.468 15.5288 11.468C15.7269 11.468 15.917 11.3896 16.0575 11.2499L20.8275 6.47992C20.8917 6.41833 20.9428 6.34439 20.9777 6.26254C21.0126 6.1807 21.0306 6.09265 21.0306 6.00367C21.0306 5.9147 21.0126 5.82665 20.9777 5.74481C20.9428 5.66296 20.8917 5.58902 20.8275 5.52742L16.065 0.749925C15.9953 0.679629 15.9123 0.623833 15.8209 0.585757C15.7296 0.54768 15.6315 0.528076 15.5325 0.528076C15.4335 0.528076 15.3355 0.54768 15.2441 0.585757C15.1527 0.623833 15.0697 0.679629 15 0.749925Z" />
                      </svg>
                    </div> */}
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
