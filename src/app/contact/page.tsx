"use client";

import { useState, type FormEvent } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-20">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Have a question or feedback? We&apos;d love to hear from you.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="How can we help?"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 text-base font-medium text-white shadow-sm transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <svg
                      className="-ml-1 mr-2 h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              {status === "success" && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
                  Message sent! We&apos;ll get back to you within 24 hours.
                </div>
              )}

              {status === "error" && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
                  Failed to send. Please try again or email us at{" "}
                  <a
                    href="mailto:support@resumeai.site"
                    className="font-medium underline"
                  >
                    support@resumeai.site
                  </a>
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Or email us directly
              </h2>
              <a
                href="mailto:support@resumeai.site"
                className="mt-2 block text-emerald-600 hover:text-emerald-700"
              >
                support@resumeai.site
              </a>
              <p className="mt-4 text-sm text-gray-600">
                We typically respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
