import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-white py-12 md:py-16 border-t">
      <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-6">
        <div className="flex flex-col items-start gap-4">
          <Link href="#" className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="Dietitian xyz Logo"
              width={180}
              height={50}
              className="object-contain"
            />
            <span className="sr-only">Dietitian xyz</span>
          </Link>
          <div className="flex gap-4 mt-4">
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 border border-gray-300 rounded-full p-2"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 border border-gray-300 rounded-full p-2"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="h-4 w-4" />
            <span>+91-9868443323</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="h-4 w-4" />
            <span>+91-9654431979</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="h-4 w-4" />
            <span>d@gmail.com</span>
          </div>
          <div className="flex items-start gap-2 text-gray-600">
            <MapPin className="h-4 w-4 mt-1" />
            <span>A-13, Prashant vihar, opp. Lancer convent school new</span>
          </div>
        </div>
        <div className="grid gap-2 col-span-full md:col-span-1">
          <h3 className="text-lg font-semibold mb-2">Disclaimer:</h3>
          <p className="text-sm text-gray-600">
            Results vary based on multiple factors such as gender, age,
            genetics, activity factor & compliance on Diet & other instructions.
          </p>
        </div>
      
      </div>
    </footer>
  );
}
