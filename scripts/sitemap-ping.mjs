#!/usr/bin/env node
/**
 * scripts/sitemap-ping.mjs
 * Full-Auto: Sitemap ping (Google + Bing IndexNow)
 *
 * MARKETING_OS.md §4 / GTM_PLAN.md §6
 *
 * postbuild hook으로 등록 (package.json):
 *   "postbuild": "next-sitemap && node scripts/sitemap-ping.mjs"
 *
 * 환경변수 (선택):
 *   GSC_SITE_URL          기본: https://getresumeai.site
 *   BING_INDEXNOW_KEY     Bing IndexNow key (https://www.bing.com/indexnow/getstarted)
 *
 * 실행:
 *   node scripts/sitemap-ping.mjs
 */

const SITE_URL = (process.env.GSC_SITE_URL || 'https://getresumeai.site').trim().replace(/\/$/, '');
const BING_KEY = (process.env.BING_INDEXNOW_KEY || '').trim();
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

// ──────────── Google: ping (legacy but still works) ────────────

async function pingGoogle() {
  const url = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
  try {
    const res = await fetch(url, { method: 'GET' });
    return { provider: 'Google', ok: res.ok, status: res.status };
  } catch (err) {
    return { provider: 'Google', ok: false, error: err.message };
  }
}

// ──────────── Bing IndexNow ────────────

async function pingBingIndexNow() {
  if (!BING_KEY) {
    return { provider: 'Bing IndexNow', ok: false, error: 'BING_INDEXNOW_KEY not set' };
  }

  // Fetch sitemap to extract URLs
  let urls = [];
  try {
    const sitemapRes = await fetch(SITEMAP_URL);
    if (!sitemapRes.ok) throw new Error(`Sitemap fetch failed: ${sitemapRes.status}`);

    const xml = await sitemapRes.text();
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

    // If sitemap is index, fetch each
    if (urls.some(u => u.includes('sitemap-'))) {
      const subUrls = [];
      for (const subSitemapUrl of urls) {
        const subRes = await fetch(subSitemapUrl);
        if (subRes.ok) {
          const subXml = await subRes.text();
          const subItems = [...subXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
          subUrls.push(...subItems);
        }
      }
      urls = subUrls;
    }
  } catch (err) {
    return { provider: 'Bing IndexNow', ok: false, error: `Sitemap parse: ${err.message}` };
  }

  if (urls.length === 0) {
    return { provider: 'Bing IndexNow', ok: false, error: 'No URLs in sitemap' };
  }

  // IndexNow batch (10K limit per request)
  const batchSize = 10000;
  const batches = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize));
  }

  const results = [];
  for (const batch of batches) {
    const body = {
      host: new URL(SITE_URL).host,
      key: BING_KEY,
      keyLocation: `${SITE_URL}/${BING_KEY}.txt`,
      urlList: batch,
    };

    try {
      const res = await fetch('https://api.indexnow.org/IndexNow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body),
      });
      results.push({ batch_size: batch.length, status: res.status, ok: res.ok });
    } catch (err) {
      results.push({ batch_size: batch.length, ok: false, error: err.message });
    }
  }

  const totalOk = results.every(r => r.ok);
  const totalSubmitted = results.reduce((sum, r) => sum + (r.ok ? r.batch_size : 0), 0);

  return {
    provider: 'Bing IndexNow',
    ok: totalOk,
    submitted: totalSubmitted,
    batches: results.length,
  };
}

// ──────────── Yandex (optional) ────────────

async function pingYandex() {
  const url = `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
  try {
    const res = await fetch(url, { method: 'GET' });
    return { provider: 'Yandex', ok: res.ok, status: res.status };
  } catch (err) {
    return { provider: 'Yandex', ok: false, error: err.message };
  }
}

// ──────────── Main ────────────

async function main() {
  console.log(`=== Sitemap Ping for ${SITE_URL} ===\n`);
  console.log(`Sitemap: ${SITEMAP_URL}\n`);

  const results = await Promise.allSettled([
    pingGoogle(),
    pingBingIndexNow(),
    pingYandex(),
  ]);

  for (const r of results) {
    if (r.status === 'fulfilled') {
      const { provider, ok, ...rest } = r.value;
      console.log(`${ok ? '[OK]' : '[FAIL]'} ${provider}:`, rest);
    } else {
      console.log(`[FAIL] (rejected):`, r.reason);
    }
  }

  console.log('\nDone. Pinging is best-effort — search engines fetch on their schedule.');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
