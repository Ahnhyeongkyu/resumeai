"use client";

import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Job Description" },
  { number: 2, label: "Your Info" },
  { number: 3, label: "Generating" },
  { number: 4, label: "Result" },
];

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="h-12 border-b border-gray-200 bg-white flex items-center justify-center px-4">
      <div className="flex items-center gap-0 max-w-lg w-full">
        {steps.map((step, i) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div key={step.number} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-1.5">
                {/* Circle */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isCurrent
                        ? "bg-emerald-500 text-white"
                        : "border-2 border-gray-300 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
                {/* Label */}
                <span
                  className={`text-xs whitespace-nowrap hidden sm:inline ${
                    isCurrent
                      ? "font-bold text-gray-900"
                      : isCompleted
                        ? "text-green-600 font-medium"
                        : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Line */}
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    isCompleted
                      ? "bg-green-500"
                      : isCurrent
                        ? "bg-emerald-500"
                        : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
