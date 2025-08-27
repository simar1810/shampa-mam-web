"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ThankYou() {
  const params = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState("loading");
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/razorpay/verify-token?token=${token}`
        );
        const data = await res.json();
        console.log(data);
        const valid = data.valid || (data.data && data.data.valid);
        if (valid) {
          setStatus("valid");

          // Inject Calendly script dynamically
          const link = document.createElement("link");
          link.href = "https://assets.calendly.com/assets/external/widget.css";
          link.rel = "stylesheet";
          document.head.appendChild(link);

          const script = document.createElement("script");
          script.src = "https://assets.calendly.com/assets/external/widget.js";
          script.async = true;
          document.body.appendChild(script);
        } else {
          setStatus("invalid");
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        setStatus("invalid");
      }
    };

    verifyToken();
  }, [token]);

  // Calendly event listener for redirect after booking
  useEffect(() => {
    if (status === "valid") {
      const handler = (e) => {
        if (e.data.event === "calendly.event_scheduled") {
          setShowModal(true);
          setTimer(3);
        }
      };
      window.addEventListener("message", handler);
      return () => window.removeEventListener("message", handler);
    }
  }, [status]);

  // Countdown timer for modal
  useEffect(() => {
    if (showModal && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (showModal && timer === 0) {
      setShowModal(false);
      window.location.href = "/";
    }
  }, [showModal, timer]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-white animate-fadeIn">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-700 font-medium">
            Verifying your payment...
          </p>
        </div>
        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }
        `}</style>
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-white animate-fadeIn">
        <h1 className="text-3xl font-bold text-red-600 mb-4 animate-bounce">
          Invalid Link ❌
        </h1>
        <p className="text-lg text-gray-700">
          This booking link is either invalid or already used.
        </p>
        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // ✅ Valid token
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-50 to-white animate-fadeIn">
      <h1 className="text-4xl font-extrabold mb-4 text-orange-600 animate-slideDown">
        Payment Successful 🎉
      </h1>
      <p className="mb-8 text-lg text-gray-700 text-center max-w-lg animate-fadeInSlow">
        Thank you for your payment. Please book your consultation below to
        confirm your slot.
      </p>

      {/* Calendly Inline Embed with redirect after booking */}
      <div
        className="calendly-inline-widget w-full shadow-xl rounded-xl border border-gray-200 overflow-hidden animate-scaleUp"
        data-url="https://calendly.com/officialnutristudio"
        style={{ minWidth: "320px", height: "700px" }}
        id="calendly-widget"
      ></div>

      {/* Thank You Modal with timer */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl px-10 py-8 flex flex-col items-center text-center animate-scaleUp">
            <h2 className="text-3xl font-bold text-orange-600 mb-3">
              Thank You!
            </h2>
            <p className="text-lg text-gray-700 mb-2">
              Your meeting is booked. We look forward to speaking with you! An email confirmation has been sent.
            </p>
            <p className="text-base text-gray-500">
              Redirecting to home in{" "}
              <span className="font-bold text-orange-600">{timer}</span>{" "}
              seconds...
            </p>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInSlow {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-fadeInSlow {
          animation: fadeInSlow 0.8s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.7s ease-out;
        }
        .animate-scaleUp {
          animation: scaleUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
