"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex h-20 w-full items-center justify-between px-4 md:px-8 bg-white border-b shadow-sm">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.jpg"
          alt="Dietitian xyz Logo"
          width={50}
          height={40}
          className="object-contain"
          priority
        />
        <span className="sr-only">Dietitian xyz</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-6 lg:gap-8 text-base font-medium text-gray-700">
        <Link
          href="#home"
          className="hover:text-custom-green-dark transition-colors"
        >
          Home
        </Link>
        <Link
          href="#about"
          className="hover:text-custom-green-dark transition-colors"
        >
          About Me
        </Link>
        <Link
          href="#services"
          className="hover:text-custom-green-dark transition-colors"
        >
          Services
        </Link>
        <Link
          href="#testimonials"
          className="hover:text-custom-green-dark transition-colors"
        >
          Testimonials
        </Link>
        <Link
          href="#contact"
          className="hover:text-custom-green-dark transition-colors"
        >
          Contact Us
        </Link>
      </nav>

      {/* CTA */}
      <Button className="hidden md:inline-flex bg-custom-green-dark hover:bg-custom-green-dark/90 text-white px-6 py-2 text-sm rounded-md transition">
        WhatsApp Consultation
      </Button>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 sm:w-72 px-6 py-6">
          <Link href="#home" className="flex items-center gap-2 mb-8">
            <Image
              src="/logo.jpg"
              alt="Dietitian xyz Logo"
              width={140}
              height={36}
              className="object-contain"
            />
            <span className="sr-only">Dietitian xyz</span>
          </Link>

          <div className="grid gap-5 text-base font-semibold text-gray-800">
            <Link href="#home" className="hover:text-custom-green-dark">
              Home
            </Link>
            <Link href="#about" className="hover:text-custom-green-dark">
              About Me
            </Link>
            <Link href="#services" className="hover:text-custom-green-dark">
              Services
            </Link>
            <Link href="#testimonials" className="hover:text-custom-green-dark">
              Testimonials
            </Link>
            <Link href="#contact" className="hover:text-custom-green-dark">
              Contact Us
            </Link>
          </div>

          <Button className="w-full mt-8 bg-custom-green-dark hover:bg-custom-green-dark/90 text-white rounded-md transition">
            WhatsApp Consultation
          </Button>
        </SheetContent>
      </Sheet>
    </header>
  );
}
