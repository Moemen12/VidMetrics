import { ChartColumnBig, Search, Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TopAppBar() {
    return (
        <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 max-w-full bg-background border-b border-outline-variant">
            <div className="flex items-center gap-3">
                <ChartColumnBig className="text-primary w-6 h-6" />
                <Link href={"/"} className="text-xl font-bold tracking-tighter text-primary">VidMetrics</Link>
            </div>

            <div className="hidden md:flex flex-1 max-w-xl mx-8">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
                    <input
                        className="w-full bg-surface-container-lowest border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary text-on-surface placeholder:text-on-surface-variant/50 transition-all outline-none"
                        placeholder="Paste YouTube Channel or Video URL..."
                        type="text"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer">
                    <Bell className="w-5 h-5" />
                </button>
                <div className="h-8 w-8 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant/20 relative">
                    <Image
                        alt="User Profile"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5Bs4HuYj_yyvJysLSfkHddQrv_DulEShp6jez1cLPxzb9vZFxpmzm1HjoPYC95ZFrDMA83LrH9kt9NcVaIfKt1Pi7Ii-m1V9jM2C2ANPFEczWiONWJYccNynC0unq5UuUdPgNY1-6rCwBy6k7SH99aiRsFSim51qPjzvuZYqGMr4BvNEr_7kiXBG74hKYhtAEDbpHQ6Y9-jSCMpLuO9X8_MSijRVhMkgKo4zA4hvDRYUYT9TVdJeUDfAiB7kiTYRSvSe-vA0zzJby"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </header>
    );
}
