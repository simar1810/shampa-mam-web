import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";
import BookConsultationButton from "./BookConsultationButton";

export function ContactCTA() {
  return (
    <section id="contact" className="py-12 md:py-20 bg-white scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Having a hard time?
        </h2>
        <p className="text-xl md:text-2xl font-semibold text-gray-700 mb-8">
          Get in touch! With Best Nutritionist in Mumbai
        </p>
        <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          +91-9152016080
        </p>
        <div className="flex flex-col items-center justify-center gap-5">
          <Link
          href="mailto:officialnutristudio@gmail.com"
          variant="outline"
          className="text-lg font-semibold flex justify-center rounded-md border-gray-400 text-gray-800 hover:bg-gray-50 items-center gap-2 bg-transparent"
          >
          <Mail className="h-6 w-6" />
          Get In Touch
          </Link>
          <BookConsultationButton buttonText="Book Your Consultation" className="px-4 py-6 text-base shimmer-box bg-orange-400 text-white hover:bg-orange-500"/>
        </div>

      </div>
    </section>
  );
}
