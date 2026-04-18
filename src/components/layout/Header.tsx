'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '/blog' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setDrawerOpen(false);
    }
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [drawerOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-16 px-4 md:px-6 flex items-center transition-colors duration-300',
        scrolled
          ? 'backdrop-blur-md bg-black/80 border-b border-white/10'
          : 'bg-transparent'
      )}
    >
      {/* Logo */}
      <Link href="/" className="font-bold text-xl text-white">
        ResumeAI
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-8 mx-auto">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Desktop CTA */}
      <Link
        href="/builder"
        className="hidden md:inline-flex bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors"
      >
        Build My Resume Free
      </Link>

      {/* Mobile hamburger */}
      <button
        type="button"
        className="md:hidden ml-auto p-2 text-white"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-64 bg-gray-950 border-l border-white/10 transform transition-transform duration-300 md:hidden',
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex justify-end p-4">
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="p-2 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-4 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => setDrawerOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/builder"
            className="mt-4 bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-lg px-4 py-2 text-center transition-colors"
            onClick={() => setDrawerOpen(false)}
          >
            Build My Resume Free
          </Link>
        </nav>
      </div>
    </header>
  );
}
