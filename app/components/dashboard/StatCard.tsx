import { LucideIcon } from "lucide-react";

interface StatCardProps {
    readonly label: string;
    readonly value: string;
    readonly subValue: string;
    readonly trend?: string;
    readonly Icon?: LucideIcon;
    readonly variant?: 'default' | 'outlier';
}

export default function StatCard({ label, value, subValue, trend, Icon, variant = 'default' }: Readonly<StatCardProps>) {
    if (variant === 'outlier') {
        return (
            <div className="bg-surface-container rounded-xl p-6 border border-outline-variant flex flex-col justify-between h-40 bg-linear-to-br from-surface-container to-surface-container-high border-l-4 border-l-primary transition-all hover:scale-[1.02]">
                <div className="flex justify-between items-start">
                    <span className="text-xs uppercase tracking-widest text-primary font-bold">{label}</span>
                    {Icon && <Icon className="text-primary w-5 h-5" />}
                </div>
                <div>
                    <div className="text-lg font-semibold tracking-tight leading-tight text-on-surface line-clamp-2">{value}</div>
                    <div className="text-sm text-on-surface-variant mt-1 font-medium italic">{subValue}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-surface-container rounded-xl p-6 border border-outline-variant flex flex-col justify-between h-40 transition-all hover:bg-surface-container-high">
            <div className="flex justify-between items-start">
                <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">{label}</span>
                {trend && (
                    <span className="text-primary bg-primary/10 px-2 py-1 rounded text-xs font-bold">{trend}</span>
                )}
            </div>
            <div>
                <div className="text-3xl sm:text-4xl font-semibold tracking-tighter text-on-surface">{value}</div>
                <div className="text-sm text-on-surface-variant mt-1">{subValue}</div>
            </div>
        </div>
    );
}
