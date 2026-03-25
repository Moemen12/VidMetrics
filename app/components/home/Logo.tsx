import { ChartColumnBig } from "lucide-react";

export default function Logo() {
    return (
        <div className="flex items-center justify-center gap-3 mb-4 group cursor-default">
            <div className="p-2 bg-[#4be277]/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <ChartColumnBig className="text-[#4be277] w-9 h-9" strokeWidth={1.75} />
            </div>
            <span className="text-3xl font-bold tracking-tighter text-[#4be277]">
                VidMetrics
            </span>
        </div>
    );
}
