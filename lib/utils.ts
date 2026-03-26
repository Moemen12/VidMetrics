import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { StatusLabel, VideoItem } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatViews(views: string | number) {
  const n = typeof views === 'string' ? Number.parseInt(views) : views;
  if (Number.isNaN(n)) return "0";
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}

/**
 * Calculate the average gap in days between uploads and return a cadence label.
 */
export function calculatePostingCadence(dates: string[]): string {
  if (dates.length < 2) return "Irregular Posting";

  const sorted = dates.map(d => new Date(d).getTime()).sort((a, b) => b - a);
  const diffs: number[] = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    diffs.push(sorted[i] - sorted[i + 1]);
  }

  const avgMs = diffs.reduce((a, b) => a + b, 0) / diffs.length;
  const avgDays = avgMs / (1000 * 60 * 60 * 24);

  if (avgDays < 2) return "Daily";
  if (avgDays <= 5) return "2-3x Weekly";
  if (avgDays <= 8) return "Weekly";
  return "Monthly";
}

/**
 * 2. For "Viral Hooks" (Pattern Recognition)
 * Analyzes titles for Question, Negativity, Listicles, and Authority.
 */
export function analyzeViralHooks(titles: string[]): number {
  if (titles.length === 0) return 0;

  const patterns = {
    questions: /\?/,
    negativity: /\b(Stop|Don't|Mistake|Wrong|Never|Avoid)\b/i,
    listicles: /^\d+/,
    authority: /\b(How to|Secret|Guide|Ultimate|Hack)\b/i
  };

  let hits = 0;
  titles.forEach(title => {
    const matches = Object.values(patterns).some(regex => regex.test(title));
    if (matches) hits++;
  });

  return Math.round((hits / titles.length) * 100);
}

/**
 * 3. For "Engagement Velocity" (Growth Score)
 * (Average views of last 5 videos / Total subscribers) * 100
 */
export function calculateEngagementVelocity(viewCounts: number[], subscriberCount: number): { score: number, label: StatusLabel } {
  if (subscriberCount === 0 || viewCounts.length === 0) return { score: 0, label: "Stable" };

  const last5 = viewCounts.slice(0, 5);
  const avgViews = last5.reduce((a, b) => a + b, 0) / last5.length;

  const velocity = (avgViews / subscriberCount) * 100;

  let label: StatusLabel = "Stable";
  if (velocity > 20) label = "Dominant";
  else if (velocity >= 10) label = "Optimal";

  return { score: Math.round(velocity * 10) / 10, label }; // Keep one decimal for score
}

/**
 * Optional: Audience Retention Heuristic
 * Based on engagement-to-view ratio as a proxy.
 */
export function calculateAudienceRetention(videos: VideoItem[]): { score: number, label: StatusLabel } {
  if (videos.length === 0) return { score: 0, label: "Stable" };

  const ratios = videos.map(v => {
    const views = v.viewCount || 1;

    const multiplierMap: Record<string, string> = {
      K: '000',
      M: '000000',
      B: '000000000',
    };

    const normalizedLikes = v.likes.replaceAll(/[KMB]/g, m => multiplierMap[m] ?? '');
    const likes = Number.parseFloat(normalizedLikes) || 0;

    return (likes / views) * 100;
  });
  const avgRatio = ratios.reduce((a, b) => a + b, 0) / ratios.length;
  const score = Math.min(Math.round(avgRatio * 20), 100); // Scale to 100

  let label: StatusLabel = "Stable";
  if (score > 75) label = "Dominant";
  else if (score >= 40) label = "Optimal";

  return { score, label };
}

/**
 * Extract and cluster tags from video objects, excluding the channel name.
 */
export function extractTrendingTags(videos: VideoItem[], channelName: string): { tag: string, count: number }[] {
  const allTags = videos.flatMap(v => v.tags || []);
  const excluded = channelName.toLowerCase().split(' ');

  const counts = allTags.reduce((acc, tag) => {
    const lowerTag = tag.toLowerCase();
    if (excluded.some(ex => lowerTag.includes(ex))) return acc;
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}