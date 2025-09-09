"use client";

import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSAPTextReveal } from "@/components/ui/GSAPTextReveal";

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  return (
    <section
      className="relative w-full min-h-screen bg-white py-24 px-6 lg:px-12"
      id="projects"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-normal text-gray-900 mb-8 leading-[1.1] font-krona">
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
              <img
                src="/placeholder-3.jpg"
                alt="Modern Living Space"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
