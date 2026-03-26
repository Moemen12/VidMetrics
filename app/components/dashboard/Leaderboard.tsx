import { Rocket } from "lucide-react";
import { type VideoItem } from "@/lib/youtube";

interface LeaderboardProps {
    readonly videos: ReadonlyArray<VideoItem>;
}

export default function Leaderboard({ videos }: Readonly<LeaderboardProps>) {
    if (videos.length === 0) return null;

    return (
        <div className="bg-surface-container rounded-2xl border border-outline-variant p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg tracking-tight">High Velocity</h3>
                <span className="text-[10px] font-black uppercase text-on-surface-variant tracking-tighter">Niche Ranking</span>
            </div>

            <div className="space-y-4">
                {videos.map((v, i) => (
                    <div key={v.id} className="flex items-center gap-4 group">
                        <span className="text-xl font-black text-primary transition-colors italic w-6">#{i + 1}</span>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">{v.title}</p>
                            <p className="text-[10px] font-medium text-on-surface-variant">{v.channel}</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-xs font-black text-primary flex items-center gap-1">
                                <Rocket className="w-3 h-3 fill-current" />
                                {v.outlierScore}
                            </span>
                            <span className="text-[10px] font-bold text-on-surface-variant">Trending</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}