import { getCollection } from "astro:content";

/** Where a topic leads: a page, by its path under its language, and a heading on it. */
export interface Claim {
  topic: string;
  page: string;
  anchor?: string;
  claimedBy: string;
}

/**
 * Every topic the English pages claim, each with the page that claims it. Two pages
 * claiming one topic fail the build, so a topic always has one place to go.
 */
export async function claims(): Promise<Claim[]> {
  const pages = await getCollection("docs", (entry) => entry.id.startsWith("en/") || entry.id === "en");
  const found = new Map<string, Claim>();
  for (const entry of pages) {
    for (const claimed of entry.data.topics ?? []) {
      const [topic, anchor] = claimed.split("#");
      const other = found.get(topic);
      if (other) {
        throw new Error(`topic "${topic}" is claimed by ${other.claimedBy} and ${entry.id}`);
      }
      const page = entry.id === "en" ? "" : entry.id.replace(/^en\//, "");
      found.set(topic, { topic, page, anchor, claimedBy: entry.id });
    }
  }
  return [...found.values()].sort((a, b) => a.topic.localeCompare(b.topic));
}
