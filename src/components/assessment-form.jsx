"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function AssessmentForm({ onComplete, userData }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Information
    height: "",
    weight: "",
    waistCircumference: "",
    menstrualCycle: "",

    // Consultation Purpose
    consultationPurpose: "",
    medicalHistory: "",

    // Dietary Information
    dietaryPreferences: "",
    foodAllergies: "",
    eatingOutFrequency: "",

    // Lifestyle Information
    physicalActivity: "",
    smoking: "",
    alcohol: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const steps = [
    {
      title: "Basic Health Information",
      fields: [
        {
          name: "height",
          label: "What is your height in cms?",
          type: "number",
          required: true,
          placeholder: "Enter height in cm",
        },
        {
          name: "weight",
          label: "What is your weight in kgs?",
          type: "number",
          required: true,
          placeholder: "Enter weight in kg",
        },
        {
          name: "waistCircumference",
          label: "What is your waist circumference in inches?",
          type: "number",
          required: true,
          placeholder: "Enter waist circumference in inches",
        },
        {
          name: "menstrualCycle",
          label: "How is your menstrual cycle?",
          type: "radio",
          required: true,
          options: ["Regular", "Irregular", "NA"],
        },
      ],
    },
    {
      title: "Consultation & Medical History",
      fields: [
        {
          name: "consultationPurpose",
          label: "What is your purpose of consultation?",
          type: "radio",
          required: true,
          options: ["Weight loss", "Gut health", "General well being", "Other"],
        },
        {
          name: "medicalHistory",
          label: "Do you have any underlying medical history? If yes, specify",
          type: "textarea",
          required: true,
          placeholder:
            "Please specify any medical conditions, medications, or health issues",
        },
      ],
    },
    {
      title: "Dietary Information",
      fields: [
        {
          name: "dietaryPreferences",
          label: "What are your dietary preferences?",
          type: "radio",
          required: true,
          options: ["Veg", "Non veg", "Vegan"],
        },
        {
          name: "foodAllergies",
          label: "Do you have any food allergies? If yes, specify",
          type: "textarea",
          required: true,
          placeholder: "Please list any food allergies or intolerances",
        },
        {
          name: "eatingOutFrequency",
          label: "How often do you eat out?",
          type: "radio",
          required: true,
          options: ["Quite often", "Sometimes", "Rarely"],
        },
      ],
    },
    {
      title: "Lifestyle Information",
      fields: [
        {
          name: "physicalActivity",
          label: "From the scale of 1-10, how active are you physically?",
          type: "number",
          required: true,
          placeholder: "Rate from 1 (not active) to 10 (very active)",
          min: 1,
          max: 10,
        },
        {
          name: "smoking",
          label: "Do you smoke?",
          type: "radio",
          required: true,
          options: ["Yes", "No", "Occasionally"],
        },
        {
          name: "alcohol",
          label: "Do you have alcohol?",
          type: "radio",
          required: true,
          options: ["Yes", "No", "Occasionally"],
        },
      ],
    },
  ];

  const validateStep = (stepIndex) => {
    const step = steps[stepIndex];
    const newErrors = {};

    step.fields.forEach((field) => {
      const value = formData[field.name];

      if (field.required && (!value || value.toString().trim() === "")) {
        newErrors[field.name] = `${field.label} is required`;
      }

      if (field.type === "number" && value) {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
          newErrors[field.name] = "Please enter a valid number";
        } else if (field.min !== undefined && numValue < field.min) {
          newErrors[field.name] = `Value must be at least ${field.min}`;
        } else if (field.max !== undefined && numValue > field.max) {
          newErrors[field.name] = `Value must be at most ${field.max}`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      console.log("Assessment form data:", formData);
      console.log("User data from hero section:", userData);

      // Prepare the payload
      const payload = {
        assessmentData: formData,
        userData: userData || {}, // Include name, email, phone from hero section
        timestamp: new Date().toISOString(),
        frontEndClient: "Nutri_Studio",
      };

      console.log("Sending payload to API:", payload);

      // Send assessment data to the API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to submit assessment: ${response.status} - ${errorText}`
        );
      }

      const result = await response.json();
      console.log("Assessment submitted successfully:", result);

      setSubmitSuccess(true);

      // Call the completion callback with the API response after a brief delay
      setTimeout(() => {
        onComplete(formData, result);
      }, 1500);
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("There was an error submitting your assessment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepData = steps[currentStep];

  // Show success message if form was submitted successfully
  if (submitSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Assessment Submitted Successfully!
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for completing the assessment. We're now preparing your
            consultation booking...
          </p>
          <div className="flex justify-center">
            <div className="w-6 h-6 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-2">
          Client Assessment Form
        </h2>
        <p className="text-gray-600">
          Please complete this assessment to help us provide you with the best
          consultation experience.
        </p>

        {/* Display user information if available */}
        {userData &&
          (userData.name || userData.email || userData.phoneNumber) && (
            <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-800 mb-2">
                Your Information:
              </h3>
              <div className="space-y-1 text-sm text-gray-700">
                {userData.name && (
                  <p>
                    <span className="font-medium">Name:</span> {userData.name}
                  </p>
                )}
                {userData.email && (
                  <p>
                    <span className="font-medium">Email:</span> {userData.email}
                  </p>
                )}
                {userData.phoneNumber && (
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {userData.phoneNumber}
                  </p>
                )}
              </div>
            </div>
          )}

        {/* Show message if user data is not available */}
        {(!userData ||
          (!userData.name && !userData.email && !userData.phoneNumber)) && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Note:
            </h3>
            <p className="text-sm text-yellow-700">
              Your personal information will be linked to this assessment based
              on your payment details.
            </p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>
              Step {currentStep + 1} of {steps.length}
            </span>
            <span>
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            {currentStepData.title}
          </h3>

          <div className="space-y-6">
            {currentStepData.fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="block text-lg font-medium text-gray-700">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                {field.type === "radio" ? (
                  <div className="space-y-3">
                    {field.options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={field.name}
                          value={option}
                          checked={formData[field.name] === option}
                          onChange={(e) =>
                            handleInputChange(field.name, e.target.value)
                          }
                          className="w-5 h-5 text-orange-400 border-gray-300 focus:ring-orange-400"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                ) : field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name]}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors"
                  />
                )}

                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
              className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={isSubmitting}
              className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </div>
              ) : currentStep === steps.length - 1 ? (
                "Complete Assessment"
              ) : (
                "Next"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
