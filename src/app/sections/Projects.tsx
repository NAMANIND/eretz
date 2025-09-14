"use client";

import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSAPTextReveal } from "@/components/ui/GSAPTextReveal";
import { ScrollVelocity } from "@/components/ui/ScrollVelocity";

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
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
    <section className="relative w-full min-h-screen bg-white" id="projects">
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
              OUR PROJECTS
            </GSAPTextReveal>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Large Horizontal Image - Top Left */}
          <div className="lg:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-br-4xl">
            <div className="h-[400px] lg:h-[500px] relative">
              <img
                src="/placeholder-2.jpg"
                alt="Modern Bedroom Design"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Large Vertical Image - Top Right */}
          <div className="lg:col-span-1 lg:row-span-2 relative group overflow-hidden rounded-bl-4xl">
            <div className="h-[400px] lg:h-[500px] relative">
              <img
                src="/placeholder-2.jpg"
                alt="Luxury Bathroom Design"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Two Smaller Images - Bottom Left and Right  text*/}
          <div className="lg:col-span-1 relative group overflow-hidden ">
            <div className="aspect-[4/3] relative">
              <img
                src="/placeholder-3.jpg"
                alt="Bedroom Interior Design"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          <div className="lg:col-span-1 relative group overflow-hidden ">
            <div className="aspect-[4/3] relative">
              <img
                src="/placeholder-1.jpg"
                alt="Modern Living Space"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          <div className="lg:col-span-1 relative group overflow-hidden ">
            <div className="aspect-[4/3] relative">
              <div className="text-3xl lg:text-5xl font-light text-gray-900 leading-[1.2] font-krona italic mb-2">
                <GSAPTextReveal
                  splitBy="words"
                  animationType="slideUp"
                  stagger={0.2}
                  duration={1}
                  delay={0.5}
                >
                  Crafting homes
                </GSAPTextReveal>
              </div>
              <div className="text-xl lg:text-2xl font-normal text-gray-700 leading-[1.3] font-krona">
                <GSAPTextReveal
                  splitBy="words"
                  animationType="slideUp"
                  stagger={0.1}
                  duration={0.8}
                  delay={0.8}
                >
                  with Integrity.
                </GSAPTextReveal>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {/* Large Horizontal Image - Top Left */}
          <div className="lg:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-tr-4xl">
            <div className="h-[400px] lg:h-[500px] relative">
              <img
                src="/placeholder-2.jpg"
                alt="Modern Bedroom Design"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Large Vertical Image - Top Right */}
          <div className="lg:col-span-1 lg:row-span-2 relative group overflow-hidden rounded-tl-4xl">
            <div className="h-[400px] lg:h-[500px] relative">
              <img
                src="/placeholder-2.jpg"
                alt="Luxury Bathroom Design"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Two Smaller Images - Bottom Left and Right  text*/}
          <div className="lg:col-span-1 relative group overflow-hidden ">
            <div className="aspect-[4/3] relative">
              <img
                src="/placeholder-3.jpg"
                alt="Bedroom Interior Design"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          <div className="lg:col-span-1 relative group overflow-hidden ">
            <div className="aspect-[4/3] relative">
              <img
                src="/placeholder-1.jpg"
                alt="Modern Living Space"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          <div className="lg:col-span-1 relative group overflow-hidden ">
            <div className="aspect-[4/3] relative">
              <div className="text-3xl lg:text-5xl font-light text-gray-900 leading-[1.2] font-krona italic mb-2">
                <GSAPTextReveal
                  splitBy="words"
                  animationType="slideUp"
                  stagger={0.2}
                  duration={1}
                  delay={0.5}
                >
                  Crafting homes
                </GSAPTextReveal>
              </div>
              <div className="text-xl lg:text-2xl font-normal text-gray-700 leading-[1.3] font-krona">
                <GSAPTextReveal
                  splitBy="words"
                  animationType="slideUp"
                  stagger={0.1}
                  duration={0.8}
                  delay={0.8}
                >
                  with Integrity.
                </GSAPTextReveal>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <ScrollVelocity
            items={items}
            velocity={200}
            className="w-full h-full"
            damping={500}
            stiffness={4000}
            numCopies={6}
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
