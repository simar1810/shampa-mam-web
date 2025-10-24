"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function ExpertiseAreas() {
  // Payment loading state
  const [isLoading, setIsLoading] = useState(false);
  // Razorpay script loaded state
  const [scriptLoaded, setScriptLoaded] = useState(false);
  // Form state for payment popup
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  // Popup state for expertise item details
  const [selectedItem, setSelectedItem] = useState(null);
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

  const handleCalendlyClick = (e) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/officialnutristudio",
      });
    }
  };

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
            amount: 499,
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
      if (data.success && data.data.token) {
        setFormData({ name: "", email: "", phoneNumber: "" });
        window.location.href = `/thank-you?token=${data.data.token}`;
      } else if (data.success) {
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

  const topRowItems = expertiseItems.slice(0, 5);
  const bottomRowItems = expertiseItems.slice(5, 9);

  const handleCardClick = (item) => setSelectedItem(item);
  const handleClosePopup = () => setSelectedItem(null);

  const CardGrid = ({ items, cols }) => (
    <div
      className={`grid grid-cols-1 sm:grid-cols-5 md:grid-cols-${cols} gap-6`}
    >
      {items.map((item, index) => (
        <Card
          key={index}
          className={`border-none shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden ${item.bgColor} transition-all duration-500 hover:-translate-y-2 cursor-pointer`}
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

            {/* Image */}
            <div className="relative w-[85%] h-40 mx-6 mt-4 mb-4 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="px-6 pb-6 flex-1 flex flex-col">
              <h3 className="text-lg font-bold mb-3 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed flex-1">
                {item.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <section
      id="expertise"
      className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white scroll-mt-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            ✨ Comprehensive Nutrition Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Expertise & Services
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We offer evidence-based, sustainable nutrition plans tailored to
            your lifestyle and health needs. Our services cover a wide range of
            conditions and client types, ensuring practical solutions for every
            stage of life.
          </p>
        </div>

        {/* Two Static Rows */}
        <div className="space-y-10">
          {/* Row 1: 5 cards */}
          <CardGrid items={topRowItems} cols={5} />

          {/* Row 2: 4 cards (stretch full width) */}
          <CardGrid items={bottomRowItems} cols={4} />
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

      {/* Popup Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4">
         <div
           className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden animate-fadeIn border border-orange-200 relative h-[95vh] sm:h-auto sm:max-h-[95vh] flex flex-col"
         >
           <div className="flex flex-col md:flex-row h-full overflow-hidden">
             <div className="relative w-full md:w-1/2 h-64 sm:h-72 md:h-auto">
               <Image
                 src={selectedItem.image || '/placeholder.svg'}
                 alt={selectedItem.title}
                 fill
                 className="object-cover"
               />
               <button
                 onClick={handleClosePopup}
                 className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
               >
                 <X className="w-5 h-5 text-gray-600" />
               </button>
               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
             </div>
                   <div className="w-full md:w-1/2 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto">
               <div>
                 <span
                   className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${selectedItem.iconColor} bg-gray-100 mb-2 sm:mb-3`}
                 >
                   {selectedItem.category}
                 </span>
                 <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">
                   {selectedItem.title}
                 </h3>
                 <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3 xl:mb-2 sm:mb-4">
                   {selectedItem.description}
                 </p>
      
                 <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-4 xl:mb-2">
                   <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                     What's Included:
                   </h4>
                   <ul className="text-gray-700 space-y-1 text-xs sm:text-sm">
                     <li>• Personalized consultation and assessment</li>
                     <li>• Customized meal plans and recipes</li>
                     <li>• Ongoing support and monitoring</li>
                <li>• Evidence-based recommendations</li>
                   </ul>
                 </div>
          </div>
      
                 <div className="mt-3 sm:mt-4 md:mt-2 w-full flex flex-col gap-3 sm:gap-4 pb-3 lg:pb-1">
            <input
                   type="text"
                   placeholder="Your Name"
              value={formData.name}
                   onChange={(e) =>
                     setFormData({ ...formData, name: e.target.value })
                   }
                   className="p-3 rounded-lg text-black border border-gray-300 focus:border-orange-400 focus:outline-none transition text-sm sm:text-base"
                 />
                 <input
              type="email"
                   placeholder="Your Email"
              value={formData.email}
                   onChange={(e) =>
                     setFormData({ ...formData, email: e.target.value })
              }
                   className="p-3 rounded-lg text-black border border-gray-300 focus:border-orange-400 focus:outline-none transition text-sm sm:text-base"
                 />
                 <input
              type="tel"
                    placeholder="Your Phone (10 digits)"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                     setFormData({ ...formData, phoneNumber: e.target.value })
                   }
                   className="p-3 rounded-lg text-black border border-gray-300 focus:border-orange-400 focus:outline-none transition text-sm sm:text-base"
              maxLength={10}
                 />
                 <button
                         onClick={async () => {
                     await openRazorpay();
                     handleClosePopup();
                   }}
                   disabled={isLoading}
                   className="bg-orange-400 shimmer-box text-white hover:bg-orange-500 px-6 py-3 sm:py-4 text-sm sm:text-lg font-bold rounded-lg shadow-lg transition duration-300 mt-2 w-full"
                  >
                    {isLoading ? 'Processing...' : 'Pay & Book'}
                  </button>
                </div>
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
    </section>
  );
}
