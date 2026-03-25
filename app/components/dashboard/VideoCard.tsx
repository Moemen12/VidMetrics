import { Eye, Heart, Rocket } from "lucide-react";
import Image from "next/image";

interface VideoCardProps {
    readonly title: string;
    readonly views: string;
    readonly likes: string;
    readonly duration: string;
    readonly thumbnailUrl: string;
    readonly outlierScore?: string;
}

export default function VideoCard({ title, views, likes, duration, thumbnailUrl, outlierScore }: Readonly<VideoCardProps>) {
    return (
        <div className="group cursor-pointer">
            <div className="relative rounded-xl overflow-hidden aspect-video bg-surface-container-lowest mb-4 border border-outline-variant">
                <Image
                    alt={title}
                    src={thumbnailUrl}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-[10px] font-bold tracking-widest text-white z-10">{duration}</div>
                {outlierScore && (
                    <div className="absolute top-3 left-3 bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-extrabold tracking-tighter uppercase flex items-center gap-1 shadow-lg z-10">
                        <Rocket className="w-3 h-3 fill-current" />
                        Outlier {outlierScore}
                    </div>
                )}
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold leading-tight text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-3">
                        {title}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant transition-colors hover:bg-surface-container">
                            <div className="flex items-center gap-2 mb-1">
                                <Eye className="text-on-surface-variant w-3.5 h-3.5" />
                                <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">Views</span>
                            </div>
                            <div className="text-lg font-bold text-on-surface">{views}</div>
                        </div>
                        <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant transition-colors hover:bg-surface-container">
                            <div className="flex items-center gap-2 mb-1">
                                <Heart className="text-on-surface-variant w-3.5 h-3.5" />
                                <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">Likes</span>
                            </div>
                            <div className="text-lg font-bold text-on-surface">{likes}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
