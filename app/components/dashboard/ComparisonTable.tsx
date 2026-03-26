import { type CompetitorData } from "@/lib/youtube";

interface ComparisonTableProps {
    readonly competitors: ReadonlyArray<CompetitorData>;
}

export default function ComparisonTable({ competitors }: Readonly<ComparisonTableProps>) {
    if (competitors.length === 0) return <div className="p-10 bg-surface-container rounded-2xl border border-outline-variant italic text-on-surface-variant text-center">No significant market competitors detected for this channel.</div>;

    const rowLabels: ReadonlyArray<{ key: keyof CompetitorData; label: string }> = [
        { key: 'subscribers', label: 'Subscribers' },
        { key: 'views', label: 'Total Views' },
        { key: 'engagement', label: 'Engagement' }
    ] as const;

    return (
        <div className="bg-surface-container rounded-2xl border border-outline-variant overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
                <h3 className="font-semibold text-lg tracking-tight">Market Comparison</h3>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">Dynamic Benchmarks</span>
            </div>
            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-container-highest/20 text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">
                            <th className="px-6 py-4">Metric</th>
                            {competitors.map((c) => (
                                <th key={c.name} className="px-6 py-4 text-on-surface">{c.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                        {rowLabels.map((row) => (
                            <tr key={row.key} className="group hover:bg-surface-container-high/50 transition-colors">
                                <td className="px-6 py-5 text-sm font-medium text-on-surface-variant">{row.label}</td>
                                {competitors.map((c) => (
                                    <td key={c.name} className="px-6 py-5 text-lg font-bold text-on-surface group-first:text-primary">
                                        {c[row.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}