"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const slides = [
    {
      image: "/diet.jpg",
      heading: "Sustainable Nutrition Plans",
      subheading:
        "Personalized diet plans for thyroid, PCOS, diabetes, weight loss, heart health, sports nutrition, skin and hair care—built around your lifestyle.",
    },
    {
      image: "/bg2.png",
      heading: "Clients of Every Stage",
      subheading:
        "Corporate professionals, women in their 40s, college students, fitness enthusiasts, and men seeking midlife metabolism reset—there's a plan for you.",
    },
    {
      image: "/bg3.jpg",
      heading: "Evidence-Based & Enjoyable",
      subheading:
        "Research-backed nutrition, sustainable habits, and your favorite foods included. Achieve your goals with support and flexibility.",
    },
    {
      image: "/bg4.jpeg",
      heading: "Achieve Your Goals With Confidence",
      subheading:
        "Evidence-based guidance and practical solutions for every stage of life. Book your consultation today!",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Razorpay script loader
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      alert("Failed to load payment gateway. Please refresh and try again.");
    };
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  // Form validation
  const validateForm = () => {
    if (!formData.name.trim()) {
      alert("Please enter your name");
      return false;
    }
    if (!formData.email && !formData.phoneNumber) {
      alert("Please provide either email or phone number");
      return false;
    }
    if (formData.phoneNumber && formData.phoneNumber.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      return false;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Please enter a valid email address");
      return false;
    }
    return true;
  };

  // Create Razorpay order
  const createOrder = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/razorpay/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: 499, // ₹499 in rupees
            note: { client: "Nutri_Studio" },
            type: "Nutri_Studio",
          }),
        }
      );
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to create order: ${res.status} - ${errorText}`);
      }
      const orderData = await res.json();
      const order = orderData.data || orderData;
      return order;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  // Verify payment
  const verifyPayment = async (paymentData) => {
    try {
      if (!paymentData.razorpay_payment_id) {
        throw new Error("Missing payment ID");
      }
      const hasAllParams =
        paymentData.razorpay_order_id &&
        paymentData.razorpay_payment_id &&
        paymentData.razorpay_signature;
      if (!hasAllParams) {
        alert(
          "Payment received! Your payment ID is: " +
            paymentData.razorpay_payment_id +
            "\n\nPlease contact support with this payment ID for manual verification."
        );
        setFormData({ name: "", email: "", phoneNumber: "" });
        return;
      }
      const verificationPayload = {
        name: formData.name,
        email: formData.email || null,
        phoneNumber: formData.phoneNumber || null,
        clientId: "Nutri_Studio",
        frontEndClient: "Nutri_Studio",
        razorpay_order_id: paymentData.razorpay_order_id,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_signature: paymentData.razorpay_signature,
        amount: 499,
      };
      const verifyRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/razorpay/verify-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(verificationPayload),
        }
      );
      if (!verifyRes.ok) {
        const errorText = await verifyRes.text();
        throw new Error(
          `Verification failed: ${verifyRes.status} - ${errorText}`
        );
      }
      const data = await verifyRes.json();
      console.log("Payment verification response:", data);
      if (data.success && data.data.token) {
        setFormData({ name: "", email: "", phoneNumber: "" });
        window.location.href = `/thank-you?token=${data.data.token}`;
      } else if (data.success) {
        console.log(data);
        alert(
          "🎉 Payment Successful! But no token received. Please contact support."
        );
        setFormData({ name: "", email: "", phoneNumber: "" });
      } else {
        alert(
          `❌ Payment verification failed: ${data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      alert("❌ Payment verification failed. Please contact support.");
    }
  };

  // Open Razorpay checkout
  const openRazorpay = async () => {
    if (!scriptLoaded) {
      alert(
        "Payment gateway is still loading. Please wait a moment and try again."
      );
      return;
    }
    if (!validateForm()) {
      return;
    }
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
      alert("Payment configuration error. Please contact support.");
      return;
    }
    setIsLoading(true);
    try {
      const order = await createOrder();
      if (!order.id || !order.amount) {
        throw new Error("Failed to create valid order");
      }
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Nutri Studio",
        description: "Consultation Booking",
        image: "/logo.png",
        order_id: order.id,
        handler: async function (response) {
          if (!response.razorpay_payment_id) {
            alert(
              "Payment verification failed: No payment ID received. Please try again."
            );
            setIsLoading(false);
            return;
          }
          const paymentData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id || order?.id,
            razorpay_signature: response.razorpay_signature || null,
          };
          try {
            await verifyPayment(paymentData);
          } catch (error) {
            alert(
              "Payment verification failed. Please contact support with payment ID: " +
                response.razorpay_payment_id
            );
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phoneNumber,
        },
        notes: {
          membership_type: "Nutri_Studio",
          validity: "single consultation",
        },
        theme: {
          color: "#fb923c",
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };
      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert(
          `Payment failed: ${response.error.description || "Unknown error"}`
        );
        setIsLoading(false);
      });
      rzp.open();
    } catch (error) {
      alert("Failed to initiate payment. Please try again.");
      setIsLoading(false);
    }
  };

  const { image, heading, subheading } = slides[currentSlide];

  // ...existing code...

  return (
    <section
      id="home"
      className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden scroll-mt-24"
    >
      <Image
        key={image}
        src={image}
        alt="Hero Slide"
        className="object-cover z-0 transition-opacity duration-700 ease-in-out"
        priority
        fill
        quality={100}
        style={{ transition: "opacity 0.7s" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />

      <div className="relative z-20 flex flex-col items-start justify-center h-full px-6 md:px-10 lg:px-16 text-white max-w-3xl mx-auto text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
          {heading}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-xl leading-relaxed text-orange-400">
          {subheading}
        </p>

        {/* Book Consultation Button opens popup */}
        <Button
          onClick={() => setShowForm(true)}
          className="bg-orange-400 shimmer-box text-white hover:bg-orange-500 px-10 py-9 text-2xl font-bold rounded-md shadow-lg transition duration-300"
        >
          Book Your Consultation
        </Button>
        {/* Payment Form Popup Modal */}
        {showForm && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative bg-white rounded-3xl shadow-2xl px-10 py-10 flex flex-col items-center w-full max-w-md border border-orange-200 animate-fadeIn">
              <button
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-orange-400 transition-colors"
                onClick={() => setShowForm(false)}
                aria-label="Close popup"
              >
                &times;
              </button>
              <h2 className="text-3xl font-extrabold text-orange-500 mb-6 tracking-tight text-center">
                Book Your Consultation
              </h2>
              <div className="flex flex-col gap-4 w-full">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="p-3 rounded-lg text-black border border-gray-300 focus:border-orange-400 focus:outline-none transition"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="p-3 rounded-lg text-black border border-gray-300 focus:border-orange-400 focus:outline-none transition"
                />
                <input
                  type="tel"
                  placeholder="Your Phone (10 digits)"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="p-3 rounded-lg text-black border border-gray-300 focus:border-orange-400 focus:outline-none transition"
                  maxLength={10}
                />
              </div>
              <Button
                onClick={async () => {
                  await openRazorpay();
                  setShowForm(false);
                }}
                disabled={isLoading}
                className="bg-orange-400 shimmer-box text-white hover:bg-orange-500 px-8 py-4 text-lg font-bold rounded-lg shadow-lg transition duration-300 mt-8 w-full"
              >
                {isLoading ? "Processing..." : "Pay & Book"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full inline-block ${
              idx === currentSlide ? "bg-orange-400" : "bg-white/40"
            } transition`}
          />
        ))}
      </div>
    </section>
  );
}
