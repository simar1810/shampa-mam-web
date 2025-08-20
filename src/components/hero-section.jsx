"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "/bg1.jpg",
    heading: "Sustainable Nutrition Plans",
    subheading:
      "Personalized diet plans for thyroid, PCOS, diabetes, weight loss, heart health, sports nutrition, skin and hair care—built around your lifestyle.",
  },
  {
    image: "/bg2.png",
    heading: "Clients of Every Stage",
    subheading:
      "Corporate professionals, women in their 40s, college students, fitness enthusiasts, and men seeking midlife metabolism reset—there's a plan for you.",
  },
  {
    image: "/bg3.jpeg",
    heading: "Evidence-Based & Enjoyable",
    subheading:
      "Research-backed nutrition, sustainable habits, and your favorite foods included. Achieve your goals with support and flexibility.",
  },
];

export function HeroSection() {
  const slides = [
    {
      image: "/main.png",
      heading: "Sustainable Nutrition Plans",
      subheading:
        "Personalized diet plans for thyroid, PCOS, diabetes, weight loss, heart health, sports nutrition, skin and hair care—built around your lifestyle.",
    },
    {
      image: "/bg2.png",
      heading: "Clients of Every Stage",
      subheading:
        "Corporate professionals, women in their 40s, college students, fitness enthusiasts, and men seeking midlife metabolism reset—there's a plan for you.",
    },
    {
      image: "/bg3.jpeg",
      heading: "Evidence-Based & Enjoyable",
      subheading:
        "Research-backed nutrition, sustainable habits, and your favorite foods included. Achieve your goals with support and flexibility.",
    },
    {
      image: "/gal1.jpg",
      heading: "Achieve Your Goals With Confidence",
      subheading:
        "Evidence-based guidance and practical solutions for every stage of life. Book your consultation today!",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { image, heading, subheading } = slides[currentSlide];

  return (
    <section
      id="home"
      className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden scroll-mt-24"
    >
      <Image
        key={image}
        src={image}
        alt="Hero Slide"
        fill
        className="object-cover z-0 transition-opacity duration-700 ease-in-out"
        quality={100}
        priority
        style={{ transition: "opacity 0.7s" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
      <div className="relative z-20 flex flex-col items-start justify-center h-full px-6 md:px-10 lg:px-16 text-white max-w-3xl mx-auto text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
          {heading}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-xl leading-relaxed text-orange-400">
          {subheading}
        </p>
        <Button className="bg-orange-400 text-white hover:bg-orange-500 px-8 py-4 text-lg font-bold rounded-md shadow-lg transition duration-300">
          Book Your Consultation
        </Button>
      </div>
      {/* Dots navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full inline-block ${
              idx === currentSlide ? "bg-orange-400" : "bg-white/40"
            } transition`}
          />
        ))}
      </div>
    </section>
  );
}
