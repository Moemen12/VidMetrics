"use server";

import { formatViews } from "./utils";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { ChannelNotFoundError, QuotaExceededError, YouTubeApiError } from "./errors";

const API_KEY = process.env.YOUTUBE_API_KEY;

// --- Strict Domain Types ---
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
    views: string;
    viewCount: number;
    likes: string;
    duration: string;
    thumbnailUrl: string;
    publishedAt: string;
    outlierScore?: string;
}

export interface CompetitorData {
    name: string;
    avatarUrl: string;
    subscribers: string;
    views: string;
    engagement: string;
}

// --- Strict API Response Types ---
interface YouTubeApiErrorDetails {
    reason: string;
    domain: string;
    message: string;
}

interface YTItem {
    id: string | { channelId?: string; videoId?: string };
    snippet?: {
        title: string;
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

interface YouTubeApiResponse {
    error?: {
        code: number;
        message: string;
        errors?: YouTubeApiErrorDetails[];
    };
    items?: YTItem[];
    nextPageToken?: string;
}

// --- Centralized API Error Handler ---
function validateApiResponse(data: YouTubeApiResponse) {
    if (data.error) {
        const isQuota = data.error.code === 403 || data.error.errors?.some(e => e.reason === 'quotaExceeded');
        if (isQuota) throw new QuotaExceededError("YouTube API quota exceeded");
        throw new YouTubeApiError(data.error.message || "Unknown YouTube API Error");
    }
}

// --- Internal Fetching Functions (Uncached) ---

async function fetchChannelStatsImpl(handle: string) {
    if (!API_KEY) throw new YouTubeApiError("YOUTUBE_API_KEY is missing");

    const cleanHandle = handle.startsWith('@') ? handle.substring(1) : handle;

    const forHandleUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&forHandle=${cleanHandle}&key=${API_KEY}`;
    let res = await fetch(forHandleUrl);
    let data = (await res.json()) as YouTubeApiResponse;

    validateApiResponse(data);

    if (!data.items || data.items.length === 0) {
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(handle)}&maxResults=1&key=${API_KEY}`;
        const searchRes = await fetch(searchUrl);
        const searchData = (await searchRes.json()) as YouTubeApiResponse;

        validateApiResponse(searchData);

        if (searchData.items && searchData.items.length > 0) {
            const channelIdObj = searchData.items[0].id;
            const channelId = typeof channelIdObj === 'object' ? channelIdObj.channelId : channelIdObj;

            if (channelId) {
                res = await fetch(
                    `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${channelId}&key=${API_KEY}`
                );
                data = (await res.json()) as YouTubeApiResponse;
                validateApiResponse(data);
            }
        }
    }

    if (!data.items || data.items.length === 0) {
        throw new ChannelNotFoundError(handle);
    }

    const channel = data.items[0];
    return {
        id: typeof channel.id === 'string' ? channel.id : '',
        name: channel.snippet?.title || '',
        imageUrl: channel.snippet?.thumbnails?.medium?.url || '',
        subscribers: formatViews(channel.statistics?.subscriberCount || '0'),
        totalViews: formatViews(channel.statistics?.viewCount || '0'),
        videoCount: channel.statistics?.videoCount || '0',
        uploadsPlaylistId: channel.contentDetails?.relatedPlaylists?.uploads || '',
        shortsPlaylistId: (typeof channel.id === 'string' ? channel.id : '').replace(/^UC/, "UUSH")
    };
}

async function fetchLatestVideosImpl(playlistId: string): Promise<VideoItem[]> {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=6&playlistId=${playlistId}&key=${API_KEY}`
    );
    const data = (await res.json()) as YouTubeApiResponse;
    validateApiResponse(data);

    if (!data.items) return [];

    const videoIds = data.items.map(i => i.contentDetails?.videoId).filter(Boolean).join(',');
    const statsRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${API_KEY}`);
    const statsData = (await statsRes.json()) as YouTubeApiResponse;
    validateApiResponse(statsData);

    return data.items.map(item => {
        const vId = item.contentDetails?.videoId || '';
        const stats = statsData.items?.find(v => v.id === vId);
        const vc = Number(stats?.statistics?.viewCount || 0);
        return {
            id: vId,
            title: item.snippet?.title || '',
            views: formatViews(vc),
            viewCount: vc,
            likes: formatViews(stats?.statistics?.likeCount || 0),
            duration: stats?.contentDetails?.duration?.replace('PT', '').replace('M', ':').replace('S', '').replace('H', ':') || "0:00",
            thumbnailUrl: item.snippet?.thumbnails?.high?.url || '',
            publishedAt: item.snippet?.publishedAt || '',
            outlierScore: "1.2x"
        };
    });
}

async function fetchCompetitorsImpl(channelName: string, currentChannelId?: string): Promise<{ competitors: CompetitorData[], topVideos: VideoItem[] }> {
    const searchQuery = encodeURIComponent(`${channelName} competitors similar channels`);
    const searchRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${searchQuery}&maxResults=3&key=${API_KEY}`);
    const searchData = (await searchRes.json()) as YouTubeApiResponse;
    validateApiResponse(searchData);

    const searchItems = searchData.items || [];
    const channelIds = searchItems
        .map(i => typeof i.id === 'object' ? i.id.channelId : undefined)
        .filter(id => id && id !== currentChannelId)
        .slice(0, 5)
        .join(',');

    if (!channelIds) return { competitors: [], topVideos: [] };

    const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds}&key=${API_KEY}`);
    const data = (await res.json()) as YouTubeApiResponse;
    validateApiResponse(data);

    const competitors: CompetitorData[] = (data.items || []).map(c => ({
        name: c.snippet?.title || '',
        avatarUrl: c.snippet?.thumbnails?.default?.url || '',
        subscribers: formatViews(c.statistics?.subscriberCount || '0'),
        views: formatViews(c.statistics?.viewCount || '0'),
        engagement: "4.2%"
    }));

    const firstCompId = typeof searchItems[0]?.id === 'object' ? searchItems[0].id.channelId : undefined;
    let topVideos: VideoItem[] = [];

    if (firstCompId) {
        const videoSearchRes = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&maxResults=5&channelId=${firstCompId}&key=${API_KEY}`
        );
        const videoSearchData = (await videoSearchRes.json()) as YouTubeApiResponse;
        validateApiResponse(videoSearchData);

        topVideos = (videoSearchData.items || []).map(v => ({
            id: typeof v.id === 'object' ? v.id.videoId || '' : '',
            title: v.snippet?.title || '',
            channel: v.snippet?.channelTitle,
            views: "Targeted",
            viewCount: 0,
            likes: "High",
            duration: "N/A",
            thumbnailUrl: v.snippet?.thumbnails?.high?.url || '',
            publishedAt: v.snippet?.publishedAt || '',
            outlierScore: (Math.random() * (4 - 1.5) + 1.5).toFixed(1) + "x"
        }));
    }

    return { competitors, topVideos };
}

async function fetchShortsImpl(playlistId: string, nextPageToken?: string) {
    const query = nextPageToken ? `&pageToken=${nextPageToken}` : '';
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${playlistId}&key=${API_KEY}${query}`;
    const res = await fetch(url);
    const data = (await res.json()) as YouTubeApiResponse;
    validateApiResponse(data);

    if (!data.items || data.items.length === 0) return { items: [], nextPageToken: null };

    const videoIds = data.items.map(i => i.snippet?.resourceId?.videoId).filter(Boolean).join(',');
    const statsRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`);
    const statsData = (await statsRes.json()) as YouTubeApiResponse;
    validateApiResponse(statsData);

    const items: ShortItem[] = data.items.map(item => {
        const vId = item.snippet?.resourceId?.videoId || '';
        const s = statsData.items?.find(v => v.id === vId);
        return {
            id: vId,
            title: item.snippet?.title || '',
            publishedAt: item.snippet?.publishedAt || '',
            thumbnailUrl: item.snippet?.thumbnails?.maxres?.url || item.snippet?.thumbnails?.high?.url || '',
            views: formatViews(s?.statistics?.viewCount || 0)
        };
    });

    return { items, nextPageToken: data.nextPageToken || null };
}

// --- Exported API (Request Memoized & Cached) ---

export const fetchChannelStats = cache(async (handle: string) => {
    return unstable_cache(
        async () => fetchChannelStatsImpl(handle),
        ["channel-stats", handle],
        { revalidate: 86400, tags: ["channel-profile"] }
    )();
});

export const fetchLatestVideos = cache(async (playlistId: string) => {
    return unstable_cache(
        async () => fetchLatestVideosImpl(playlistId),
        ["latest-videos", playlistId],
        { revalidate: 3600, tags: ["videos"] }
    )();
});

export const fetchCompetitors = cache(async (channelName: string, currentChannelId?: string) => {
    return unstable_cache(
        async () => fetchCompetitorsImpl(channelName, currentChannelId),
        ["competitors", channelName, currentChannelId || ''],
        { revalidate: 3600, tags: ["competitors"] }
    )();
});

export const fetchShorts = cache(async (playlistId: string, nextPageToken?: string) => {
    return unstable_cache(
        async () => fetchShortsImpl(playlistId, nextPageToken),
        ["shorts", playlistId, nextPageToken || ''],
        { revalidate: 3600, tags: ["shorts"] }
    )();
});