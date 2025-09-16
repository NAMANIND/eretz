"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GSAPTextReveal } from "@/components/ui/GSAPTextReveal";

const Projects: React.FC = () => {
  type ProjectItem = {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
  };
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
    {
      id: 9,
      title: "Global Tourism Hotspot",
      description:
        "With iconic architecture, five-star resorts, and diverse experiences, Dubai continues to attract millions of international visitors every year.",
      image: "/placeholder-2.jpg",
      category: "Tourism",
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

    const yFast = useTransform(scrollYProgress, [0, 1], ["0vh", "40vh"]);
    const ySlow = useTransform(scrollYProgress, [0, 1], ["0vh", "2vh"]);
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
              <h1 className="absolute bottom-4 left-4 text-white text-xl font-semibold z-10">
                {item.title}
              </h1>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <section
      className="relative w-full min-h-screen bg-white px-6"
      id="projects"
    >
      <div className="mx-auto container-f ">
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

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map((col) => (
            <ParallaxColumn
              key={col}
              columnIndex={col}
              list={items}
              speed={col % 2 === 0 ? "fast" : "slow"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
