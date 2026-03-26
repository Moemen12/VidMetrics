export type DashboardTab = "overview" | "competitors" | "intelligence" | "settings";

export type StatusLabel = "Dominant" | "Optimal" | "Stable";

export interface PillarMetric {
    name: string;
    score: string;
    strength: number;
    status: StatusLabel;
}

export interface ShortItem {
    id: string;
    title: string;
    publishedAt: string;
    thumbnailUrl: string;
    views: string;
}

export interface VideoItem {
    id: string;
    title: string;
    channel?: string;
    description?: string;
    tags?: string[];
    views: string;
    viewCount: number;
    likes: string;
    duration: string;
    thumbnailUrl: string;
    publishedAt: string;
    outlierScore?: string;
}

export interface ChannelProfile {
    id: string;
    name: string;
    imageUrl: string;
    subscribers: string;
    totalViews: string;
    videoCount: string;
    uploadsPlaylistId: string;
    shortsPlaylistId: string;
}

export interface CompetitorData {
    name: string;
    avatarUrl: string;
    subscribers: string;
    views: string;
    engagement: string;
}

export interface IntelligenceMetrics {
    postingCadence: string;
    viralHookStrength: number;
    engagementVelocity: {
        score: number;
        label: StatusLabel;
    };
    audienceRetention: {
        score: number;
        label: StatusLabel;
    };
    trendingTags: Array<{ tag: string; count: number }>;
    strategicSummary: string;
}


export interface YouTubeApiErrorDetails {
    reason: string;
    domain: string;
    message: string;
}

export interface YTItem {
    id: string | { channelId?: string; videoId?: string };
    snippet?: {
        title: string;
        description?: string;
        tags?: string[];
        channelTitle?: string;
        publishedAt: string;
        thumbnails: {
            default?: { url: string };
            medium?: { url: string };
            high?: { url: string };
            maxres?: { url: string };
        };
        resourceId?: { videoId: string };
    };
    statistics?: {
        subscriberCount?: string;
        viewCount?: string;
        videoCount?: string;
        likeCount?: string;
    };
    contentDetails?: {
        relatedPlaylists?: { uploads: string };
        videoId?: string;
        duration?: string;
    };
}

export interface YouTubeApiResponse {
    error?: {
        code: number;
        message: string;
        errors?: YouTubeApiErrorDetails[];
    };
    items?: YTItem[];
    nextPageToken?: string;
}
