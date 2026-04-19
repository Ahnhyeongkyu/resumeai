#!/usr/bin/env node
/**
 * scripts/submit-gsc-indexing.mjs
 * Full-Auto: Google Search Console URL Indexing API
 *
 * MARKETING_OS.md §4 / GTM_PLAN.md §6 Top Channel #1
 *
 * 일일 한도: 200 URLs/day (Google quota)
 * 우선순위: 신흥 테크 pSEO 15개 → 비교 15개 → 블로그 5개 → 나머지 28개 (총 81개)
 * 4-5일 분산 권장
 *
 * 환경변수:
 *   GSC_SERVICE_ACCOUNT_KEY  Google service account JSON (base64-encoded)
 *   GSC_SITE_URL             https://getresumeai.site/  (trailing slash)
 *
 * 실행:
 *   node scripts/submit-gsc-indexing.mjs --tier=1   (P1 신흥 테크 pSEO 15개)
 *   node scripts/submit-gsc-indexing.mjs --tier=2   (P2 비교 15개)
 *   node scripts/submit-gsc-indexing.mjs --tier=3   (P3 블로그 5개)
 *   node scripts/submit-gsc-indexing.mjs --all      (모든 81개, 5일 자동 분산)
 */

import { google } from 'googleapis';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

// ──────────── Setup ────────────

const __dirname = dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.GSC_SITE_URL || 'https://getresumeai.site/').trim();
const SERVICE_ACCOUNT_B64 = (process.env.GSC_SERVICE_ACCOUNT_KEY || '').trim();
const DAILY_LIMIT = 200;

if (!SERVICE_ACCOUNT_B64) {
  console.error('ERROR: GSC_SERVICE_ACCOUNT_KEY env var required');
  console.error('Setup: https://developers.google.com/search/apis/indexing-api/v3/prereqs');
  process.exit(1);
}

const credentials = JSON.parse(
  Buffer.from(SERVICE_ACCOUNT_B64, 'base64').toString('utf-8')
);

const auth = new google.auth.JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});

const indexing = google.indexing({ version: 'v3', auth });

// ──────────── URL Tiers ────────────

// Loaded from app/src/data/pseo/index.ts and alternatives/index.ts
async function loadUrls() {
  const tiers = {
    p1_emerging_tech: [
      // Tier 1: Emerging Tech (15 high-priority pSEO)
      'prompt-engineer', 'ai-engineer', 'machine-learning-engineer',
      'data-scientist', 'devops-engineer', 'site-reliability-engineer',
      'cybersecurity-engineer', 'cloud-engineer', 'platform-engineer',
      'mobile-developer', 'game-developer', 'qa-engineer',
      'frontend-engineer', 'backend-engineer', 'fullstack-engineer',
    ].map(slug => `${SITE_URL}${slug}`),

    p2_comparisons: [
      // Tier 2: Competitor comparisons (15)
      'rezi', 'resumeio', 'zety', 'kickresume', 'novoresume',
      'enhancv', 'teal', 'jobscan', 'resumegenius', 'resumeworded',
      'standard-resume', 'cvmaker', 'resumebuilder', 'myperfectresume', 'livecareer',
    ].map(slug => `${SITE_URL}alternatives/${slug}`),

    p3_blog: [
      // Tier 3: Blog (5)
      'chatgpt-resume-prompts',
      'how-to-use-ai-resume',
      'ai-resume-tips-2026',
      'ats-resume-format-guide',
      'resume-career-changers',
    ].map(slug => `${SITE_URL}blog/${slug}`),

    p4_remaining_pseo: [
      // Tier 4: Remaining pSEO (28+)
      'software-engineer', 'product-manager', 'designer', 'project-manager',
      'data-analyst', 'business-analyst', 'marketing-manager', 'sales-engineer',
      'customer-success-manager', 'account-executive', 'recruiter', 'hr-manager',
      'finance-analyst', 'accountant', 'lawyer', 'consultant',
      'teacher', 'nurse', 'pharmacist', 'doctor',
      'graphic-designer', 'copywriter', 'social-media-manager', 'biomedical-engineer',
      'mechanical-engineer', 'electrical-engineer', 'civil-engineer', 'network-engineer',
    ].map(slug => `${SITE_URL}${slug}`),

    p5_static: [
      // Tier 5: Static pages
      `${SITE_URL}`,
      `${SITE_URL}builder`,
      `${SITE_URL}pricing`,
      `${SITE_URL}blog`,
      `${SITE_URL}alternatives`,
      `${SITE_URL}privacy`,
      `${SITE_URL}terms`,
      `${SITE_URL}contact`,
    ],
  };

  return tiers;
}

// ──────────── GSC Indexing API ────────────

async function submitUrl(url) {
  try {
    const res = await indexing.urlNotifications.publish({
      requestBody: { url, type: 'URL_UPDATED' },
    });
    return { url, ok: true, response: res.data };
  } catch (err) {
    return { url, ok: false, error: err.message };
  }
}

async function batchSubmit(urls, label) {
  console.log(`\n=== Submitting ${label} (${urls.length} URLs) ===`);

  const results = [];
  let counter = 0;

  for (const url of urls) {
    if (counter >= DAILY_LIMIT) {
      console.log(`Daily limit (${DAILY_LIMIT}) reached. Remaining ${urls.length - counter} URLs deferred.`);
      break;
    }

    const result = await submitUrl(url);
    results.push(result);

    if (result.ok) {
      console.log(`  [OK] ${url}`);
    } else {
      console.log(`  [FAIL] ${url} — ${result.error}`);
    }

    counter += 1;
    await new Promise(r => setTimeout(r, 1000)); // 1s delay (Google rate limit)
  }

  const success = results.filter(r => r.ok).length;
  console.log(`\nResult: ${success}/${results.length} OK`);

  return results;
}

// ──────────── CLI ────────────

async function main() {
  const args = process.argv.slice(2);
  const tier = args.find(a => a.startsWith('--tier='))?.split('=')[1];
  const all = args.includes('--all');

  const urls = await loadUrls();

  if (all) {
    // 5일 분산 (200/일 * 5 = 1000, 81개 1일 가능하지만 분산이 안전)
    console.log('=== ALL TIERS (Day 1: P1+P2 30 URLs) ===');
    await batchSubmit([...urls.p1_emerging_tech, ...urls.p2_comparisons], 'Day 1');
    console.log('\nNote: Run again tomorrow for P3+P4+P5 (45 URLs).');
  } else if (tier === '1') {
    await batchSubmit(urls.p1_emerging_tech, 'P1 Emerging Tech (15)');
  } else if (tier === '2') {
    await batchSubmit(urls.p2_comparisons, 'P2 Comparisons (15)');
  } else if (tier === '3') {
    await batchSubmit(urls.p3_blog, 'P3 Blog (5)');
  } else if (tier === '4') {
    await batchSubmit(urls.p4_remaining_pseo, 'P4 Remaining pSEO (28)');
  } else if (tier === '5') {
    await batchSubmit(urls.p5_static, 'P5 Static (8)');
  } else {
    console.log('Usage: node scripts/submit-gsc-indexing.mjs [--tier=1|2|3|4|5 | --all]');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
