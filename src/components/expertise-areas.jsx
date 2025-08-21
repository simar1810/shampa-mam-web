"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export function ExpertiseAreas() {
  const [loaded, setLoaded] = useState(false);

  // Calendly integration
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleCalendlyClick = (e) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/officialnutristudio",
      });
    }
  };
  const [selectedItem, setSelectedItem] = useState(null);
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);

  const expertiseItems = [
    {
      image: "/section/diet.jpg",
      title: "Diet Plans for Health Conditions",
      description:
        "Personalized diet plans for thyroid, PCOS, diabetes, weight loss, heart health, blood pressure management, sports nutrition, skin and hair care.",
      bgColor: "bg-gradient-to-br from-rose-50 to-pink-100",
      iconColor: "text-rose-600",
      category: "Medical Nutrition",
    },
    {
      image: "/section/reserch.jpg",
      title: "Evidence & Research-Based Nutrition",
      description:
        "All recommendations are backed by the latest scientific research and nutritional evidence from peer-reviewed studies.",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-100",
      iconColor: "text-emerald-600",
      category: "Scientific Approach",
    },
    {
      image: "/section/2.avif",
      title: "Sustainable Diets Around Your Habits",
      description:
        "Diet plans are designed to fit your existing eating habits and lifestyle for long-term success and maintainable results.",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-100",
      iconColor: "text-purple-600",
      category: "Lifestyle Integration",
    },
    {
      image: "/section/social.jpeg",
      title: "Social Life & Nutrition",
      description:
        "Enjoy your favorite foods and manage nutrition even with a busy social life, dining out, and special occasions.",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-100",
      iconColor: "text-amber-600",
      category: "Social Wellness",
    },
    {
      image: "/section/1.webp",
      title: "Corporate Professionals",
      description:
        "Easy, carry-along meal plans for busy corporate clients who can't make separate meals but need optimal nutrition.",
      bgColor: "bg-gradient-to-br from-blue-50 to-sky-100",
      iconColor: "text-blue-600",
      category: "Professional Life",
    },
    {
      image: "/section/women.jpg",
      title: "Women in Their 40s",
      description:
        "Comprehensive support for peri and post-menopause, hormone balance, bone health, and overall wellness optimization.",
      bgColor: "bg-gradient-to-br from-lime-50 to-green-100",
      iconColor: "text-lime-600",
      category: "Women's Health",
    },
    {
      image: "/gal2.jpg",
      title: "College Students",
      description:
        "Fun and interesting meal and snack ideas for students on the go, budget-friendly options, and dorm-friendly recipes.",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-100",
      iconColor: "text-orange-600",
      category: "Student Life",
    },
    {
      image: "/bg2.png",
      title: "Fitness Enthusiasts",
      description:
        "Nutrition plans to fuel your body, build stamina, support muscle growth, and optimize performance and recovery.",
      bgColor: "bg-gradient-to-br from-indigo-50 to-purple-100",
      iconColor: "text-indigo-600",
      category: "Sports Nutrition",
    },
    {
      image: "/bg3.jpeg",
      title: "Midlife Metabolism Reset for Men",
      description:
        "Specialized plans to help men in midlife reset metabolism, improve vitality, and address age-related health concerns.",
      bgColor: "bg-gradient-to-br from-teal-50 to-cyan-100",
      iconColor: "text-teal-600",
      category: "Men's Health",
    },
  ];

  const topRowItems = expertiseItems.slice(
    0,
    Math.ceil(expertiseItems.length / 2)
  );
  const bottomRowItems = expertiseItems.slice(
    Math.ceil(expertiseItems.length / 2)
  );

  useEffect(() => {
    const animateRow = (element, direction) => {
      if (!element) return;

      const scrollWidth = element.scrollWidth;
      const clientWidth = element.clientWidth;
      const maxScroll = scrollWidth - clientWidth;

      let currentPosition = direction === "left" ? 0 : maxScroll;

      const animate = () => {
        if (direction === "left") {
          currentPosition += 0.5;
          if (currentPosition >= maxScroll) {
            currentPosition = 0;
          }
        } else {
          currentPosition -= 0.5;
          if (currentPosition <= 0) {
            currentPosition = maxScroll;
          }
        }

        element.scrollLeft = currentPosition;
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    };

    if (topRowRef.current) animateRow(topRowRef.current, "left");
    if (bottomRowRef.current) animateRow(bottomRowRef.current, "right");
  }, []);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  const MasonryRow = ({ items, direction }) => (
    <div
      className="flex space-x-6 overflow-x-hidden"
      style={{
        width: "max-content",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {[...items, ...items].map((item, index) => (
        <div
          key={`${direction}-${index}`}
          className={`flex-shrink-0 w-80 transform transition-all duration-700 ease-out hover:scale-105`}
          style={{
            animationDelay: `${(index % items.length) * 200}ms`,
            animation: "slideInUp 0.8s ease-out forwards",
          }}
        >
          <Card
            className={`group border-none shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden ${item.bgColor} transition-all duration-500 hover:-translate-y-2 cursor-pointer h-[500px]`}
            onClick={() => handleCardClick(item)}
          >
            <CardContent className="p-0 h-full flex flex-col">
              {/* Category Badge */}
              <div className="p-6 pb-0">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${item.iconColor} bg-white/80 backdrop-blur-sm`}
                >
                  {item.category}
                </span>
              </div>

              {/* Image Container */}
              <div className="relative w-[85%] h-full mx-6 mt-4 mb-4 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="px-6 pb-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-gray-700 transition-colors duration-300 leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <section
        id="expertise"
        className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white scroll-mt-24"
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              ✨ Comprehensive Nutrition Services
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Expertise & Services
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We offer evidence-based, sustainable nutrition plans tailored to
              your lifestyle and health needs. Our services cover a wide range
              of conditions and client types, ensuring practical solutions for
              every stage of life.
            </p>
          </div>

          <div className="space-y-8">
            {/* Top Row - Moving Left */}
            <div className="overflow-hidden">
              <div
                ref={topRowRef}
                className="overflow-x-hidden"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <MasonryRow items={topRowItems} direction="left" />
              </div>
            </div>

            {/* Bottom Row - Moving Right */}
            <div className="overflow-hidden">
              <div
                ref={bottomRowRef}
                className="overflow-x-hidden"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <MasonryRow items={bottomRowItems} direction="right" />
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2 text-gray-600">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
              <span className="text-sm font-medium">
                Ready to start your journey?
              </span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden animate-fadeIn">
            <div className="flex flex-col md:flex-row h-full">
              {/* Left Image Section */}
              
              <div className="relative w-full md:w-1/2 h-60 md:h-auto">
                <Image
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                />
                <button
                onClick={handleClosePopup}
                className="absolute top-4 right-4 md:right-[-430px] z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              
              {/* Right Content Section */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  {/* Category */}
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${selectedItem.iconColor} bg-gray-100 mb-3`}
                  >
                    {selectedItem.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">
                    {selectedItem.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 text-base leading-relaxed mb-4">
                    {selectedItem.description}
                  </p>

                  {/* What's Included */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      What's Included:
                    </h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• Personalized consultation and assessment</li>
                      <li>• Customized meal plans and recipes</li>
                      <li>• Ongoing support and monitoring</li>
                      <li>• Evidence-based recommendations</li>
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleCalendlyClick}
                  className="mt-4 bg-orange-400 shimmer-box text-white hover:bg-orange-500 px-6 py-3 text-base font-bold rounded-md shadow-lg transition duration-300 w-full"
                >
                  Book Your Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* Hide scrollbars for smooth appearance */
        div::-webkit-scrollbar {
          display: none;
        }
        .overflow-x-hidden {
          overflow-x: hidden !important;
        }
        .overflow-hidden {
          overflow: hidden !important;
        }
      `}</style>
    </>
  );
}
