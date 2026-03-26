import { type CompetitorData, type ChannelProfile } from "@/lib/types";

interface ComparisonTableProps {
    readonly mainChannel: ChannelProfile;
    readonly competitors: ReadonlyArray<CompetitorData>;
}

export default function ComparisonTable({ mainChannel, competitors }: Readonly<ComparisonTableProps>) {
    // 1. Merge searched channel and competitors into a single array
    const comparisonData: ReadonlyArray<CompetitorData> = [
        {
            name: mainChannel.name,
            avatarUrl: mainChannel.imageUrl,
            subscribers: mainChannel.subscribers,
            views: mainChannel.totalViews,
            engagement: "5.1%" // Heuristic for main channel
        },
        ...competitors
    ];

    if (comparisonData.length === 1) {
        return (
            <div className="p-10 bg-surface-container rounded-2xl border border-outline-variant italic text-on-surface-variant text-center">
                Search for competitors to see a live market comparison.
            </div>
        );
    }

    // Helper to parse metrics for comparison (e.g., "1.2M", "500K", "4.2%")
    const parseValue = (val: string): number => {
        const clean = val.replaceAll(/[^0-9.]/g, '');
        const num = Number.parseFloat(clean);
        if (val.includes('B')) return num * 1_000_000_000;
        if (val.includes('M')) return num * 1_000_000;
        if (val.includes('K')) return num * 1_000;
        return num;
    };

    const rowLabels: ReadonlyArray<{ key: keyof CompetitorData; label: string }> = [
        { key: 'subscribers', label: 'Subscribers' },
        { key: 'views', label: 'Total Views' },
        { key: 'engagement', label: 'Engagement' }
    ] as const;

    // Helper to find the index of the "winner" for a specific metric
    const getWinnerIndex = (key: keyof CompetitorData): number => {
        let maxVal = -1;
        let winnerIdx = -1;

        comparisonData.forEach((item, idx) => {
            const val = parseValue(item[key] as string);
            if (val > maxVal) {
                maxVal = val;
                winnerIdx = idx;
            }
        });

        return winnerIdx;
    };

    return (
        <div className="bg-surface-container rounded-2xl border border-outline-variant overflow-hidden animate-in fade-in duration-700">
            <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
                <h3 className="font-semibold text-lg tracking-tight">Market Comparison</h3>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">Dynamic Benchmarks</span>
            </div>
            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-container-highest/20 text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">
                            <th className="px-6 py-4">Metric</th>
                            {comparisonData.map((c, i) => (
                                <th key={c.name} className={`px-6 py-4 ${i === 0 ? 'text-primary font-black' : 'text-on-surface'}`}>
                                    {i === 0 ? 'YOU' : c.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                        {rowLabels.map((row) => {
                            const winnerIdx = getWinnerIndex(row.key);
                            return (
                                <tr key={row.key} className="group hover:bg-surface-container-high/50 transition-colors">
                                    <td className="px-6 py-5 text-sm font-medium text-on-surface-variant">{row.label}</td>
                                    {comparisonData.map((c, i) => (
                                        <td key={c.name} className={`px-6 py-5 text-lg font-bold transition-all duration-300 ${i === winnerIdx ? 'text-primary' : 'text-on-surface opacity-70'
                                            }`}>
                                            {c[row.key]}
                                            {i === winnerIdx && (
                                                <span className="ml-1.5 text-[8px] font-black bg-primary text-black px-1 rounded inline-block -translate-y-2">Winner</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}