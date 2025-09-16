"use client";

import React, { useRef } from "react";
import { GSAPTextReveal } from "@/components/ui/GSAPTextReveal";
import { WhyDubaiHScroll } from "@/components/ui/WhyDubaiHScroll";

const WhyDubai: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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
  return (
    <section
      className="relative w-full  min-h-screen bg-white py-1 z-10 overflow-x-hidden"
      id="why-dubai"
      ref={sectionRef}
    >
      <div className="mx-auto container-w">
        {/* Section Header */}
        <div className="text-center ">
          <h2 className="container-heading font-krona">
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

        {/* ScrollVelocity Content */}
        <div className="relative">
          <WhyDubaiHScroll
            items={items}
            className="w-full h-full"
            containerRef={sectionRef as React.RefObject<HTMLDivElement>}
            scrubValue={1}
            ease="none"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyDubai;
