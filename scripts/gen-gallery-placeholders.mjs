#!/usr/bin/env node
/**
 * gen-gallery-placeholders.mjs
 *
 * Generates 8 placeholder PNGs (1200x675, 16:9) for /demo page gallery.
 *
 * resumeai design system:
 *  - bg: gray-950 (#030712) → gray-900 (#111827) gradient
 *  - accent: emerald-500 (#10b981) — primary brand color
 *  - text: white + gray-400 (#9ca3af) + gray-500 (#6b7280)
 *
 * Replace these PH images with real screenshots after CEO visual review.
 *
 * Usage: node scripts/gen-gallery-placeholders.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const sections = [
  "Hero (JD Input)",
  "AI Tailoring",
  "ATS Score 23",
  "Career Branching",
  "Before-After",
  "PDF Download",
  "Pricing",
  "CTA",
];

const outDir = join(process.cwd(), "public", "gallery");
await mkdir(outDir, { recursive: true });

for (let i = 0; i < sections.length; i++) {
  const label = sections[i];
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <rect x="80" y="80" width="1040" height="515" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="8,8" rx="16"/>
  <rect x="80" y="588" width="240" height="6" fill="#10b981"/>
  <text x="600" y="310" font-family="'Plus Jakarta Sans', Inter, -apple-system, sans-serif" font-size="72" font-weight="700" fill="#ffffff" text-anchor="middle">${label}</text>
  <text x="600" y="370" font-family="'Plus Jakarta Sans', Inter, -apple-system, sans-serif" font-size="28" font-weight="400" fill="#9ca3af" text-anchor="middle">Section ${i + 1} of 8 — placeholder</text>
  <text x="600" y="430" font-family="'Plus Jakarta Sans', Inter, -apple-system, sans-serif" font-size="20" font-weight="500" fill="#6b7280" text-anchor="middle">getresumeai.site/demo</text>
</svg>`;
  const outPath = join(outDir, `ph-${i + 1}.png`);
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  console.log(`[gen-gallery] wrote ${outPath}`);
}

console.log(`[gen-gallery] done — ${sections.length} PNGs in ${outDir}`);
