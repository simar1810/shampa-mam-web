import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function ExpertiseAreas() {
  const expertiseItems = [
    {
      image: "/section/diet.jpg",
      title: "Diet Plans for Health Conditions",
      description:
        "Personalized diet plans for thyroid, PCOS, diabetes, weight loss, heart health, blood pressure management, sports nutrition, skin and hair care.",
      bgColor: "bg-[#f8f0f4]",
    },
    {
      image: "/section/reserch.jpg",
      title: "Evidence & Research-Based Nutrition",
      description:
        "All recommendations are backed by the latest scientific research and nutritional evidence.",
      bgColor: "bg-[#e6f4ea]",
    },
    {
      image: "/section/2.avif",
      title: "Sustainable Diets Around Your Habits",
      description:
        "Diet plans are designed to fit your existing eating habits and lifestyle for long-term success.",
      bgColor: "bg-[#fce4ec]",
    },
    {
      image: "/section/social.jpeg",
      title: "Social Life & Nutrition",
      description:
        "Enjoy your favorite foods and manage nutrition even with a busy social life.",
      bgColor: "bg-[#ffe0b2]",
    },
    {
      image: "/section/1.webp",
      title: "Corporate Professionals",
      description:
        "Easy, carry-along meal plans for busy corporate clients who can't make separate meals.",
      bgColor: "bg-[#e3f2fd]",
    },
    {
      image: "/section/women.jpg",
      title: "Women in Their 40s",
      description:
        "Support for peri and post-menopause, hormone balance, and overall wellness.",
      bgColor: "bg-[#f9fbe7]",
    },
    {
      image: "/gal2.jpg",
      title: "College Students",
      description:
        "Fun and interesting meal and snack ideas for students on the go.",
      bgColor: "bg-[#fff3e0]",
    },
    {
      image: "/bg2.png",
      title: "Fitness Enthusiasts",
      description:
        "Nutrition plans to fuel your body, build stamina, and support muscle growth.",
      bgColor: "bg-[#ede7f6]",
    },
    {
      image: "/bg3.jpeg",
      title: "Midlife Metabolism Reset for Men",
      description:
        "Specialized plans to help men in midlife reset metabolism and improve vitality.",
      bgColor: "bg-[#e0f7fa]",
    },
  ];
  return (
    <section id="expertise" className="py-12 md:py-20 bg-white scroll-mt-24">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Expertise & Services
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          We offer evidence-based, sustainable nutrition plans tailored to your
          lifestyle and health needs. Our services cover a wide range of
          conditions and client types, ensuring practical solutions for every
          stage of life.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertiseItems.map((item, index) => (
            <Card
              key={index}
              className={`border-none shadow-md rounded-lg p-4 ${item.bgColor}`}
            >
              <CardContent className="p-0">
                <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm text-left">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
