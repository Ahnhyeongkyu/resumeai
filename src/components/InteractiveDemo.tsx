"use client";

import { useState, useEffect } from "react";

const DEMO_JOB = `Senior Software Engineer - React, Node.js
We're looking for an experienced engineer to build scalable web applications...
Requirements: React, TypeScript, Node.js, AWS, CI/CD, Agile methodology`;

const DEMO_RESUME_LINES = [
  "PROFESSIONAL SUMMARY",
  "Results-driven Software Engineer with 5+ years building",
  "scalable React and Node.js applications. Proven track",
  "record of delivering high-performance solutions on AWS.",
  "",
  "EXPERIENCE",
  "Senior Software Engineer | TechCorp | 2022-Present",
  "• Led migration to React 18, improving load time by 40%",
  "• Architected Node.js microservices serving 1M+ requests/day",
  "• Implemented CI/CD pipeline reducing deploy time by 60%",
  "",
  "SKILLS",
  "React • TypeScript • Node.js • AWS • CI/CD • Agile",
];

export default function InteractiveDemo() {
  const [typed, setTyped] = useState("");
  const [showResume, setShowResume] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < DEMO_JOB.length) {
        setTyped(DEMO_JOB.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setShowResume(true);
        }, 500);
      }
    }, 15);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    if (!showResume) return;
    let line = 0;
    const lineInterval = setInterval(() => {
      if (line < DEMO_RESUME_LINES.length) {
        setVisibleLines(line + 1);
        line++;
      } else {
        clearInterval(lineInterval);
      }
    }, 100);
    return () => clearInterval(lineInterval);
  }, [showResume]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
      {/* Input side */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span className="text-xs text-gray-500 ml-2">Job Description</span>
        </div>
        <div className="p-4 font-mono text-xs text-gray-700 whitespace-pre-wrap min-h-[200px]">
          {typed}
          <span className="animate-pulse">|</span>
        </div>
      </div>

      {/* Output side */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span className="text-xs text-gray-500 ml-2">Generated Resume</span>
          {showResume && (
            <span className="ml-auto text-xs font-medium text-green-600">ATS Score: 92/100</span>
          )}
        </div>
        <div className="p-4 font-mono text-xs text-gray-700 min-h-[200px]">
          {showResume ? (
            DEMO_RESUME_LINES.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                className={`${
                  line === "PROFESSIONAL SUMMARY" || line === "EXPERIENCE" || line === "SKILLS"
                    ? "font-bold text-blue-600 mt-1"
                    : ""
                } animate-fade-in`}
              >
                {line || "\u00A0"}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Waiting for job description...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
