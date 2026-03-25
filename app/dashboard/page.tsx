"use client";

import { useState } from "react";
import TopAppBar from "../components/dashboard/TopAppBar";
import Sidebar from "../components/dashboard/Sidebar";
import BottomNav from "../components/dashboard/BottomNav";
import ChannelProfile from "../components/dashboard/ChannelProfile";
import StatCard from "../components/dashboard/StatCard";
import ControlBar from "../components/dashboard/ControlBar";
import VideoCard from "../components/dashboard/VideoCard";
import { Sparkles } from "lucide-react";
import CompetitorHeader from "../components/dashboard/CompetitorHeader";
import Leaderboard from "../components/dashboard/Leaderboard";
import ComparisonTable from "../components/dashboard/ComparisonTable";
import VisualHookAnalysis from "../components/dashboard/VisualHookAnalysis";

export type DashboardTab = "overview" | "competitors" | "intelligence" | "settings";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<DashboardTab>("overview");

    const videoData = [
        {
            title: "The Future of Spatial Computing: Apple Vision Pro",
            views: "12.8M",
            likes: "842K",
            duration: "18:42",
            outlierScore: "2.4x",
            thumbnailUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvwAUH398cNIKxTouDU4QBc_ceDMhstwq02JFs-Vaq1OY_4L6cnCklEVK8Fdc7joxLmzEHTI4v2iXyfKZT_wmRNB512dhR6fHW1BDmFSgmZu1vaFdw8BIdRtSxdGbmgrSGcc8YRzv9A5TdCv2_UaOmrJsaLZAkTqZonQXi0zAu8G5EuGNcxjfPVbkTibGCrtQE_FPoHHqrbw-amcAlZBSlKkqSB9ljz3M7C9xtR_CEqTPKmZ0dkWe85wUm7BRcUrMyLoxoueBeWubW"
        },
        {
            title: "Why Everyone is Switching to Linux in 2024",
            views: "4.2M",
            likes: "310K",
            duration: "12:15",
            thumbnailUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUdplhTKSNdZr6ZiEEhglNnJ5PL4P3jVCM142tSWVRDUvDnKP_hBwyTsOU8HfDFP-MJEXtw4QO5S03cLyGtUsH28vQKlsfFTyuTcUvy2YyUUt1mb0nafa_g0oAWrJpKx8QXPDm2CdaA9pGWgDWtgt5ux9T-JkYucK7L2snY4AmBVInc3EIbkZoLi6AKEwEtbnfGdEd9RJsYeKtRJlHfemUxgWy0XknrGXUF0Hx4VJP22m_BMfFIoQfJKzIQeyOumEeGe_oPHvBaop0"
        }
    ];

    return (
        <div className="bg-background text-on-surface min-h-screen">
            <TopAppBar />
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

            <main className="pt-24 pb-32 md:pb-12 px-6 max-w-7xl mx-auto md:pl-28 space-y-10">
                {/* We keep the profile context for all views */}
                <ChannelProfile
                    name="Marques Brownlee"
                    subscribers="18.2M"
                    category="Tech Enthusiast"
                    views30d="42.5M"
                    imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDkBRfVhXIFJqlR1JZA8lZ46-I9mm3ShhMFURNtefAaQSeZEyz-wNyvN8uR3r9UmUi_MHaUmlva5fAtEaVpEMlnfjwYaZ_mFlsVmtj_Jeaw8-lFlrZxC0lZGXzSDwI2PLyRSrSMULc_gOh0SxfbBMEHAoLgv1QzqUXlyFNIpobUJOiTnV1mT5AjOA_CPzS0iqVL4MX2RyBqsos_KfZwacxJGYe675h46GW9XTZK7dqx8PBB5NC8JbxSa8J94GGpHyncUUi5I3RTZ1rW"
                />

                {activeTab === "overview" && (
                    <div className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard label="Monthly Views" value="148.2M" subValue="Average: 131M / mo" trend="+12.4%" />
                            <StatCard label="Avg. Engagement" value="8.42%" subValue="Industry Standard: 4.1%" trend="Optimal" />
                            <StatCard variant="outlier" Icon={Sparkles} label="Top Outlier Found" value="The Apple Vision Pro Review: A Personal Computer?" subValue="Outperforming by 3.2x" />
                        </div>

                        <div className="space-y-8">
                            <ControlBar />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {videoData.map((video) => (
                                    <VideoCard key={video.title} {...video} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "competitors" && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <CompetitorHeader />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <ComparisonTable />
                                <VisualHookAnalysis />
                            </div>
                            <Leaderboard />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
