#!/usr/bin/env node
/**
 * scripts/launch-day.mjs - M2 LAUNCH-PUSH orchestrator
 *
 * MARKETING_OS.md S3 STAGE M2 / GTM_PLAN.md S7
 *
 * Run:
 *   node scripts/launch-day.mjs --pre-flight   (verify only)
 *   node scripts/launch-day.mjs --full         (full D-Day)
 *   node scripts/launch-day.mjs --auto-only    (Full-Auto, no manifest)
 *
 * Required env (skipped if missing):
 *   DEVTO_API_KEY, HASHNODE_PAT + HASHNODE_PUBLICATION_ID,
 *   GSC_SERVICE_ACCOUNT_KEY, BING_INDEXNOW_KEY (optional)
 */

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = (process.env.GSC_SITE_URL || "https://getresumeai.site").trim().replace(/\/$/, "");

function log(msg) {
  const ts = new Date().toISOString().slice(11, 19);
  console.log(`[${ts}] ${msg}`);
}

function runScript(scriptPath, args = []) {
  return new Promise((res) => {
    const child = spawn("node", [scriptPath, ...args], {
      cwd: resolve(__dirname, ".."),
      stdio: "inherit",
      shell: false,
    });
    child.on("exit", (code) => res(code));
    child.on("error", () => res(1));
  });
}

async function preflight() {
  log("=== Pre-flight: Site health ===");
  const checks = [
    { name: "Site root", url: `${SITE}/` },
    { name: "OG image", url: `${SITE}/opengraph-image` },
    { name: "Score badge embed", url: `${SITE}/embed/score-badge?score=92` },
    { name: "QR API", url: `${SITE}/api/qr?url=${encodeURIComponent(SITE)}` },
    { name: "Gallery hero", url: `${SITE}/launch/gallery-1-hero.png` },
    { name: "Sitemap", url: `${SITE}/sitemap.xml` },
    { name: "Builder", url: `${SITE}/builder` },
    { name: "Pricing", url: `${SITE}/pricing` },
  ];
  const results = await Promise.all(
    checks.map(async (c) => {
      try {
        const r = await fetch(c.url, { method: "HEAD" });
        return { ...c, ok: r.ok, status: r.status };
      } catch (err) {
        return { ...c, ok: false, error: err.message };
      }
    })
  );
  for (const r of results) {
    log(`  ${r.ok ? "OK" : "FAIL"} ${r.name} (${r.status || r.error})`);
  }
  const allOk = results.every((r) => r.ok);
  if (!allOk) {
    log("  ! Some checks failed. Fix before D-Day.");
    return false;
  }
  log("  All site assets healthy.");
  return true;
}

function tokenStatus() {
  return {
    devto: !!(process.env.DEVTO_API_KEY || "").trim(),
    hashnode:
      !!(process.env.HASHNODE_PAT || "").trim() &&
      !!(process.env.HASHNODE_PUBLICATION_ID || "").trim(),
    gsc: !!(process.env.GSC_SERVICE_ACCOUNT_KEY || "").trim(),
    bing: !!(process.env.BING_INDEXNOW_KEY || "").trim(),
  };
}

async function runFullAuto() {
  const tokens = tokenStatus();
  log("=== Full-Auto: Token availability ===");
  log(`  Dev.to:   ${tokens.devto ? "READY" : "MISSING (DEVTO_API_KEY)"}`);
  log(`  Hashnode: ${tokens.hashnode ? "READY" : "MISSING (HASHNODE_PAT + HASHNODE_PUBLICATION_ID)"}`);
  log(`  GSC:      ${tokens.gsc ? "READY" : "MISSING (GSC_SERVICE_ACCOUNT_KEY)"}`);
  log(`  Bing:     ${tokens.bing ? "READY" : "MISSING (BING_INDEXNOW_KEY) optional"}`);

  log("\n=== Sitemap ping (Google + Bing + Yandex) ===");
  await runScript("scripts/sitemap-ping.mjs");

  if (tokens.devto) {
    log("\n=== Dev.to crosspost (5 posts) ===");
    await runScript("scripts/devto-crosspost.mjs", ["--all"]);
  } else {
    log("\n[SKIP] Dev.to: token missing");
  }

  if (tokens.hashnode) {
    log("\n=== Hashnode crosspost (5 posts) ===");
    await runScript("scripts/hashnode-crosspost.mjs", ["--all"]);
  } else {
    log("\n[SKIP] Hashnode: token missing");
  }

  if (tokens.gsc) {
    log("\n=== GSC URL Indexing (Day 1: P1 + P2 = 30 URLs) ===");
    await runScript("scripts/submit-gsc-indexing.mjs", ["--all"]);
  } else {
    log("\n[SKIP] GSC: token missing");
  }
}

function browserManifest() {
  log("\n=== Browser-Driven (CEO publish approval needed) ===");
  log("  Order (PST):");
  log("");
  log("  00:01 PST | Product Hunt");
  log("            |   https://www.producthunt.com/posts/new");
  log("            |   Content: marketing/launch/product-hunt.md");
  log("            |   Gallery 8 + logos: app/public/launch/");
  log("            |   First Comment at 00:05");
  log("");
  log("  08:00 PST | Hacker News");
  log("            |   https://news.ycombinator.com/submit");
  log("            |   Content: marketing/launch/hacker-news.md");
  log("            |   First Comment at 08:05");
  log("");
  log("  08:05 PST | Twitter Thread (10 tweets)");
  log("            |   https://x.com/compose/post");
  log("            |   Content: marketing/launch/twitter-thread.md");
  log("            |   30s gap between tweets, 4 image attachments");
  log("");
  log("  09:00 PST | LinkedIn (manual only - no auto)");
  log("            |   https://www.linkedin.com/feed/");
  log("            |   Content: marketing/launch/linkedin-post.md");
  log("");
  log("  10:00 PST | IndieHackers");
  log("            |   https://www.indiehackers.com/");
  log("            |   Content: marketing/launch/indie-hackers.md");
  log("            |   ! Comment privilege required first");
  log("");
  log("  11:00 PST | Medium #1");
  log("            |   https://medium.com/new-story");
  log("            |   Content: marketing/launch/medium-articles.md (Article 1)");
  log("");
  log("  12:00-18:00 PST | Directories P1 (5)");
  log("            |   Metadata: marketing/directories.md (P1 section)");
  log("            |   AlternativeTo / SaaSHub / Startup Stash / BetaList Free / Dev Hunt");
  log("");
  log("  D-Day ~ D+7 | Comment responses (1h cadence)");
}

async function main() {
  const args = process.argv.slice(2);
  const preFlightOnly = args.includes("--pre-flight");
  const autoOnly = args.includes("--auto-only");
  const full = args.includes("--full");

  if (!preFlightOnly && !autoOnly && !full) {
    console.log("Usage:");
    console.log("  node scripts/launch-day.mjs --pre-flight   (verify only)");
    console.log("  node scripts/launch-day.mjs --auto-only    (Full-Auto only)");
    console.log("  node scripts/launch-day.mjs --full         (full D-Day)");
    process.exit(1);
  }

  log("=== ResumeAI M2 LAUNCH-PUSH ===\n");

  const ok = await preflight();
  if (!ok && !preFlightOnly) {
    log("\n[ABORT] Pre-flight failed. Fix issues before continuing.");
    process.exit(1);
  }

  if (preFlightOnly) {
    log("\nPre-flight only. Done.");
    return;
  }

  await runFullAuto();

  if (!autoOnly) {
    browserManifest();
  }

  log("\n=== M2 LAUNCH-PUSH dispatch complete ===");
  log("\nNext actions:");
  log("  - CEO Browser-Driven approvals (manifest above)");
  log("  - 24h comment responses (1h cadence)");
  log("  - Collect post URLs to MARKETING_STATUS.md");
  log("  - D+7 -> M3 AMPLIFY entry");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
