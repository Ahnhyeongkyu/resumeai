"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { exampleJDs } from "@/data/example-jds";

interface StepJDProps {
  jobDescription: string;
  onJobDescriptionChange: (value: string) => void;
  onNext: () => void;
}

const MAX_CHARS = 5000;
const MIN_CHARS = 50;

export default function StepJD({
  jobDescription,
  onJobDescriptionChange,
  onNext,
}: StepJDProps) {
  const [showExamples, setShowExamples] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const charCount = jobDescription.length;
  const isOverLimit = charCount > MAX_CHARS;
  const isUnderMin = charCount < MIN_CHARS;
  const isDisabled = isOverLimit || isUnderMin || isTyping;

  const handleExampleSelect = useCallback(
    (name: string) => {
      setShowExamples(false);

      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }

      const text = exampleJDs[name];
      if (!text) return;

      setIsTyping(true);
      onJobDescriptionChange("");

      let index = 0;
      const type = () => {
        if (index < text.length) {
          onJobDescriptionChange(text.slice(0, index + 1));
          index++;
          typingRef.current = setTimeout(type, 15);
        } else {
          setIsTyping(false);
          typingRef.current = null;
        }
      };
      typingRef.current = setTimeout(type, 15);
    },
    [onJobDescriptionChange]
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Paste the Job Description
      </h1>
      <p className="text-gray-500 mb-6">
        We&apos;ll extract keywords, skills, and requirements automatically.
      </p>

      {/* Textarea */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          rows={12}
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          placeholder="Paste the full job listing here..."
          disabled={isTyping}
          className={`w-full rounded-lg border p-4 text-sm text-gray-900 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
            isOverLimit
              ? "border-red-400 focus:ring-red-500"
              : "border-gray-300"
          }`}
        />
        {/* Character counter */}
        <div className="absolute bottom-3 right-3">
          <span
            className={`text-xs ${
              isOverLimit ? "text-red-500 font-medium" : "text-gray-400"
            }`}
          >
            {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Example dropdown */}
      <div className="mt-3 relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setShowExamples(!showExamples)}
          className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
        >
          Or try an example
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              showExamples ? "rotate-180" : ""
            }`}
          />
        </button>

        {showExamples && (
          <div className="absolute top-8 left-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[280px]">
            {Object.keys(exampleJDs).map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => handleExampleSelect(name)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={onNext}
        disabled={isDisabled}
        className={`mt-8 w-full py-3 rounded-lg text-white font-semibold transition-colors ${
          isDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-emerald-500 hover:bg-emerald-600"
        }`}
      >
        Next
      </button>
    </div>
  );
}
