import { NextRequest } from 'next/server';
import QRCode from 'qrcode';

/**
 * /api/qr?url={encoded}&size={px}
 *
 * Returns PNG QR code for the given URL.
 * Used by PDF watermark to embed scannable link to getresumeai.site.
 *
 * MARKETING_OS.md §5 Weapon 2: "Powered by" viral loop
 */

export const runtime = 'nodejs';

const DEFAULT_URL = 'https://getresumeai.site?ref=pdf-qr';
const MAX_SIZE = 512;
const MIN_SIZE = 64;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = (searchParams.get('url') || DEFAULT_URL).trim();
  const sizeRaw = parseInt(searchParams.get('size') || '120', 10);
  const size = Math.max(MIN_SIZE, Math.min(MAX_SIZE, isNaN(sizeRaw) ? 120 : sizeRaw));

  // Whitelist: only allow our own domain to prevent open-redirect-style abuse
  if (!url.startsWith('https://getresumeai.site')) {
    return new Response('Invalid URL', { status: 400 });
  }

  try {
    const png = await QRCode.toBuffer(url, {
      width: size,
      margin: 1,
      color: { dark: '#0a0a0a', light: '#ffffff' },
      errorCorrectionLevel: 'M',
    });

    // Convert Buffer to Uint8Array for Response (Next.js edge-compat-friendly)
    const body = new Uint8Array(png);

    return new Response(body, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch {
    return new Response('QR generation failed', { status: 500 });
  }
}
