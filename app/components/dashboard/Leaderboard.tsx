import { Rocket } from "lucide-react";

export default function Leaderboard() {
    const videos = [
        { title: "I Built a Real Laser...", channel: "MrBeast", score: "4.2x", views: "142M" },
        { title: "Apple Vision Pro Review", channel: "MKBHD", score: "3.2x", views: "12M" },
        { title: "Why Most Apps Fail", channel: "Veritasium", score: "2.8x", views: "8.4M" },
        { title: "M3 Max Review", channel: "MKBHD", score: "1.9x", views: "3.1M" },
        { title: "Spending 100 Holes...", channel: "MrBeast", score: "1.5x", views: "88M" }
    ];

    return (
        <div className="bg-surface-container rounded-2xl border border-outline-variant p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg tracking-tight">&apos;Crushing It&apos;</h3>
                <span className="text-[10px] font-black uppercase text-on-surface-variant tracking-tighter">Leaderboard</span>
            </div>

            <div className="space-y-4">
                {videos.map((v, i) => (
                    <div key={v.title} className="flex items-center gap-4 group">
                        <span className="text-xl font-black text-outline-variant/30 group-hover:text-primary transition-colors italic w-6">#{i + 1}</span>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">{v.title}</p>
                            <p className="text-[10px] font-medium text-on-surface-variant">{v.channel}</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-xs font-black text-primary flex items-center gap-1">
                                <Rocket className="w-3 h-3 fill-current" />
                                {v.score}
                            </span>
                            <span className="text-[10px] font-bold text-on-surface-variant">{v.views}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
