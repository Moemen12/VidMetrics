export default function DashboardLoading() {
    return (
        <div className="bg-background text-on-surface min-h-screen">
            <div className="h-16 border-b border-outline-variant bg-surface animate-pulse" />
            <div className="hidden md:block fixed left-0 top-16 h-full w-20 border-r border-outline-variant bg-surface animate-pulse" />

            <main className="pt-24 pb-32 md:pb-12 px-6 max-w-7xl mx-auto md:pl-28 space-y-10">
                {/* Profile Skeleton */}
                <div className="bg-surface-container rounded-xl h-48 w-full animate-pulse border border-outline-variant" />

                <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-surface-container rounded-2xl h-32 animate-pulse border border-outline-variant" />
                        <div className="bg-surface-container rounded-2xl h-32 animate-pulse border border-outline-variant" />
                        <div className="bg-surface-container rounded-2xl h-32 animate-pulse border border-outline-variant" />
                    </div>

                    <div className="bg-surface-container rounded-2xl h-96 animate-pulse border border-outline-variant" />

                    <div className="space-y-6">
                        <div className="flex gap-4 overflow-hidden -mx-2 px-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={`skeleton-loading-${i}`} className="flex-none w-45 aspect-9/16 bg-outline-variant/10 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
