import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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


export async function extractHashtags(titles: string[]) {
  const regex = /#\w+/g;
  const tags = titles.flatMap(title => title.match(regex) || []);
  const counts = tags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return Object.entries(counts).map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count);
}

export async function calculatePostingCadence(dates: string[]) {
  if (dates.length < 2) return "Irregular Posting";
  const sorted = dates.map(d => new Date(d).getTime()).sort((a, b) => b - a);
  const diffs = [];
  for (let i = 0; i < sorted.length - 1; i++) diffs.push(sorted[i] - sorted[i + 1]);
  const avgDays = (diffs.reduce((a, b) => a + b, 0) / diffs.length) / (1000 * 60 * 60 * 24);
  return `Posts every ${avgDays.toFixed(1)} days`;
}