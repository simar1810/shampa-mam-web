"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "/bg1.jpg",
    heading: "Ready to Lose Weight?",
    subheading:
      "Lose weight naturally and sustainably—with real results that last a lifetime.",
  },
  {
    image: "/bg2.png",
    heading: "Transform Your Body",
    subheading:
      "Backed by science, driven by results—see your transformation come to life.",
  },
  {
    image: "/bg3.jpeg",
    heading: "Feel Healthy Again",
    subheading:
      "Our programs are tailored to you—real coaches, real support, real success.",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Optional: auto-rotate every 7s
  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, []);

  const { image, heading, subheading } = slides[currentSlide];

  return (
    <section
      id="home"
      className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden scroll-mt-24"
    >
      {/* Background Image */}
      <Image
        key={image}
        src={image}
        alt="Hero Slide"
        fill
        className="object-cover z-0 transition-opacity duration-700 ease-in-out"
        quality={100}
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-start justify-center h-full px-6 md:px-10 lg:px-16 text-white max-w-4xl mx-auto text-left transition-all duration-700 ease-in-out">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight">
          {heading.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="text-orange-400">
            {heading.split(" ").slice(-1)}
          </span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-xl leading-relaxed text-white/90">
          {subheading}
        </p>
        <Button className="bg-white text-black hover:bg-gray-100 px-6 md:px-8 py-4 text-base md:text-lg font-semibold rounded-md shadow-md transition duration-300">
          Book an Appointment
        </Button>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-md transition"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-md transition"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Button>

      {/* Dot Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white/40"
            } transition`}
          />
        ))}
      </div>
    </section>
  );
}
