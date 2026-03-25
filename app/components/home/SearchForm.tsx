"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm() {
    const router = useRouter();
    const [handle, setHandle] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!handle.trim()) return;
        router.push(`/loading?channel=${encodeURIComponent(handle.trim())}`);
    }

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <form
                onSubmit={handleSubmit}
                className="relative group input-focus-glow transition-all duration-300 rounded-2xl"
            >
                <input
                    required
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full bg-[#1c1b1d] border-2 border-[#3d4a3d]/40 rounded-2xl py-6 pl-14 pr-36 text-lg focus:ring-0 focus:outline-none focus:border-primary transition-all placeholder:text-[#bccbb9]/30 text-[#e5e1e4]"
                    placeholder="Enter channel handle (e.g. @mkbhd)"
                    type="text"
                />

                <Search
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-[#bccbb9]/50 w-5 h-5"
                    strokeWidth={2}
                />

                <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#4be277] text-[#003915] font-bold px-8 py-3.5 rounded-xl hover:bg-[#5cf58a] active:scale-95 transition-all shadow-lg shadow-[#4be277]/10 cursor-pointer"
                >
                    Analyze
                </button>
            </form>

            <QuickLinks />
        </div>
    );
}

const QUICK_HANDLES = ["@MrBeast", "@Veritasium", "@AliAbdaal"] as const;

function QuickLinks() {
    const router = useRouter();
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3d4a3d]">
                Try these:
            </span>
            {QUICK_HANDLES.map((handle) => (
                <button
                    key={handle}
                    onClick={() =>
                        router.push(`/loading?channel=${encodeURIComponent(handle)}`)
                    }
                    className="px-3 py-1.5 rounded-full bg-[#1c1b1d] border border-[#3d4a3d]/30 text-xs font-semibold hover:border-[#4be277]/50 hover:text-[#4be277] transition-colors text-[#e5e1e4] cursor-pointer"
                >
                    {handle}
                </button>
            ))}
        </div>
    );
}
