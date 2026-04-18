'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';

const productLinks = [
  { label: 'Builder', href: '/builder' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '/blog' },
];

const resourceLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Contact', href: '/contact' },
];

const ourProducts = [
  { label: 'Trustfolio', href: 'https://trustfolio.dev' },
  { label: 'StatMate', href: 'https://statmate.org' },
  { label: 'RoastSite', href: 'https://roastsite.site' },
  { label: 'CodeNeat', href: 'https://codeneat.dev' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const res = await fetch('/api/subscribe-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'footer' }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
      }
    } catch {
      // Silent failure — UI still shows pending
    }
  }

  return (
    <footer className="bg-gray-950 text-gray-400 py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Row 1: Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div>
            <Link href="/" className="font-bold text-xl text-white">
              ResumeAI
            </Link>
            <p className="mt-2 text-sm">AI-powered resume builder</p>
          </div>

          {/* Col 2: Product */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Our Products */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">
              Our Products
            </h4>
            <ul className="space-y-2 text-sm">
              {ourProducts.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 2: Email collector */}
        <div className="mb-12">
          {subscribed ? (
            <p className="text-brand font-medium">Thanks! You&apos;re in.</p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-brand"
              />
              <button
                type="submit"
                className="bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-lg px-6 py-2 transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Row 3: Copyright */}
        <div className="border-t border-gray-800 pt-8 text-sm">
          &copy; 2026 ResumeAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
