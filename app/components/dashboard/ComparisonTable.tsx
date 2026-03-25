export default function ComparisonTable() {
    const metrics = [
        { label: "Monthly Views", mkbhd: "148M", beast: "1.2B", veritasium: "84M" },
        { label: "Avg. Engagement", mkbhd: "8.42%", beast: "11.2%", veritasium: "9.1%" },
        { label: "Outlier Frequency", mkbhd: "12%", beast: "42%", veritasium: "8%" },
    ];

    return (
        <div className="bg-surface-container rounded-2xl border border-outline-variant overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
                <h3 className="font-semibold text-lg tracking-tight">Strategy Comparison</h3>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">Real-time</span>
            </div>
            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-container-highest/20 text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">
                            <th className="px-6 py-4">Metric</th>
                            <th className="px-6 py-4 text-primary">MKBHD</th>
                            <th className="px-6 py-4">MrBeast</th>
                            <th className="px-6 py-4">Veritasium</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                        {metrics.map((m) => (
                            <tr key={m.label} className="group hover:bg-surface-container-high/50 transition-colors">
                                <td className="px-6 py-5 text-sm font-medium text-on-surface-variant">{m.label}</td>
                                <td className="px-6 py-5 text-lg font-bold text-primary">{m.mkbhd}</td>
                                <td className="px-6 py-5 text-lg font-bold text-on-surface">{m.beast}</td>
                                <td className="px-6 py-5 text-lg font-bold text-on-surface">{m.veritasium}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
