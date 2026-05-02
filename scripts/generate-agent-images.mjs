#!/usr/bin/env node
// Generate one realtor headshot per Marsillow agent using Gemini's
// "Nano Banana" image model. All agents share the same source likeness
// (a fictional Mars realtor character whose face matches Elon Musk's),
// gender-swapped for the female-presenting Musks. Each agent gets a
// distinct realtor outfit and subtle styling so the page feels alive.
//
// Usage:
//   node scripts/generate-agent-images.mjs                # generate missing
//   node scripts/generate-agent-images.mjs --force        # regenerate all
//   node scripts/generate-agent-images.mjs --only=elon-musk,maye-musk
//
// Reads GEMINI_API_KEY from process.env or .env.local.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "agents");

const MODEL = process.env.GEMINI_MODEL || "gemini-3-pro-image-preview";
const ENDPOINT = (key) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`;

async function loadEnv() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  try {
    const raw = await fs.readFile(path.join(ROOT, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*GEMINI_API_KEY\s*=\s*(.+)\s*$/);
      if (m) return m[1].replace(/^['"]|['"]$/g, "");
    }
  } catch {}
  throw new Error("GEMINI_API_KEY not found in env or .env.local");
}

// Shared styling so the agent gallery hangs together.
const SHARED_STYLE = `Professional photorealistic real-estate-agent headshot for a marketing brochure. Clean studio lighting, soft warm gray seamless backdrop. Subject framed from chest up, looking at the camera with a confident, warm realtor smile. Sharp focus, shallow depth of field, 85mm lens look. Square 1:1 composition. No text, no logos anywhere in the image.`;

// Same face across the whole roster.
const FACE_BASE = `The subject's face is unmistakably Elon Musk's: same square jaw with a slight cleft chin, prominent brow, intense gray-blue eyes, slightly upturned nose, asymmetric subtle smile, prominent forehead with a receding hairline. Light stubble. The likeness must be consistent — every agent in the roster shares this exact face.`;

const FEMALE_NOTE = `Gender-swapped feminine presentation: same Elon Musk facial bone structure (jaw, brow, eyes, nose) but presenting as a woman — softer makeup, subtle blush, plucked brows, a feminine hairstyle as described. The face is still recognizably Elon Musk's, just feminized.`;

// Per-agent outfit / styling overrides.
const AGENTS = [
  {
    id: "elon-musk",
    desc: `Male presentation. Modern tailored midnight-navy two-piece suit, crisp white open-collar shirt, no tie. Hair brown, neatly combed back. Polished, founder-of-the-firm energy.`,
  },
  {
    id: "errol-musk",
    desc: `Male presentation. Distinguished older variant of the same face: silvering temples, a few weathered lines around the eyes (still the same face). Charcoal pinstripe three-piece suit, burgundy silk tie, gold pocket-watch chain at the waistcoat. Veteran land-broker energy.`,
  },
  {
    id: "maye-musk",
    desc: `${FEMALE_NOTE} Cropped silver-white pixie cut. Cream silk blouse under a tailored ivory blazer, simple pearl earrings, a fine silver chain. Polished mature realtor energy.`,
  },
  {
    id: "kimbal-musk",
    desc: `Male presentation. Olive corduroy blazer over a forest-green henley shirt. Stubbled beard. Hair brown and a touch wavy. Friendly agricultural-realtor energy.`,
  },
  {
    id: "tosca-musk",
    desc: `${FEMALE_NOTE} Long honey-blonde hair styled to one shoulder. Tailored beige blazer over an ivory shell, a thin silk scarf knotted at the neck, gold hoop earrings. Lifestyle-realtor energy.`,
  },
  {
    id: "justine-musk",
    desc: `${FEMALE_NOTE} Sleek dark-brown hair, blunt shoulder-length cut, slight side part. Black mock-neck top under a fitted black blazer, silver statement earrings, a single silver pendant. Writerly canyon-rim-realtor energy.`,
  },
  {
    id: "vivian-musk",
    desc: `${FEMALE_NOTE} Younger version of the face. Magenta-pink shoulder-length hair, modern undercut on one side. Burnt-orange double-breasted blazer over a black tee, a single small silver hoop in each ear. Progressive heritage-corridor-realtor energy.`,
  },
  {
    id: "strider-musk",
    desc: `Male presentation, younger variant of the face — late 20s, fuller hair, no receding hairline yet. Charcoal bomber jacket over a navy realtor polo with a small subtle Marsillow lapel pin. Stubble. Up-and-coming lakebed-and-delta-realtor energy.`,
  },
  {
    id: "talulah-musk",
    desc: `${FEMALE_NOTE} Long platinum-blonde hair, soft waves. Burgundy power suit jacket over a cream silk camisole, statement gold earrings, polished red lip. Press-and-PR-realtor energy.`,
  },
  {
    id: "damian-musk",
    desc: `Male presentation, younger variant — late 20s. Mustard sweater vest over a crisp white button-down shirt, knit tie, round tortoiseshell glasses. Friendly first-time-settler-realtor energy.`,
  },
  {
    id: "saxon-musk",
    desc: `Male presentation, mid 30s variant — slightly more rugged. Black moto leather jacket over a grey heathered tee, simple silver chain. Stubble, hair shorter and tousled. Industrial-corridor-realtor energy.`,
  },
  {
    id: "octavia-musk",
    desc: `${FEMALE_NOTE} Auburn shoulder-length hair, slight wave, parted in the middle. Dark olive blazer over a black turtleneck, slim wire-rim glasses, small gold studs. Volcanic-highlands-realtor energy.`,
  },
];

async function generateImage(agent, apiKey) {
  const fullPrompt = `${SHARED_STYLE}\n\n${FACE_BASE}\n\nOUTFIT & STYLING:\n${agent.desc}\n\nDeliver a single photorealistic 1024x1024 portrait. Subject only — no captions, no text, no on-image labels.`;
  const body = {
    contents: [{ parts: [{ text: fullPrompt }] }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig: { aspectRatio: "1:1" },
    },
  };

  const res = await fetch(ENDPOINT(apiKey), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 600)}`);
  }
  const data = await res.json();

  const parts = data?.candidates?.[0]?.content?.parts || [];
  for (const p of parts) {
    const inline = p.inlineData || p.inline_data;
    if (inline?.data) {
      return Buffer.from(inline.data, "base64");
    }
  }
  // Surface refusals / safety blocks clearly.
  const finishReason = data?.candidates?.[0]?.finishReason;
  const safety = data?.promptFeedback || data?.candidates?.[0]?.safetyRatings;
  throw new Error(
    `No image data. finishReason=${finishReason}; safety=${JSON.stringify(safety)?.slice(0, 400)}`
  );
}

async function runPool(items, worker, concurrency = 3) {
  const queue = [...items];
  const results = [];
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const item = queue.shift();
      try {
        const result = await worker(item);
        results.push({ ok: true, item, result });
      } catch (err) {
        results.push({ ok: false, item, error: err });
      }
    }
  });
  await Promise.all(workers);
  return results;
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const onlyArg = args.find((a) => a.startsWith("--only="));
  const only = onlyArg ? new Set(onlyArg.slice(7).split(",")) : null;

  const apiKey = await loadEnv();
  await fs.mkdir(OUT_DIR, { recursive: true });

  const todo = [];
  for (const agent of AGENTS) {
    if (only && !only.has(agent.id)) continue;
    const outPath = path.join(OUT_DIR, `${agent.id}.png`);
    if (!force) {
      try {
        const stat = await fs.stat(outPath);
        if (stat.size > 1000) {
          console.log(`✓ skip ${agent.id} (already exists)`);
          continue;
        }
      } catch {}
    }
    todo.push({ ...agent, outPath });
  }

  if (!todo.length) {
    console.log("\nAll agent images already present. Use --force to regenerate.");
    return;
  }

  console.log(`\nGenerating ${todo.length} agent headshot(s) with model ${MODEL}…\n`);
  const results = await runPool(
    todo,
    async (agent) => {
      const start = Date.now();
      console.log(`  → ${agent.id}`);
      const buf = await generateImage(agent, apiKey);
      await fs.writeFile(agent.outPath, buf);
      const ms = Date.now() - start;
      console.log(`  ✓ ${agent.id} (${(buf.length / 1024).toFixed(0)}kb, ${ms}ms)`);
      return agent.outPath;
    },
    3
  );

  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.log("\n--- failures ---");
    for (const f of failed) {
      console.log(`✗ ${f.item.id}: ${f.error.message}`);
    }
    process.exitCode = 1;
  } else {
    console.log(`\nDone. ${results.length} images in ${OUT_DIR}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
