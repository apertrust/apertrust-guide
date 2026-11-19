// The Help topics the Guide's English pages claim (decision 97), one a line, sorted:
//   npm run topics
// With a file of the topics the app uses, one a line (`apertrust --list-help-topics`,
// planned), it lists those no page claims and fails if there are any:
//   npm run topics -- --check app-topics.txt
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = "src/content/docs/en";

function pages(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return pages(path);
    return /\.mdx?$/.test(name) ? [path] : [];
  });
}

// The `topics:` list of a page's front matter, as written in this repository: a block
// list of quoted or bare strings.
function topicsOf(path) {
  const front = readFileSync(path, "utf8").match(/^---\n([\s\S]*?)\n---/);
  if (!front) return [];
  const block = front[1].match(/^topics:\s*\n((?:\s+-\s+.*\n?)+)/m);
  if (!block) return [];
  return block[1]
    .split("\n")
    .map((line) => line.replace(/^\s+-\s+/, "").trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean)
    .map((topic) => topic.split("#")[0]);
}

const claimed = new Map();
for (const page of pages(root)) {
  for (const topic of topicsOf(page)) {
    if (claimed.has(topic)) {
      console.error(`topic ${topic} is claimed by ${claimed.get(topic)} and ${page}`);
      process.exit(1);
    }
    claimed.set(topic, page);
  }
}

const check = process.argv.indexOf("--check");
if (check === -1) {
  for (const topic of [...claimed.keys()].sort()) console.log(topic);
} else {
  const used = readFileSync(process.argv[check + 1], "utf8").split("\n").map((t) => t.trim()).filter(Boolean);
  const missing = used.filter((topic) => !claimed.has(topic));
  for (const topic of missing) console.log(`no page claims ${topic}`);
  if (missing.length) process.exit(1);
  console.log(`every one of the app's ${used.length} topics has a page`);
}
