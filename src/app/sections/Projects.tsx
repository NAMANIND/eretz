"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GSAPTextReveal } from "@/components/ui/GSAPTextReveal";
import { ScrollVelocity } from "@/components/ui/ScrollVelocity";
import { useScreen } from "../providers/Screen";

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const items: ProjectItem[] = [
  {
    id: 1,
    title: "High Rental Returns",
    description:
      "Benefit from rental yields as high as 8–10% annually, outperforming many major cities worldwide.",
    image: "/projects/1.png",
    category: "Investment",
  },
  {
    id: 2,
    title: "Zero Tax",
    description:
      "Enjoy zero income, capital gains, and wealth taxes, ensuring you keep more of what you earn.",
    image: "/projects/2.png",
    category: "Tax Benefits",
  },
  {
    id: 3,
    title: "Golden Visa Eligibility",
    description:
      "Investing in Dubai real estate can lead to long-term residency through the UAE's exclusive Golden Visa program.",
    image: "/projects/3.png",
    category: "Residency",
  },
  {
    id: 4,
    title: "World-Class Infrastructure",
    description:
      "Experience modern amenities and advanced infrastructure that set new standards for urban living.",
    image: "/projects/4.png",
    category: "Infrastructure",
  },
  {
    id: 5,
    title: "Safe and Secure Environment",
    description:
      "Dubai is renowned for its low crime rates and high standards of safety, making it ideal for families and investors.",
    image: "/projects/5.png",
    category: "Safety",
  },
  {
    id: 6,
    title: "Strong Capital Appreciation",
    description:
      "Benefit from consistent property value growth in one of the world’s fastest-growing cities.",
    image: "/projects/6.png",
    category: "Appreciation",
  },
  {
    id: 7,
    title: "Diverse Property Portfolio",
    description:
      "Choose from a wide range of residential, commercial, and luxury properties to suit every need.",
    image: "/projects/7.png",
    category: "Diversity",
  },
  {
    id: 8,
    title: "Flexible Payment Plans",
    description:
      "Developers offer attractive and flexible payment options, making property ownership accessible.",
    image: "/projects/8.png",
    category: "Payment",
  },
  {
    id: 9,
    title: "Vibrant Expat Community",
    description:
      "Join a multicultural society with a welcoming environment for expatriates from around the globe.",
    image: "/projects/9.png",
    category: "Community",
  },
  {
    id: 10,
    title: "Strategic Global Location",
    description:
      "Dubai’s location offers easy access to Europe, Asia, and Africa, making it a global business hub.",
    image: "/projects/10.png",
    category: "Location",
  },
  {
    id: 11,
    title: "No Currency Restrictions",
    description:
      "Invest freely with no restrictions on currency repatriation or foreign ownership in designated areas.",
    image: "/projects/11.png",
    category: "Currency",
  },
  {
    id: 12,
    title: "Year-Round Sunshine",
    description:
      "Enjoy a warm climate and sunshine throughout the year, perfect for an active and outdoor lifestyle.",
    image: "/projects/12.png",
    category: "Lifestyle",
  },
];

const ParallaxColumn: React.FC<{
  list: ProjectItem[];
  speed: "fast" | "slow";
  columnIndex: number;
}> = ({ list, speed, columnIndex }) => {
  const colRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: colRef,
    offset: ["start end", "end start"],
  });

  const yFast = useTransform(scrollYProgress, [0, 1], ["0vh", "80vh"]);
  const ySlow = useTransform(scrollYProgress, [0, 1], ["0vh", "60vh"]);
  const y = speed === "fast" ? yFast : ySlow;

  return (
    <motion.div ref={colRef} style={{ y }} className="flex flex-col gap-6">
      {list.map((item) => (
        <div
          key={`${columnIndex}-${item.id}`}
          className="relative group overflow-hidden rounded-lg cursor-pointer
          shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="aspect-[4/3] h-[50vh] relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      ))}
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const { isMobile } = useScreen();

  return (
    <section
      className="relative w-full h-fit sm:min-h-screen bg-white  pt-et"
      id="projects"
    >
      <div className="mx-auto container-et overflow-hidden ">
        <div className="text-center ">
          <h2 className="container-heading font-krona py-et">
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
        {isMobile ? (
          <ScrollVelocity items={items} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-[85vh]">
            {[0, 1, 2, 3].map((col) => (
              <ParallaxColumn
                key={col}
                columnIndex={col}
                list={items.filter((_, idx) => idx % 3 === col)}
                speed={col % 2 === 0 ? "fast" : "slow"}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
