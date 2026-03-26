"use client";

import { Search, Loader2 } from "lucide-react";
import { analyzeChannel } from "@/app/actions";
import { useTransition } from "react";

export default function SearchForm() {
    const [isPending, startTransition] = useTransition();

    async function handleAction(formData: FormData) {
        startTransition(async () => {
            await analyzeChannel(formData);
        });
    }

    return (
        <div className={`max-w-xl mx-auto space-y-6 transition-opacity duration-300 ${isPending ? 'opacity-70 pointer-events-none' : ''}`}>
            <form
                action={handleAction}
                className="relative group input-focus-glow transition-all duration-300 rounded-2xl"
            >
                <input
                    name="handle"
                    required
                    className="w-full bg-[#1c1b1d] border-2 border-[#3d4a3d]/40 rounded-2xl py-6 pl-14 pr-36 text-lg focus:ring-0 focus:outline-none focus:border-primary transition-all placeholder:text-[#bccbb9]/30 text-[#e5e1e4]"
                    placeholder="Enter channel handle (e.g. @mkbhd)"
                    type="text"
                    disabled={isPending}
                />

                {isPending ? (
                    <Loader2 className="absolute left-5 top-1/2 -translate-y-1/2 text-primary w-5 h-5 animate-spin" />
                ) : (
                    <Search
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-[#bccbb9]/50 w-5 h-5"
                        strokeWidth={2}
                    />
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#4be277] text-[#003915] font-bold px-8 py-3.5 rounded-xl hover:bg-[#5cf58a] active:scale-95 transition-all shadow-lg shadow-[#4be277]/10 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                    {isPending ? 'Analyzing' : 'Analyze'}
                </button>
            </form>

            <QuickLinks isPending={isPending} onAction={handleAction} />
        </div>
    );
}

const QUICK_HANDLES = ["@MrBeast", "@Veritasium", "@AliAbdaal"] as const;

interface QuickLinksProps {
    readonly isPending: boolean;
    readonly onAction: (fd: FormData) => void;
}

function QuickLinks({ isPending, onAction }: Readonly<QuickLinksProps>) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3d4a3d]">
                Try these:
            </span>
            {QUICK_HANDLES.map((handle) => (
                <form key={handle} action={onAction}>
                    <input type="hidden" name="handle" value={handle} />
                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-3 py-1.5 rounded-full bg-[#1c1b1d] border border-[#3d4a3d]/30 text-xs font-semibold hover:border-[#4be277]/50 hover:text-[#4be277] transition-colors text-[#e5e1e4] cursor-pointer disabled:opacity-50"
                    >
                        {handle}
                    </button>
                </form>
            ))}
        </div>
    );
}
