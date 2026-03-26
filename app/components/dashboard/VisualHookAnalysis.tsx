"use client";

import { MessageSquareText, ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type ShortItem } from "@/lib/youtube";

interface VisualHookAnalysisProps {
    readonly shorts: ShortItem[];
}

export default function VisualHookAnalysis({ shorts }: Readonly<VisualHookAnalysisProps>) {
    // Skeleton UI
    if (shorts.length === 0) {
        return (
            <div className="bg-surface-container rounded-2xl border border-outline-variant p-6 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-outline-variant/30 animate-pulse rounded" />
                    <div className="w-48 h-6 bg-outline-variant/30 animate-pulse rounded" />
                </div>
                <div className="flex gap-4 overflow-hidden">
                    {[1, 2, 3, 4].map(i => (
                        <div key={`skeleton-initial-${i}`} className="flex-none w-45 aspect-9/16 bg-outline-variant/20 animate-pulse rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-surface-container rounded-2xl border border-outline-variant p-6 space-y-6 overflow-hidden transition-all duration-500">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-lg tracking-tight">Shorts Performance Analysis</h3>
                </div>
                <MessageSquareText className="w-5 h-5 text-on-surface-variant/50" />
            </div>

            <div className="space-y-6">
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2 snap-x">
                    {shorts.map((short) => (
                        <Link
                            key={short.id}
                            href={`https://youtube.com/shorts/${short.id}`}
                            target="_blank"
                            className="flex-none w-45 snap-start group"
                        >
                            <div className="space-y-3">
                                <div className="relative aspect-9/16 rounded-xl overflow-hidden border border-outline-variant/30 group-hover:border-primary/50 transition-all shadow-lg">
                                    <Image
                                        src={short.thumbnailUrl}
                                        alt={short.title}
                                        fill
                                        sizes="180px"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-60" />
                                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
                                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">{short.views} Views</span>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-black shadow-glow-md">
                                            <ExternalLink className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1 px-1">
                                    <p className="text-[11px] font-bold text-on-surface line-clamp-2 leading-relaxed h-8.5 group-hover:text-primary transition-colors">
                                        {short.title}
                                    </p>
                                    <div className="flex items-center justify-between pt-1 border-t border-outline-variant/10">
                                        <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">Proxy CTR</span>
                                        <span className="text-[9px] font-black text-primary uppercase">High</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
