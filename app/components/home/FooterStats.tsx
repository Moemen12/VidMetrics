import { TrendingUp, Zap } from "lucide-react";

const STATS = [
    { Icon: Zap, label: "Real-time Data" },
    { Icon: TrendingUp, label: "Virality Scores" },
] as const;

export default function FooterStats() {
    return (
        <div className="pt-12 flex justify-center gap-12 border-t border-white/5 opacity-40">
            {STATS.map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" strokeWidth={2} />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">
                        {label}
                    </span>
                </div>
            ))}
        </div>
    );
}
