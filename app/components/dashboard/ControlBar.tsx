import { Filter } from "lucide-react";

export default function ControlBar() {
    const sortOptions = ["Virality", "Views", "Date"] as const;

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold tracking-tight text-on-surface">Video Intelligence</h2>

            <div className="flex items-center gap-2 w-full">
                {/* Scrollable Sort Container */}
                <div className="flex-1 overflow-x-auto no-scrollbar">
                    <div className="flex bg-surface-container-high p-1 rounded-xl border border-outline-variant w-max md:w-full min-w-full">
                        {sortOptions.map((option, i) => (
                            <button
                                key={option}
                                className={`flex-1 px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap rounded-lg ${i === 0
                                        ? 'text-on-primary bg-primary shadow-sm'
                                        : 'text-on-surface-variant hover:text-on-surface'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Fixed Category Button */}
                <button className="shrink-0 flex items-center gap-2 bg-surface-container-high px-4 py-2.5 rounded-xl border border-outline-variant text-sm font-medium hover:bg-surface-bright transition-colors cursor-pointer text-on-surface">
                    <Filter className="w-4 h-4" />
                    <span className="hidden xs:inline">Category</span>
                </button>
            </div>
        </div>
    );
}
