import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";

export function ContactCTA() {
  return (
    <section id="contact" className="py-12 md:py-20 bg-white scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Having a hard time?
        </h2>
        <p className="text-xl md:text-2xl font-semibold text-gray-700 mb-8">
          Get in touch! With Best Dietitian and Nutritionist in Mumbai
        </p>
        <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          +91-9152016080
        </p>
        <Link
          href="mailto:officialnutristudio@gmail.com"
          variant="outline"
          className="px-8 py-6 text-lg font-semibold flex justify-center w-[15%] rounded-md border-gray-400 text-gray-800 hover:bg-gray-50 flex items-center gap-2 mx-auto bg-transparent"
        >
          <Mail className="h-6 w-6" />
          Get In Touch
        </Link>
      </div>
    </section>
  );
}
