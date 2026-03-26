"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home, Play } from "lucide-react";
import Link from "next/link";
import { logErrorAction } from "@/app/actions/system";

interface DashboardErrorProps {
    readonly error: Error & { digest?: string; code?: string };
    readonly reset: () => void;
}

export default function DashboardErrorBoundary({
    error,
    reset,
}: DashboardErrorProps) {
    useEffect(() => {
        logErrorAction({
            message: error.message,
            stack: error.stack?.split('\n')[0],
            digest: error.digest,
            code: error.code
        }, "Dashboard Segment Boundary");
    }, [error]);

    const isQuotaError = error.message?.toLowerCase().includes("quota") || error.code === "QUOTA_EXCEEDED";
    const isNotFound = error.message?.toLowerCase().includes("not found") || error.code === "CHANNEL_NOT_FOUND";

    let title = "Something went wrong";
    let description = "An unexpected error occurred while fetching dashboard data. Our team has been notified.";

    if (isQuotaError) {
        title = "API Limit Reached";
        description = "YouTube API quota exceeded. This usually resets every 24 hours. Consider using a different API key or trying again later.";
    } else if (isNotFound) {
        title = "Channel Not Found";
        description = "We couldn't find the YouTube channel you're looking for. Please check the handle and try again.";
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background text-on-surface">
            <div className="max-w-md w-full bg-surface-container-low rounded-3xl border border-outline-variant p-8 shadow-2xl text-center space-y-6">
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center">
                        <AlertCircle className="w-10 h-10 text-error" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight text-on-surface">
                        {title}
                    </h2>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="flex flex-col gap-3 pt-4">
                    <button
                        onClick={() => reset()}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-error text-on-error rounded-xl font-bold uppercase tracking-wider hover:bg-error/90 transition-all cursor-pointer shadow-lg shadow-error/20"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-surface-container-high text-on-surface rounded-xl font-bold uppercase tracking-wider hover:bg-surface-bright transition-all border border-outline-variant"
                    >
                        <Home className="w-4 h-4" />
                        Back to Search
                    </Link>

                    {isQuotaError && (
                        <a
                            href="https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest"
                        >
                            <Play className="w-3.5 h-3.5 text-error" />
                            Check Quota Console
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
