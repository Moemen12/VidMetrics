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
import {
    calculatePostingCadence,
    analyzeViralHooks,
    calculateEngagementVelocity,
    calculateAudienceRetention,
    extractTrendingTags
} from "@/lib/utils";
import { generateStrategicSummary } from "@/app/actions/intelligence";
import { ChannelNotFoundError } from "@/lib/errors";
import { DashboardTab } from "@/lib/types";

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

    // --- Filtering and Sorting (Overview) ---
    let filteredVideos = [...rawLatestVideos];
    if (activeCategory) {
        filteredVideos = filteredVideos.filter(video =>
            video.title.toLowerCase().includes(activeCategory.toLowerCase()) ||
            (activeCategory === "Shorts" && video.duration.split(':').length === 1)
        );
    }

    if (activeSort === "Views") {
        filteredVideos.sort((a, b) => b.viewCount - a.viewCount);
    } else if (activeSort === "Date") {
        filteredVideos.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else {
        filteredVideos.sort((a, b) => {
            const scoreA = Number.parseFloat(a.outlierScore || "1.0");
            const scoreB = Number.parseFloat(b.outlierScore || "1.0");
            return scoreB - scoreA;
        });
    }

    // --- Dynamic Intelligence Calculations ---
    const allVideoTitles = rawLatestVideos.map(v => v.title);
    const allVideoDates = rawLatestVideos.map(v => v.publishedAt);
    const allViewCounts = rawLatestVideos.map(v => v.viewCount);

    // Parse subscribers for formula calculation
    const multiplierMap: Record<string, string> = {
        K: '000',
        M: '000000',
        B: '000000000',
    };

    const subStr = profile.subscribers
        .replaceAll(/[KMB]/g, m => multiplierMap[m] ?? '')
        .replaceAll('.', '');
    const subCount = Number(subStr) || 1000000;

    const intelligence = {
        postingCadence: calculatePostingCadence(allVideoDates),
        viralHookStrength: analyzeViralHooks(allVideoTitles),
        engagementVelocity: calculateEngagementVelocity(allViewCounts, subCount),
        audienceRetention: calculateAudienceRetention(rawLatestVideos),
        trendingTags: extractTrendingTags(rawLatestVideos, profile.name),
    };

    const strategicSummary = await generateStrategicSummary(
        profile.name,
        intelligence.trendingTags.map(t => t.tag),
        intelligence.postingCadence
    );

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
                    videoData={filteredVideos}
                />

                {activeTab === "overview" && (
                    <div className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard label="Total Uploads" value={profile.videoCount} subValue="Videos on channel" />
                            <StatCard label="Lifetime Views" value={profile.totalViews} subValue="Total reach" trend="Live" />
                            <StatCard variant="outlier" Icon={Sparkles} label="Recent Upload" value={filteredVideos[0]?.title || "N/A"} subValue={filteredVideos[0] ? `${filteredVideos[0].views} views` : "Scanning..."} />
                        </div>
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <ControlBar />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {filteredVideos.map((video) => (
                                    <VideoCard key={video.id} {...video} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "competitors" && (
                    <div className="space-y-10 animate-in fade-in duration-500">
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
                        channelName={profile.name}
                        {...intelligence}
                        strategicSummary={strategicSummary}
                    />
                )}
            </main>
        </div>
    );
}