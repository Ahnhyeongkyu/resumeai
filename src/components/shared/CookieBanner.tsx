'use client';

import { useState, useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent === null) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem('cookie_consent', 'true');
    setVisible(false);
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  }

  function reject() {
    localStorage.setItem('cookie_consent', 'false');
    setVisible(false);
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] bg-gray-900 border-t border-gray-800 px-4 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300">
          We use cookies for analytics to improve your experience.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={reject}
            className="text-sm text-gray-400 hover:text-white border border-gray-700 rounded-lg px-4 py-2 transition-colors"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={accept}
            className="text-sm text-white bg-brand hover:bg-brand-hover rounded-lg px-4 py-2 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
