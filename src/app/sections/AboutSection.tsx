"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GSAPTextReveal from "@/components/ui/GSAPTextReveal";

import { ScrollTextReveal } from "@/components/animations/ScrollTextReveal";

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const greyContentRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !greyContentRef.current || !frameRef.current)
      return;

    const section = frameRef.current;
    const greyContent = greyContentRef.current;

    // Initially position grey content below the frame
    gsap.set(greyContent, {
      y: "-140vh",
      paddingBottom: "100vh",
      paddingRight: "20px",
      paddingLeft: "20px",
      bottom: "0%",
    });

    // Create timeline with midpoint animation
    const timeline = gsap.timeline();

    timeline
      .to(greyContent, {
        y: "-100vh", // Midpoint position
        paddingBottom: "50vh",
        paddingRight: "16px",
        paddingLeft: "16px",
        bottom: "100%",
        duration: 0.5,
      })
      .to(greyContent, {
        y: "0vh", // Final position
        paddingBottom: "0vh",
        paddingRight: "0px",
        paddingLeft: "0px",
        bottom: "0%",
        duration: 0.5,
      });

    // Create scroll trigger animation with timeline
    ScrollTrigger.create({
      trigger: section,
      start: "top 150%",
      end: "bottom 150%",
      scrub: 1,
      animation: timeline,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-white py-24  px-6 lg:px-12"
    >
      <div ref={frameRef} className=" mx-auto max-w-7xl  ">
        <div className="h-[100vh] flex items-center justify-center gap-4 flex-col">
          <ScrollTextReveal
            mode="characters"
            startOffset="start center"
            endOffset="start 0.3"
            className="text-2xl lg:text-6xl font-normal text-gray-900 w-6xl font-krona leading-[1.1]"
          >
            At ERETZ, we shape not just buildings, but environments that
            immediately feel right.
          </ScrollTextReveal>
        </div>
        {/* Section Header */}
        <div className="text-left" id="about">
          <h2 className="text-[30px] text-center font-normal  text-gray-900 mb-6 leading-[1.1] font-krona">
            <GSAPTextReveal
              splitBy="words"
              animationType="slideUp"
              stagger={0.1}
              duration={0.8}
              delay={0.2}
            >
              ABOUT ERETZ
            </GSAPTextReveal>
          </h2>

          <h5 className="text-xl text-gray-900  leading-[1.3] py-4 text-justify">
            <GSAPTextReveal
              splitBy="lines"
              animationType="slideUp"
              stagger={0.3}
              duration={0.8}
              delay={0.2}
              className="text-justify"
            >
              ERETZ is a property development company rooted in the values of
              authenticity, quality, and integrity. Inspired by an ancient
              language word "Eretz", \n meaning land or earth, our name reflects
              a deep connection to the ground we build on and the lives we aim
              to enrich. We specialize in crafting \n residential buildings that
              combine timeless design with solid construction homes that are
              both an emotional and financial investment.
            </GSAPTextReveal>
          </h5>
        </div>

        {/* Red Frame with Grey Content */}
        <div className="relative w-full max-w-7xl mx-auto my-8">
          <div className="grid grid-cols-3 gap-0rounded-2xl">
            <div className="relative  h-[50vh]  ">
              <img
                src="/placeholder-1.jpg"
                alt="Frame Left"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              ref={greyContentRef}
              className="relative bg-transparent overflow-hidden flex items-center justify-center h-[50vh] "
            >
              <img
                src="/placeholder-2.jpg"
                alt="Frame Center"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="relative h-[50vh]">
              <img
                src="/placeholder-3.jpg"
                alt="Frame Right"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="text-left pt-10">
          <h5 className="text-lg text-gray-900 mb-6 leading-[0.95]">
            <GSAPTextReveal
              splitBy="lines"
              animationType="slideUp"
              stagger={0}
              duration={0.8}
              delay={0}
              reveal="onTrigger"
              className="text-justify"
            >
              At ERETZ, we don't just develop structures, we shape enduring
              lifestyles. Our commitment to craftsmanship is evident in every
              project we undertake, \n ensuring that every detail, from layout
              to finish, serves a purpose and reflects our genuine care for the
              people who call our spaces home.
            </GSAPTextReveal>
          </h5>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
