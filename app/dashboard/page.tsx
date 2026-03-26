import TopAppBar from "../components/dashboard/TopAppBar";
import Sidebar from "../components/dashboard/Sidebar";
import BottomNav from "../components/dashboard/BottomNav";
import ChannelProfile from "../components/dashboard/ChannelProfile";
import StatCard from "../components/dashboard/StatCard";
import ControlBar from "../components/dashboard/ControlBar";
import VideoCard from "../components/dashboard/VideoCard";
import CompetitorHeader from "../components/dashboard/CompetitorHeader";
import ComparisonTable from "../components/dashboard/ComparisonTable";
import Leaderboard from "../components/dashboard/Leaderboard";
import VisualHookAnalysis from "../components/dashboard/VisualHookAnalysis";
import IntelligenceView from "../components/dashboard/IntelligenceView";
import { Sparkles } from "lucide-react";
import { fetchShorts, fetchChannelStats, fetchLatestVideos, fetchCompetitors } from "@/lib/youtube";
import { calculatePostingCadence, extractHashtags } from "@/lib/utils";
import { ChannelNotFoundError } from "@/lib/errors";

export type DashboardTab = "overview" | "competitors" | "intelligence" | "settings";

interface PageProps {
    searchParams: Promise<{
        tab?: string;
        channel?: string;
        sort?: string;
        category?: string;
    }>;
}

export default async function DashboardPage({ searchParams }: Readonly<PageProps>) {
    const { tab, channel, sort, category } = await searchParams;
    const activeTab = (tab as DashboardTab) || "overview";
    const handle = channel || "@MKBHD";
    const activeSort = sort || "Virality";
    const activeCategory = category;

    const profile = await fetchChannelStats(handle);

    if (!profile) {
        throw new ChannelNotFoundError(handle);
    }

    const [shortsDataArray, rawLatestVideos, compData] = await Promise.all([
        fetchShorts(profile.shortsPlaylistId),
        fetchLatestVideos(profile.uploadsPlaylistId),
        fetchCompetitors(profile.name, profile.id)
    ]);

    // Apply Sorting and Filtering to Latest Videos
    let latestVideos = [...rawLatestVideos];

    // 1. Mock Category Filtering
    if (activeCategory) {
        latestVideos = latestVideos.filter(video =>
            video.title.toLowerCase().includes(activeCategory.toLowerCase()) ||
            (activeCategory === "Shorts" && video.duration.split(':').length === 1) // Simple heuristic
        );
    }

    // 2. Sorting
    if (activeSort === "Views") {
        latestVideos.sort((a, b) => b.viewCount - a.viewCount);
    } else if (activeSort === "Date") {
        latestVideos.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else {
        // Virality (by outlierScore) - simulated
        latestVideos.sort((a, b) => {
            const scoreA = Number.parseFloat(a.outlierScore || "1.0");
            const scoreB = Number.parseFloat(b.outlierScore || "1.0");
            return scoreB - scoreA;
        });
    }

    const trendingTags = await extractHashtags(shortsDataArray.items.map((s: { title: string }) => s.title));
    const postingCadence = await calculatePostingCadence(shortsDataArray.items.map((s: { publishedAt: string }) => s.publishedAt));

    return (
        <div className="bg-background text-on-surface min-h-screen">
            <TopAppBar />
            <Sidebar activeTab={activeTab} handle={handle} />
            <BottomNav activeTab={activeTab} handle={handle} />

            <main className="pt-24 pb-32 md:pb-12 px-6 max-w-7xl mx-auto md:pl-28 space-y-10">
                <ChannelProfile
                    name={profile.name}
                    subscribers={profile.subscribers}
                    category="Active Creator"
                    views30d={profile.totalViews}
                    imageUrl={profile.imageUrl}
                    videoData={latestVideos}
                />

                {activeTab === "overview" && (
                    <div className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard label="Total Uploads" value={profile.videoCount} subValue="Videos on channel" />
                            <StatCard label="Lifetime Views" value={profile.totalViews} subValue="Total reach" trend="Live" />
                            <StatCard variant="outlier" Icon={Sparkles} label="Recent Upload" value={latestVideos[0]?.title || "N/A"} subValue={latestVideos[0] ? `${latestVideos[0].views} views` : "Scanning..."} />
                        </div>
                        <div className="space-y-8">
                            <ControlBar />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {latestVideos.map((video: import("@/lib/youtube").VideoItem) => (
                                    <VideoCard key={video.id} {...video} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "competitors" && (
                    <div className="space-y-10">
                        <CompetitorHeader competitors={compData.competitors} />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <ComparisonTable competitors={compData.competitors} />
                                <VisualHookAnalysis
                                    shorts={shortsDataArray.items}
                                />
                            </div>
                            <Leaderboard videos={compData.topVideos} />
                        </div>
                    </div>
                )}

                {activeTab === "intelligence" && (
                    <IntelligenceView
                        trendingTags={trendingTags}
                        postingCadence={postingCadence}
                        channelName={profile.name}
                    />
                )}
            </main>
        </div>
    );
}