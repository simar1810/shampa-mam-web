import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function ExpertiseAreas() {
  const expertiseItems = [
    {
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      title: "Inflight Service Training",
      description:
        "Professional training for cabin crew to deliver exceptional inflight service.",
      bgColor: "bg-[#f8f0f4]",
    },
    {
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
      title: "Sales Trainings",
      description:
        "Comprehensive sales skills development for individuals and teams.",
      bgColor: "bg-[#e6f4ea]",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      title: "Inflight Sales Training (Duty Free)",
      description:
        "Specialized training for duty-free sales and product knowledge onboard.",
      bgColor: "bg-[#fce4ec]",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      title: "Corporate Grooming & Image Management",
      description:
        "Enhancing professional appearance and personal branding in corporate settings.",
      bgColor: "bg-[#ffe0b2]",
    },
    {
      image:
        "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80",
      title: "Business & Social Etiquette / Executive Presence",
      description:
        "Mastering etiquette and executive presence for business and social success.",
      bgColor: "bg-[#e3f2fd]",
    },
    {
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      title: "Cross Cultural Sensitivity",
      description:
        "Training to foster understanding and respect for diverse cultures.",
      bgColor: "bg-[#f9fbe7]",
    },
    {
      image:
        "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
      title: "Customer Centricity Training Programs",
      description:
        "Programs focused on building customer-first mindset and service excellence.",
      bgColor: "bg-[#fff3e0]",
    },
    {
      image:
        "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80",
      title: "People Development Programs",
      description:
        "Empowering individuals with skills for personal and professional growth.",
      bgColor: "bg-[#ede7f6]",
    },
  ];
  return (
    <section id="expertise" className="py-12 md:py-20 bg-white scroll-mt-24">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Our Expertise Area
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Our dedicated Services of experienced dietitians is committed to
          helping you achieve your health and wellness goals through
          personalized and evidence-based nutrition guidance.
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
