import { TrendingUp } from "lucide-react";
import Image from "next/image";

interface ChannelProfileProps {
    readonly name: string;
    readonly subscribers: string;
    readonly category: string;
    readonly views30d: string;
    readonly imageUrl: string;
}

export default function ChannelProfile({ name, subscribers, category, views30d, imageUrl }: Readonly<ChannelProfileProps>) {
    return (
        <section className="bg-surface-container-low rounded-xl p-8 border border-outline-variant relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10 rounded-full group-hover:bg-primary/10 transition-all duration-700"></div>

            <div className="flex flex-col md:flex-row justify-between gap-6 items-center md:items-start text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    <div className="h-20 w-20 shrink-0 rounded-2xl overflow-hidden border-2 border-primary/20 p-1 bg-surface-container-high relative">
                        <Image
                            alt="Channel Logo"
                            src={imageUrl}
                            fill
                            className="rounded-xl object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-semibold tracking-tight text-on-surface">{name}</h1>
                        <p className="text-on-surface-variant font-medium flex flex-wrap justify-center md:justify-start items-center gap-x-2 gap-y-1">
                            <span className="text-primary font-bold">{subscribers}</span>{' '}
                            Subscribers
                            <span className="hidden sm:block h-1 w-1 rounded-full bg-outline-variant"></span>
                            <span className="w-full sm:w-auto">{category}</span>
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 items-center bg-surface-container-lowest/50 p-4 rounded-xl border border-outline-variant">
                    <div className="text-right">
                        <span className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Last 30 Days</span>
                        <span className="text-2xl font-bold text-primary tracking-tight">+{views30d} Views</span>
                    </div>
                    <div className="h-10 w-0.5 bg-outline-variant/20 mx-2"></div>
                    <TrendingUp className="text-primary w-8 h-8" />
                </div>
            </div>
        </section>
    );
}
