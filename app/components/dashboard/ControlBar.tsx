"use client";

import { Filter } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function ControlBar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentSort = searchParams.get("sort") || "Virality";
    const sortOptions = ["Virality", "Views", "Date"] as const;

    const handleSort = (option: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("sort", option);
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleCategoryClick = () => {
        // Just demonstrating functionality for now, could be a dropdown later
        const params = new URLSearchParams(searchParams);
        const categories = ["Tutorials", "Reviews", "Vlogs", "Shorts"];
        const currentCategory = params.get("category") || "All";
        const nextIndex = (categories.indexOf(currentCategory) + 1) % (categories.length + 1);
        const nextCategory = nextIndex === 0 ? "" : categories[nextIndex - 1];

        if (nextCategory) {
            params.set("category", nextCategory);
        } else {
            params.delete("category");
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    const activeCategory = searchParams.get("category");

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold tracking-tight text-on-surface">Video Intelligence</h2>

            <div className="flex items-center gap-2 w-full">
                {/* Scrollable Sort Container */}
                <div className="flex-1 overflow-x-auto no-scrollbar">
                    <div className="flex bg-surface-container-high p-1 rounded-xl border border-outline-variant w-max md:w-full min-w-full">
                        {sortOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleSort(option)}
                                className={`flex-1 px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap rounded-lg ${currentSort === option
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
                <button
                    onClick={handleCategoryClick}
                    className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant text-sm font-medium transition-colors cursor-pointer ${activeCategory
                        ? 'bg-primary/10 border-primary/50 text-primary'
                        : 'bg-surface-container-high hover:bg-surface-bright text-on-surface'
                        }`}
                >
                    <Filter className="w-4 h-4" />
                    <span className="hidden xs:inline">{activeCategory || "Category"}</span>
                </button>
            </div>
        </div>
    );
}
