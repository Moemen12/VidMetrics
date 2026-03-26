import { TrendingUp, Zap } from "lucide-react";

const STATS = [
    {
        Icon: Zap,
        label: "Real-time Data",
        delay: "0s"
    },
    {
        Icon: TrendingUp,
        label: "Virality Scores",
        delay: "0.2s"
    },
] as const;

export default function FooterStats() {
    return (
        <div className="pt-12 flex justify-center gap-12 border-t border-white/5">
            {STATS.map(({ Icon, label, delay }) => (
                <div
                    key={label}
                    className="flex items-center gap-2 animate-fade-in-up opacity-0"
                    style={{ animationDelay: delay }}
                >
                    {/* Icon with a soft pulse-glow */}
                    <div className="relative">
                        <Icon
                            className="w-4 h-4 text-primary/80"
                            strokeWidth={2}
                        />
                        <div className="absolute inset-0 bg-primary/20 blur-sm animate-pulse rounded-full" />
                    </div>

                    {/* Gradient animated text */}
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] animate-gradient-text">
                        {label}
                    </span>
                </div>
            ))}
        </div>
    );
}