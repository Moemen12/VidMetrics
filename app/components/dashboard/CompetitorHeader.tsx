import { type CompetitorData } from "@/lib/youtube";
import Image from "next/image";
import Link from "next/link";

interface CompetitorHeaderProps {
    readonly competitors: ReadonlyArray<CompetitorData>;
}

export default function CompetitorHeader({ competitors }: Readonly<CompetitorHeaderProps>) {
    if (competitors.length === 0) return null;

    return (
        <div className="bg-surface-container-low p-4 sm:p-6 rounded-2xl border border-outline-variant shadow-xl w-full">
            <div className="flex items-center justify-center gap-2 sm:gap-8 max-w-2xl mx-auto overflow-hidden">
                {competitors.map((comp, i) => (
                    <div key={comp.name} className="flex items-center gap-2 sm:gap-8">
                        <Link
                            href={`/dashboard?tab=competitors&channel=${encodeURIComponent(comp.name)}`}
                            className="flex flex-col items-center gap-2 group cursor-pointer transition-all duration-300"
                        >
                            <div className={`relative w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-full border-2 border-outline-variant hover:border-primary transition-colors`}>
                                <Image
                                    src={comp.avatarUrl}
                                    alt={comp.name}
                                    fill
                                    sizes="(max-width: 640px) 48px, 64px"
                                    className="rounded-full object-cover transition-all"
                                />
                            </div>
                            <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors text-center w-full">
                                {comp.name}
                            </span>
                        </Link>

                        {i < competitors.length - 1 && (
                            <span className="text-sm sm:text-xl font-black italic text-white shrink-0">Vs.</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
