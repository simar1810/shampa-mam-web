"use client";
import { useEffect, useRef } from "react";

export function TestimonialsIntro() {
  const achievementImages = ["/pa1.jpg", "/pa2.jpg", "/pa3.jpg"];

  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    const scrollStep = 1.5; // px per interval (adjust for speed)

    const interval = setInterval(() => {
      if (scrollContainer) {
        scrollAmount += scrollStep;

        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          // reset seamlessly (since we duplicate the images)
          scrollAmount = 0;
        }

        scrollContainer.scrollTo({
          left: scrollAmount,
          behavior: "auto", // no smooth to avoid jitter in loop
        });
      }
    }, 16); // ~60fps

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

        {/* Scrolling container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden space-x-8 py-4 px-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Duplicate images for seamless loop */}
          {[...achievementImages, ...achievementImages].map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Achievement ${idx + 1}`}
              className="rounded-lg shadow-lg w-[500px] h-full object-cover border-4 border-white flex-shrink-0"
            />
          ))}
        </div>

        {/* Hide scrollbar */}
        <style>{`
          #achievements .overflow-x-hidden::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}
