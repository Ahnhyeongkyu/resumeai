#!/usr/bin/env node
/**
 * scripts/hashnode-crosspost.mjs
 * Full-Auto: Hashnode GraphQL API
 *
 * MARKETING_OS.md §4 / GTM_PLAN.md §6
 *
 * 5개 블로그 포스트를 Hashnode에 자동 게시 (canonical_url = getresumeai.site/blog/{slug})
 *
 * 환경변수:
 *   HASHNODE_PAT          Personal Access Token (https://hashnode.com/settings/developer)
 *   HASHNODE_PUBLICATION_ID  Publication ID (조회: GraphiQL https://gql.hashnode.com/)
 *
 * 실행:
 *   node scripts/hashnode-crosspost.mjs --all
 *   node scripts/hashnode-crosspost.mjs --slug=chatgpt-resume-prompts
 *   node scripts/hashnode-crosspost.mjs --dry-run
 */

const PAT = (process.env.HASHNODE_PAT || '').trim();
const PUBLICATION_ID = (process.env.HASHNODE_PUBLICATION_ID || '').trim();
const SITE_URL = (process.env.GSC_SITE_URL || 'https://getresumeai.site/').trim().replace(/\/$/, '');

if (!PAT || !PUBLICATION_ID) {
  console.error('ERROR: HASHNODE_PAT + HASHNODE_PUBLICATION_ID env vars required');
  console.error('PAT setup: https://hashnode.com/settings/developer');
  console.error('Publication ID: query "publication { id }" via https://gql.hashnode.com/');
  process.exit(1);
}

// ──────────── Posts to crosspost ────────────

const POSTS = [
  {
    slug: 'chatgpt-resume-prompts',
    title: '10 ChatGPT Resume Prompts That Actually Work in 2026',
    tags: [
      { slug: 'chatgpt', name: 'ChatGPT' },
      { slug: 'career', name: 'Career' },
      { slug: 'ai', name: 'AI' },
    ],
  },
  {
    slug: 'how-to-use-ai-resume',
    title: 'How to Use AI to Build a Resume (Without It Sounding Robotic)',
    tags: [
      { slug: 'ai', name: 'AI' },
      { slug: 'productivity', name: 'Productivity' },
      { slug: 'career', name: 'Career' },
    ],
  },
  {
    slug: 'ai-resume-tips-2026',
    title: 'AI Resume Tips: What Hiring Managers Actually Look For in 2026',
    tags: [
      { slug: 'career', name: 'Career' },
      { slug: 'ai', name: 'AI' },
      { slug: 'jobsearch', name: 'JobSearch' },
    ],
  },
  {
    slug: 'ats-resume-format-guide',
    title: 'The Complete ATS Resume Format Guide: Beat the Bots',
    tags: [
      { slug: 'career', name: 'Career' },
      { slug: 'productivity', name: 'Productivity' },
      { slug: 'jobsearch', name: 'JobSearch' },
    ],
  },
  {
    slug: 'resume-career-changers',
    title: 'Resume Writing for Career Changers: A Step-by-Step Guide',
    tags: [
      { slug: 'career', name: 'Career' },
      { slug: 'productivity', name: 'Productivity' },
    ],
  },
];

// ──────────── Fetch blog content ────────────

async function fetchBlogPost(slug) {
  const url = `${SITE_URL}/blog/${slug}`;

  const res = await fetch(url, {
    headers: { 'User-Agent': 'ResumeAI-Crosspost/1.0' },
  });

  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);

  const html = await res.text();
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (!articleMatch) throw new Error(`No <article> tag in ${url}`);

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
    .replace(/<[^>]+>/g, '')
    .replace(/\n\n\n+/g, '\n\n')
    .trim();

  return `${content}

---

> 📌 Originally posted on [getresumeai.site/blog/${slug}](${url}).

🚀 Try the tool: [ResumeAI](${SITE_URL}) — pay-once ($9), AI-tailored resume + 23-criteria ATS scoring. No subscription.
`;
}

// ──────────── Hashnode GraphQL ────────────

async function publishToHashnode(post, dryRun = false) {
  const content = await fetchBlogPost(post.slug);

  const mutation = `
    mutation PublishPost($input: PublishPostInput!) {
      publishPost(input: $input) {
        post {
          id
          slug
          url
        }
      }
    }
  `;

  const variables = {
    input: {
      title: post.title,
      contentMarkdown: content,
      tags: post.tags,
      publicationId: PUBLICATION_ID,
      originalArticleURL: `${SITE_URL}/blog/${post.slug}`,
      settings: {
        scheduled: false,
        enableTableOfContent: true,
        slugOverridden: false,
        isNewsletterActivated: false,
      },
    },
  };

  if (dryRun) {
    console.log(`[DRY RUN] Would publish: ${post.title} (${content.length} chars)`);
    console.log(`  Tags: ${post.tags.map(t => t.name).join(', ')}`);
    console.log(`  Canonical: ${variables.input.originalArticleURL}`);
    return { url: '[dry-run]', ok: true };
  }

  const res = await fetch('https://gql.hashnode.com/', {
    method: 'POST',
    headers: {
      'Authorization': PAT,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  const data = await res.json();

  if (data.errors) {
    throw new Error(`Hashnode GraphQL error: ${JSON.stringify(data.errors)}`);
  }

  return {
    url: data.data?.publishPost?.post?.url,
    ok: true,
    id: data.data?.publishPost?.post?.id,
  };
}

// ──────────── CLI ────────────

async function main() {
  const args = process.argv.slice(2);
  const all = args.includes('--all');
  const dryRun = args.includes('--dry-run');
  const slugFilter = args.find(a => a.startsWith('--slug='))?.split('=')[1];

  const target = slugFilter ? POSTS.filter(p => p.slug === slugFilter) : POSTS;

  if (!all && !slugFilter) {
    console.log('Usage: node scripts/hashnode-crosspost.mjs [--all | --slug=<slug>] [--dry-run]');
    console.log('Available slugs:');
    POSTS.forEach(p => console.log(`  - ${p.slug}`));
    process.exit(1);
  }

  console.log(`=== Crossposting ${target.length} post(s) to Hashnode ${dryRun ? '[DRY RUN]' : ''} ===\n`);

  const results = [];

  for (const post of target) {
    try {
      console.log(`Publishing: ${post.title}`);
      const result = await publishToHashnode(post, dryRun);
      console.log(`  [OK] ${result.url}\n`);
      results.push({ slug: post.slug, ok: true, url: result.url });

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
