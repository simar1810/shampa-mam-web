"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AssessmentForm } from "@/components/assessment-form";

export default function ThankYou() {
  const params = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState("loading");
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(3);
  const [showAssessmentForm, setShowAssessmentForm] = useState(true); // Show form first
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  // Function to load Calendly script
  const loadCalendlyScript = () => {
    if (calendlyLoaded) return; // Don't load if already loaded

    console.log("Loading Calendly script...");

    // Check if Calendly is already loaded
    if (window.Calendly) {
      console.log("Calendly already loaded");
      setCalendlyLoaded(true);
      return;
    }

    // Load CSS
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      console.log("Calendly script loaded successfully");
      setCalendlyLoaded(true);
    };
    script.onerror = () => {
      console.error("Failed to load Calendly script");
    };
    document.body.appendChild(script);
  };

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
        console.log("Token verification response:", data);
        const valid = data.valid || (data.data && data.data.valid);
        if (valid) {
          setStatus("valid");

          // Store user data if available in the response
          if (data.data && data.data.userDetails) {
            console.log("User data found in response:", data.data.userDetails);
            setUserData(data.data.userDetails);
          } else {
            console.log("No user data found in token verification response");
            // Try to get user data from other possible locations in the response
            if (
              data.data &&
              (data.data.name || data.data.email || data.data.phoneNumber)
            ) {
              console.log("Found user data in data object:", {
                name: data.data.name,
                email: data.data.email,
                phoneNumber: data.data.phoneNumber,
              });
              setUserData({
                name: data.data.name,
                email: data.data.email,
                phoneNumber: data.data.phoneNumber,
              });
            }
          }

          // Load Calendly script immediately when token is valid
          loadCalendlyScript();
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

  // Initialize Calendly widget when script is loaded and assessment is completed
  useEffect(() => {
    if (calendlyLoaded && assessmentCompleted && !showAssessmentForm) {
      console.log("Initializing Calendly widget...");
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        if (window.Calendly) {
          window.Calendly.initInlineWidget({
            url: "https://calendly.com/officialnutristudio",
            parentElement: document.getElementById("calendly-widget"),
          });
        }
      }, 100);
    }
  }, [calendlyLoaded, assessmentCompleted, showAssessmentForm]);

  // Calendly event listener for showing final confirmation after booking
  useEffect(() => {
    if (status === "valid" && assessmentCompleted) {
      const handler = (e) => {
        if (e.data.event === "calendly.event_scheduled") {
          setShowModal(true);
          setTimer(3);
        }
      };
      window.addEventListener("message", handler);
      return () => window.removeEventListener("message", handler);
    }
  }, [status, assessmentCompleted]);

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

  // Handle assessment form completion
  const handleAssessmentComplete = (assessmentData, apiResponse) => {
    console.log("Assessment completed:", assessmentData);
    console.log("API Response:", apiResponse);
    setAssessmentCompleted(true);
    setShowAssessmentForm(false);
    // Don't show modal yet - wait for Calendly booking
  };

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
      {showAssessmentForm ? (
        <>
          <h1 className="text-4xl font-extrabold mb-4 text-orange-600 animate-slideDown">
            Payment Successful 🎉
          </h1>
          <p className="mb-8 text-lg text-gray-700 text-center max-w-lg animate-fadeInSlow">
            Thank you for your payment! Please complete this assessment form
            first, then we'll help you book your consultation.
          </p>

          {/* Assessment Form */}
          <AssessmentForm
            onComplete={handleAssessmentComplete}
            userData={userData}
          />
        </>
      ) : (
        <>
          <h1 className="text-4xl font-extrabold mb-4 text-orange-600 animate-slideDown">
            Assessment Complete! 📋
          </h1>
          <p className="mb-8 text-lg text-gray-700 text-center max-w-lg animate-fadeInSlow">
            Great! Now please book your consultation below to confirm your slot.
          </p>

          {/* Calendly Inline Embed with redirect after booking */}
          {calendlyLoaded ? (
            <div
              className="calendly-inline-widget w-full shadow-xl rounded-xl border border-gray-200 overflow-hidden animate-scaleUp"
              data-url="https://calendly.com/officialnutristudio"
              style={{ minWidth: "320px", height: "700px" }}
              id="calendly-widget"
            ></div>
          ) : (
            <div
              className="w-full shadow-xl rounded-xl border border-gray-200 overflow-hidden animate-scaleUp flex items-center justify-center"
              style={{ minWidth: "320px", height: "700px" }}
            >
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading booking calendar...</p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Thank You Modal with timer */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl px-10 py-8 flex flex-col items-center text-center animate-scaleUp">
            <h2 className="text-3xl font-bold text-orange-600 mb-3">
              All Set! 🎉
            </h2>
            <p className="text-lg text-gray-700 mb-2">
              {assessmentCompleted
                ? "Your consultation is booked and assessment is complete. We have all the information we need to provide you with the best consultation experience!"
                : "Your meeting is booked. We look forward to speaking with you! An email confirmation has been sent."}
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
