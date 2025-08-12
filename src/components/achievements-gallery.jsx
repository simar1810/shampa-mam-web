"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const companies = [
  "/success/1.png",
  "/success/2.png",
  "/success/3.png",
  "/success/4.png",
  "/success/5.png",
];
const education = [
  "/social/1.png",
  "/social/2.png",
  "/social/3.png",
  "/social/4.png",
  "/social/5.png",
];

function AutoCarousel({ items }) {
  const [scrollPos, setScrollPos] = useState(0);
  const scrollRef = useRef(null);
  // Duplicate items for seamless repeat
  const repeatedItems = [...items, ...items];
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPos((prev) => {
        if (scrollRef.current) {
          const singleWidth = 300 * items.length;
          let nextScroll = scrollRef.current.scrollLeft + 300;
          if (nextScroll >= singleWidth) {
            // Reset to start for infinite effect
            scrollRef.current.scrollLeft = 0;
            nextScroll = 0;
          } else {
            scrollRef.current.scrollTo({
              left: nextScroll,
              behavior: "smooth",
            });
          }
        }
        return prev + 1;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [items.length]);
  return (
    <div className="relative w-full h-48 overflow-hidden rounded-lg shadow-md">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div
        ref={scrollRef}
        className="flex w-full h-48 space-x-4 overflow-x-auto hide-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        {repeatedItems.map((src, idx) => (
          <div key={idx} className="min-w-[300px] h-48 relative flex-shrink-0">
            <Image
              src={src || "/placeholder.svg"}
              alt={`Achievement ${idx + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AchievementsGallery() {
  return (
    <section id="achievements" className="py-12 md:py-20 bg-white scroll-mt-24">
      <div className="container px-4 md:px-6 text-center space-y-16">
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            SUCCESS STORIES - COMPANIES
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Grooming sessions including business etiquette and cross cultural
            training for various giant companies and multinationals.
          </h2>
          <p className="mb-6 text-gray-600">
            Conducted successful Business Etiquette & Grooming sessions for the
            Corporate sector
          </p>
          <AutoCarousel items={companies} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            SUCCESS STORIES - EDUCATIONAL INSTITUTIONS
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Social and Communication skills classes conducted for the age group
            of 10 to 16 year
          </h2>
          <AutoCarousel items={education} />
        </div>
      </div>
    </section>
  );
}
