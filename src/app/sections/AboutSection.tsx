"use client";

import React from "react";
import { motion } from "framer-motion";
import GSAPTextReveal from "@/components/ui/GSAPTextReveal";
import { ScrollTextReveal } from "@/components/animations/ScrollTextReveal";
import { useScreen } from "@/app/providers/Screen";

const AboutSection: React.FC = () => {
  const { isMobile } = useScreen();

  if (isMobile) {
    return (
      <section className="w-full min-h-screen overflow-hidden bg-white ">
        <div className=" mx-auto container-et ">
          <div className="py-8  flex items-center justify-center gap-4 flex-col text-center h-[80vh]">
            <h1 className="text-2xl font-semibold text-black text-left  leading-[1.2]">
              <ScrollTextReveal
                mode="characters"
                startOffset="start 0.8"
                endOffset="end 0.2"
                className="text-4xl font-semibold w-full text-gray-900  text-wrap leading-[1.1]"
              >
                At ERETZ, we shape not just buildings, but environments that
                immediately feel right.
              </ScrollTextReveal>
            </h1>
          </div>
          <div className="text-center" id="about">
            <h2 className=" container-heading py-et font-krona">
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

            <h5 className="text-[15px] text-black  leading-[1.3] text-center">
              <GSAPTextReveal
                splitBy="lines"
                animationType="slideUp"
                stagger={0.3}
                duration={0.8}
                delay={0.2}
                className="text-justify-center"
              >
                ERETZ is a property development company rooted in the values of
                authenticity, quality, and integrity. Inspired by an ancient
                language word &quot;Eretz&quot;, meaning land or earth, our name
                reflects a deep connection to the ground we build on and the
                lives we aim to enrich. We specialize in crafting residential
                buildings that combine timeless design with solid construction
                homes that are both an emotional and financial investment.
              </GSAPTextReveal>
            </h5>
          </div>

          <div className=" w-full  mx-auto my-6 ">
            <div className="grid grid-cols-1 gap-3 rounded-2xl">
              <div className="aspect-video">
                <img
                  src="/about/mobile.png"
                  alt="Frame Center"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div className="text-left ">
            <h5 className="text-[15px] text-black mb-6 leading-[1.4] text-justify">
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
    <section className=" w-full min-h-screen  z-2  ">
      <div className="h-[80vh] container-et flex items-center justify-center gap-4 flex-col">
        <ScrollTextReveal
          mode="characters"
          startOffset="start 0.8"
          endOffset="end 0.2"
          className="text-2xl lg:text-7xl font-semibold text-gray-900 w-full  leading-[1.1]"
        >
          At ERETZ, we shape not just buildings, but environments that
          immediately feel right.
        </ScrollTextReveal>
      </div>
      <div className=" mx-auto container-et  ">
        <div className="text-center " id="about">
          <h2 className=" container-heading py-et font-krona">
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

          <h5 className="text-xl text-black  leading-[1.3] text-justify">
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
              language word &quot;Eretz&quot;, meaning land or earth, our name
              reflects a deep connection to the ground we build on and the lives
              we aim to enrich. We specialize in crafting residential buildings
              that combine timeless design with solid construction homes that
              are both an emotional and financial investment.
            </GSAPTextReveal>
          </h5>
        </div>

        <div className=" w-full  mx-auto my-5  ">
          <div className="grid grid-cols-3 gap-0  ">
            <div className="  h-[60vh]  ">
              <img
                src="/about/a.png"
                alt="Frame Left"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div className=" bg-transparent opacity-0 top-0 left-0 flex items-center justify-center h-[60vh] ">
              <img
                src="/about/b.png"
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

        <div className="text-left h-[10vh] w-full">
          <h5 className="text-lg text-black  leading-[0.95] w-full">
            <GSAPTextReveal
              splitBy="lines"
              animationType="slideUp"
              delay={0.2}
              duration={0.8}
              stagger={0.2}
              className="text-justify"
            >
              At ERETZ, we don&apos;t just develop structures, we shape enduring
              lifestyles. Our commitment to craftsmanship is evident in every
              project we undertake, ensuring that every detail, from layout to
              finish, serves a purpose and reflects our genuine care for the
              people who call our spaces home.
            </GSAPTextReveal>
          </h5>
        </div>

        <div className="h-[calc(20vh_-_20px)]" />
      </div>
    </section>
  );
};

export default AboutSection;
