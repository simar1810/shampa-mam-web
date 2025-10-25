"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function BookConsultationButton({
  buttonText = "Book Your Consultation",
  className = "",
  
}) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

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
            amount: 199,
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
        amount: 199,
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


  return (
    <>
      <Button
        onClick={() => setShowForm(true)}
        className={`font-bold rounded-md shadow-lg transition ${className}`}
      >
         {buttonText}
      </Button>

      {showForm && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl shadow-2xl px-10 py-10 flex flex-col items-center w-full max-w-md border border-orange-200">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-orange-400"
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>
            <h2 className="text-3xl font-extrabold text-orange-500 mb-6 text-center">
              Book Your Consultation
            </h2>
            <div className="flex flex-col gap-4 w-full">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="p-3 rounded-lg border text-gray-700 border-gray-300 focus:border-orange-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="p-3 rounded-lg border text-gray-700 border-gray-300 focus:border-orange-400"
              />
              <input
                type="tel"
                placeholder="Your Phone (10 digits)"
                maxLength={10}
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="p-3 rounded-lg border text-gray-700 border-gray-300 focus:border-orange-400"
              />
            </div>
            <Button
              onClick={openRazorpay}
              disabled={isLoading}
              className="bg-orange-400 shimmer-box text-white hover:bg-orange-500 px-8 py-4 text-lg font-bold rounded-lg shadow-lg mt-8 w-full"
            >
              {isLoading ? "Processing..." : "Pay ₹199 & Book"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
