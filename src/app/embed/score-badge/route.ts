import { NextRequest } from 'next/server';

/**
 * /embed/score-badge?score={n}&url={resumeId}
 *
 * Returns SVG badge: "Resume scored {n}/100 — Powered by ResumeAI"
 * Use:
 *   <iframe src="https://getresumeai.site/embed/score-badge?score=92" width="320" height="80" />
 *
 * MARKETING_OS.md §5 Weapon 2: "Powered by" viral loop (ClickFunnels model)
 */

export const runtime = 'edge';
export const revalidate = 3600; // 1h cache

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function colorForScore(score: number) {
  if (score >= 90) return '#10b981'; // emerald
  if (score >= 70) return '#f59e0b'; // amber
  return '#ef4444'; // red
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const scoreRaw = parseInt(searchParams.get('score') || '0', 10);
  const score = clamp(isNaN(scoreRaw) ? 0 : scoreRaw, 0, 100);
  const color = colorForScore(score);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="320" height="80">
  <rect width="320" height="80" rx="8" fill="#0a0a0a"/>
  <circle cx="48" cy="40" r="28" fill="none" stroke="${color}" stroke-width="6"/>
  <text x="48" y="46" text-anchor="middle" fill="${color}" font-family="-apple-system, system-ui, sans-serif" font-size="18" font-weight="700">${score}</text>
  <text x="92" y="34" fill="#fff" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="600">ATS Score: ${score}/100</text>
  <text x="92" y="52" fill="#a3a3a3" font-family="-apple-system, system-ui, sans-serif" font-size="11">Powered by ResumeAI</text>
  <text x="92" y="68" fill="${color}" font-family="-apple-system, system-ui, sans-serif" font-size="10" font-weight="600">getresumeai.site</text>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      // Allow iframe embed cross-origin
      'X-Frame-Options': 'ALLOWALL',
      'Content-Security-Policy': "frame-ancestors *",
    },
  });
}
