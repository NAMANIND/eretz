"use client";

import React, { useRef, useEffect, useState } from "react";
import { GSAPTextReveal } from "@/components/ui/GSAPTextReveal";
import { WhyDubaiHScroll } from "@/components/ui/WhyDubaiHScroll";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactForm } from "@/components/ui/ContactForm";
import { motion } from "framer-motion";
import { useScreen } from "../providers/Screen";

const items = [
  {
    id: 1,
    title: "High Rental Returns",
    description:
      "Benefit from rental yields as high as 8–10% annually, outperforming many major cities worldwide.",
    image: "/placeholder-1.jpg",
    category: "Investment",
  },
  {
    id: 2,
    title: "Zero Tax",
    description:
      "Enjoy zero income, capital gains, and wealth taxes, ensuring you keep more of what you earn.",
    image: "/placeholder-2.jpg",
    category: "Tax Benefits",
  },
  {
    id: 3,
    title: "Golden Visa Eligibility",
    description:
      "Investing in Dubai real estate can lead to long-term residency through the UAE's exclusive Golden Visa program.",
    image: "/placeholder-3.jpg",
    category: "Residency",
  },
  {
    id: 4,
    title: "Exceptional Safety Standards",
    description:
      "Ranked among the safest countries globally, UAE offers a secure environment supported by advanced law enforcement.",
    image: "/placeholder-1.jpg",
    category: "Safety",
  },
  {
    id: 5,
    title: "Vibrant Lifestyle & Entertainment",
    description:
      "From luxury malls to cultural festivals and thrilling attractions, Dubai offers an unmatched lifestyle experience.",
    image: "/placeholder-2.jpg",
    category: "Lifestyle",
  },
  {
    id: 6,
    title: "Advanced Healthcare Services",
    description:
      "Dubai boasts world-class hospitals and medical facilities, offering residents exceptional care and wellbeing.",
    image: "/placeholder-3.jpg",
    category: "Healthcare",
  },
  {
    id: 7,
    title: "Top-Tier Education Options",
    description:
      "Home to international schools and universities, Dubai provides globally accredited education for families and expatriates.",
    image: "/placeholder-1.jpg",
    category: "Education",
  },
  {
    id: 8,
    title: "Global Tourism Hotspot",
    description:
      "With iconic architecture, five-star resorts, and diverse experiences, Dubai continues to attract millions of international visitors every year.",
    image: "/placeholder-2.jpg",
    category: "Tourism",
  },
];

const WhyDubai: React.FC = () => {
  const { isMobile } = useScreen();
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative  bg-white pt-et z-10 "
      id="why-dubai"
      ref={sectionRef}
    >
      <div className="mx-auto  max-h-[99vh] w-full overflow-hidden">
        {/* Section Header */}
        <div className="text-center  ">
          <h2 className="container-heading font-krona py-et">
            <GSAPTextReveal
              splitBy="words"
              animationType="slideUp"
              stagger={0.1}
              duration={0.8}
              delay={0.2}
            >
              WHY DUBAI?
            </GSAPTextReveal>
          </h2>
        </div>

        <div className="relative">
          {isMobile ? (
            <div className="relative w-full">
              {/* Scroll-snap Carousel */}
              <div
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-1 px-4"
                onScroll={(e) => {
                  const target = e.currentTarget;
                  const next = Math.round(
                    target.scrollLeft / target.clientWidth
                  );
                  if (next !== activeIndex) setActiveIndex(next);
                }}
              >
                {items.map((item, index) => (
                  <div key={index} className={` flex-shrink-0 `}>
                    <div className="px-1">
                      <div className="relative group overflow-hidden rounded-2xl w-80 lg:w-96 mx-auto">
                        <div className="h-[400px] lg:h-[500px] relative">
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

              {/* Pagination dots */}
              <div className="mt-6 flex items-center justify-center">
                <div className="relative w-[80%] h-0.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gray-900 rounded-full transition-all duration-300 ease-out"
                    style={{
                      width: `${((activeIndex + 1) / items.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <WhyDubaiHScroll
              items={items}
              className="w-full h-full"
              containerRef={sectionRef as React.RefObject<HTMLDivElement>}
              scrubValue={1}
              ease="none"
            />
          )}
        </div>
      </div>
      <div className="w-full bg-white h-fit pb-20 pt-20">
        <div className="relative z-10 text-center " id="contact">
          <div className="container flex items-center flex-col mx-auto px-4">
            <h1 className="font-normal sm:w-3/4 w-full container-hero text-center  mb-6  font-krona">
              <GSAPTextReveal
                splitBy="lines"
                animationType="slideUp"
                delay={0.2}
                duration={0.8}
                stagger={0.2}
              >
                LET&apos;S MAKE THIS OFFICIAL, GET IN TOUCH AND START YOUR
                INVESTMENT JOURNEY
              </GSAPTextReveal>
            </h1>

            {/* Description */}
            <div className="max-w-3xl lg:max-w-5xl mx-auto text-center mb-8 sm:mb-12 sm:px-4 px-0">
              <h4 className="text-base sm:text-lg text-gray-800 leading-relaxed text-center">
                <GSAPTextReveal
                  splitBy="lines"
                  animationType="slideUp"
                  delay={0.4}
                  duration={0.8}
                  stagger={0.2}
                >
                  Ready to invest in Dubai&apos;s premium real estate market?
                  Our team is here to guide you through every step of your
                  property investment journey. From exclusive developments to
                  personalized investment strategies.
                </GSAPTextReveal>
              </h4>
            </div>

            {/* CTA Button */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <motion.button
                  className="w-full sm:w-auto bg-black text-gray-200 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.button>
              </DialogTrigger>
              <DialogContent className="max-w-md w-[90vw] p-0">
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle className="text-xl font-semibold text-gray-900 font-krona">
                    Get In Touch
                  </DialogTitle>
                </DialogHeader>
                <div className="p-6 pt-4">
                  <ContactForm onClose={() => setIsDialogOpen(false)} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDubai;
