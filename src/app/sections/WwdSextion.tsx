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

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      id="what-we-do"
    >
      <div className=" mx-auto py-20">
        <div className="text-center mb-16">
          <h2 className="text-[30px] font-normal text-gray-900 mb-6 leading-[1.1] font-krona">
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
                      : "transparent",
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

                    <div className="mb-8">
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
                    </div>

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
