#!/usr/bin/env node
/**
 * scripts/devto-crosspost.mjs
 * Full-Auto: Dev.to REST API
 *
 * MARKETING_OS.md §4 / GTM_PLAN.md §6
 *
 * 5개 블로그 포스트를 Dev.to에 자동 게시 (canonical_url = getresumeai.site/blog/{slug})
 *
 * 환경변수:
 *   DEVTO_API_KEY     Dev.to API key (https://dev.to/settings/extensions)
 *
 * 실행:
 *   node scripts/devto-crosspost.mjs --all              (5개 모두 게시)
 *   node scripts/devto-crosspost.mjs --slug=chatgpt-resume-prompts  (1개만)
 *   node scripts/devto-crosspost.mjs --dry-run          (게시 없이 검증)
 */

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');

const API_KEY = (process.env.DEVTO_API_KEY || '').trim();
const SITE_URL = (process.env.GSC_SITE_URL || 'https://getresumeai.site/').trim().replace(/\/$/, '');

if (!API_KEY) {
  console.error('ERROR: DEVTO_API_KEY env var required');
  console.error('Setup: https://dev.to/settings/extensions');
  process.exit(1);
}

// ──────────── Posts to crosspost ────────────

const POSTS = [
  {
    slug: 'chatgpt-resume-prompts',
    title: '10 ChatGPT Resume Prompts That Actually Work in 2026',
    tags: ['chatgpt', 'career', 'ai', 'resume'],
  },
  {
    slug: 'how-to-use-ai-resume',
    title: 'How to Use AI to Build a Resume (Without It Sounding Robotic)',
    tags: ['ai', 'career', 'productivity', 'resume'],
  },
  {
    slug: 'ai-resume-tips-2026',
    title: 'AI Resume Tips: What Hiring Managers Actually Look For in 2026',
    tags: ['career', 'ai', 'jobsearch', 'resume'],
  },
  {
    slug: 'ats-resume-format-guide',
    title: 'The Complete ATS Resume Format Guide: Beat the Bots',
    tags: ['career', 'resume', 'productivity', 'jobsearch'],
  },
  {
    slug: 'resume-career-changers',
    title: 'Resume Writing for Career Changers: A Step-by-Step Guide',
    tags: ['career', 'productivity', 'resume', 'showdev'],
  },
];

// ──────────── Fetch blog content ────────────

async function fetchBlogPost(slug) {
  const url = `${SITE_URL}/blog/${slug}`;

  const res = await fetch(url, {
    headers: { 'User-Agent': 'ResumeAI-Crosspost/1.0' },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }

  const html = await res.text();

  // Extract <article> content
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (!articleMatch) {
    throw new Error(`No <article> tag in ${url}`);
  }

  // Strip HTML to plain markdown-ish (basic)
  const content = articleMatch[1]
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')
    .replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**')
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*')
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
    .replace(/<[^>]+>/g, '') // Strip remaining HTML
    .replace(/\n\n\n+/g, '\n\n')
    .trim();

  // Append CTA
  return `${content}

---

> 📌 Originally posted on [getresumeai.site/blog/${slug}](${url}). This is a cross-post.

🚀 Try the tool: [ResumeAI](${SITE_URL}) — pay-once ($9), AI-tailored resume + 23-criteria ATS scoring. No subscription.
`;
}

// ──────────── Dev.to API ────────────

async function publishToDevto(post, dryRun = false) {
  const content = await fetchBlogPost(post.slug);

  const body = {
    article: {
      title: post.title,
      published: !dryRun,
      body_markdown: content,
      tags: post.tags,
      canonical_url: `${SITE_URL}/blog/${post.slug}`,
      series: 'ResumeAI Blog',
    },
  };

  if (dryRun) {
    console.log(`[DRY RUN] Would publish: ${post.title} (${content.length} chars)`);
    console.log(`  Tags: ${post.tags.join(', ')}`);
    console.log(`  Canonical: ${body.article.canonical_url}`);
    return { url: '[dry-run]', ok: true };
  }

  const res = await fetch('https://dev.to/api/articles', {
    method: 'POST',
    headers: {
      'api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Dev.to API error (${res.status}): ${err}`);
  }

  const data = await res.json();
  return { url: data.url, ok: true, id: data.id };
}

// ──────────── CLI ────────────

async function main() {
  const args = process.argv.slice(2);
  const all = args.includes('--all');
  const dryRun = args.includes('--dry-run');
  const slugFilter = args.find(a => a.startsWith('--slug='))?.split('=')[1];

  const target = slugFilter ? POSTS.filter(p => p.slug === slugFilter) : POSTS;

  if (!all && !slugFilter) {
    console.log('Usage: node scripts/devto-crosspost.mjs [--all | --slug=<slug>] [--dry-run]');
    console.log('Available slugs:');
    POSTS.forEach(p => console.log(`  - ${p.slug}`));
    process.exit(1);
  }

  console.log(`=== Crossposting ${target.length} post(s) to Dev.to ${dryRun ? '[DRY RUN]' : ''} ===\n`);

  const results = [];

  for (const post of target) {
    try {
      console.log(`Publishing: ${post.title}`);
      const result = await publishToDevto(post, dryRun);
      console.log(`  [OK] ${result.url}\n`);
      results.push({ slug: post.slug, ok: true, url: result.url });

      // Rate limit: 30 articles/30s for free tier (Dev.to)
      await new Promise(r => setTimeout(r, 2000));
    } catch (err) {
      console.error(`  [FAIL] ${err.message}\n`);
      results.push({ slug: post.slug, ok: false, error: err.message });
    }
  }

  console.log('\n=== Summary ===');
  results.forEach(r => {
    console.log(r.ok ? `[OK] ${r.slug} — ${r.url}` : `[FAIL] ${r.slug} — ${r.error}`);
  });

  const success = results.filter(r => r.ok).length;
  console.log(`\nResult: ${success}/${results.length} OK`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
