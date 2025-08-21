import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export function BookAppointmentCTA() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative bg-gray-100 rounded-lg p-8 md:p-12 text-center overflow-hidden shadow-lg">
          <Image
            src="/bg1.jpg"
            alt="Cotton plant background"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-0 opacity-30"
          />
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Book Your Appointment
            </h2>
            <p className="text-4xl md:text-5xl font-bold text-custom-green-dark">
              +91-9152807080
            </p>

            <Link
              href="https://wa.me/9152807080"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-custom-green-dark/90 w-full md:w-[25%] md:h-[15%] text-white px-8 py-6 text-lg font-semibold rounded-full shadow-md flex items-center gap-2 mx-auto"
            >
              <MessageCircle className="h-6 w-6" />
              CHAT ON WHATSAPP!
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
