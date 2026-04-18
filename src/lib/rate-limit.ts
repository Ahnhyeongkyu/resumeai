import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let cachedRedis: Redis | null = null;

function getRedis(): Redis | null {
  if (cachedRedis) return cachedRedis;
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  try {
    cachedRedis = new Redis({ url, token });
    return cachedRedis;
  } catch (e) {
    console.error('Upstash Redis init failed:', e);
    return null;
  }
}

const limiters = new Map<string, Ratelimit>();

function makeLimiter(key: string, limit: number, windowSec: number): Ratelimit | null {
  const cached = limiters.get(key);
  if (cached) return cached;
  const redis = getRedis();
  if (!redis) return null;
  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
    analytics: false,
    prefix: `resumeai:${key}`,
  });
  limiters.set(key, limiter);
  return limiter;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export async function rateLimit(
  key: string,
  identifier: string,
  limit: number,
  windowSec: number
): Promise<RateLimitResult> {
  const limiter = makeLimiter(key, limit, windowSec);
  if (!limiter) {
    return { success: true, limit, remaining: limit, reset: Date.now() + windowSec * 1000 };
  }
  const r = await limiter.limit(identifier);
  return { success: r.success, limit: r.limit, remaining: r.remaining, reset: r.reset };
}

export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const real = request.headers.get('x-real-ip');
  if (real) return real;
  return '127.0.0.1';
}
