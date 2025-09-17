"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GSAPTextReveal from "@/components/ui/GSAPTextReveal";
import { ScrollTextReveal } from "@/components/animations/ScrollTextReveal";

const AboutSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

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

  if (isMobile) {
    return (
      <section className="w-full min-h-screen overflow-hidden bg-white ">
        <div className=" mx-auto container ">
          <div className="py-16 px-4 flex items-center justify-center gap-4 flex-col text-center">
            <h1 className="text-2xl font-semibold text-gray-900 leading-[1.2]">
              At ERETZ, we shape not just buildings, but environments that
              immediately feel right.
            </h1>
          </div>
          <div className="text-center" id="about">
            <h2 className=" container-heading  font-krona">ABOUT ERETZ</h2>
            <h5 className="text-base text-gray-900 leading-[1.5] text-justify ">
              ERETZ is a property development company rooted in the values of
              authenticity, quality, and integrity. Inspired by an ancient
              language word &quot;Eretz&quot;, meaning land or earth, our name
              reflects a deep connection to the ground we build on and the lives
              we aim to enrich. We specialize in crafting residential buildings
              that combine timeless design with solid construction—homes that
              are both an emotional and financial investment.
            </h5>
          </div>

          <div className=" w-full  mx-auto my-6 ">
            <div className="grid grid-cols-1 gap-3 rounded-2xl">
              <div className=" h-64">
                <img
                  src="/placeholder-1.jpg"
                  alt="Frame Left"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className=" h-64">
                <img
                  src="/placeholder-2.jpg"
                  alt="Frame Center"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className=" h-64">
                <img
                  src="/placeholder-3.jpg"
                  alt="Frame Right"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="text-left ">
            <h5 className="text-base text-gray-900 mb-6 leading-[1.4] text-justify">
              At ERETZ, we don&apos;t just develop structures, we shape enduring
              lifestyles. Our commitment to craftsmanship is evident in every
              project we undertake, ensuring that every detail, from layout to
              finish, serves a purpose and reflects our genuine care for the
              people who call our spaces home.
            </h5>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className=" w-full min-h-screen   bg-white ">
      <div className=" w-full  mx-auto my-10 sticky top-0">
        <div className="grid grid-cols-3  gap-0rounded-2xl">
          <div className="  h-[60vh] opacity-0  ">
            <img
              src="/placeholder-1.jpg"
              alt="Frame Left"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            // ref={greyContentRef}
            // style={{
            //   y: greyContentY,
            //   bottom: greyContentBottom,
            //   paddingRight: padding,
            //   paddingLeft: padding,
            // }}
            className=" bg-transparent  top-0 left-0 flex items-center justify-center h-[60vh] "
          >
            <img
              src="/placeholder-2.jpg"
              alt="Frame Center"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
          <div className=" h-[60vh] opacity-0">
            <img
              src="/placeholder-3.jpg"
              alt="Frame Right"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className=" mx-auto container ">
        <div className="h-[100vh] flex items-center justify-center gap-4 flex-col">
          <ScrollTextReveal
            mode="characters"
            startOffset="start center"
            endOffset="start 0.3"
            className="text-2xl lg:text-7xl font-semibold text-gray-900 w-6xl  leading-[1.1]"
          >
            At ERETZ, we shape not just buildings, but environments that
            immediately feel right.
          </ScrollTextReveal>
        </div>
        {/* Section Header */}
        <div className="text-center" id="about">
          <h2 className=" container-heading  font-krona">
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

          <h5 className="text-xl text-gray-900  leading-[1.3] text-justify">
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
              language word &quot;Eretz&quot;, \n meaning land or earth, our
              name reflects a deep connection to the ground we build on and the
              lives we aim to enrich. We specialize in crafting \n residential
              buildings that combine timeless design with solid construction
              homes that are both an emotional and financial investment.
            </GSAPTextReveal>
          </h5>
        </div>

        <div className=" w-full  mx-auto my-10">
          <div className="grid grid-cols-3 gap-0rounded-2xl">
            <div className="  h-[60vh]  ">
              <img
                src="/placeholder-1.jpg"
                alt="Frame Left"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              // ref={greyContentRef}
              // style={{
              //   y: greyContentY,
              //   bottom: greyContentBottom,
              //   paddingRight: padding,
              //   paddingLeft: padding,
              // }}
              className=" bg-transparent opacity-0 top-0 left-0 flex items-center justify-center h-[60vh] "
            >
              <img
                src="/placeholder-2.jpg"
                alt="Frame Center"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
            <div className=" h-[60vh]">
              <img
                src="/placeholder-3.jpg"
                alt="Frame Right"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="text-left">
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
              At ERETZ, we don&apos;t just develop structures, we shape enduring
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
