"use client";
import { useEffect, useRef, useState } from "react";

export function TestimonialsIntro() {
  const achievementImages = [
    "/award.jpg",
    "/gal3.jpg",
    "/gal4.jpg",
    "/diet.jpg",
    "/bg1.jpg",
    "/bg2.png",
    "/bg3.jpeg",
  ];

  // Auto-scroll logic for horizontal carousel
  const scrollRef = useRef(null);
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    const scrollStep = 2; // px per interval
    const interval = setInterval(() => {
      if (scrollContainer) {
        scrollAmount += scrollStep;
        if (
          scrollAmount >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollAmount = 0;
        }
        scrollContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
      }
    }, 30); // smooth scroll every 30ms
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="achievements"
      className="py-12 md:py-20 bg-custom-peach-light relative scroll-mt-24"
    >
      <div className="container mx-auto px-4 md:px-6 text-center">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
          ACHIEVEMENTS & RECOGNITION
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Our Journey of Excellence
        </h2>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-8 py-4 px-2"
          style={{
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {achievementImages.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt={`Achievement ${idx + 1}`}
              className="rounded-lg shadow-lg w-64 h-64 object-cover border-4 border-white flex-shrink-0"
              style={{ display: "block" }}
            />
          ))}
        </div>
        <style>{`
          #achievements .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}
