import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, TrendingUp, CalendarDays } from "lucide-react"

interface IntelligenceViewProps {
    readonly trendingTags: Array<{ tag: string; count: number }>;
    readonly postingCadence: string;
    readonly channelName: string;
}

export default function IntelligenceView({ trendingTags, postingCadence, channelName }: Readonly<IntelligenceViewProps>) {
    const PILLARS = [
        { name: "Viral Hooks", score: "2.4x", strength: 88, status: "Dominant" },
        { name: "Engagement Velocity", score: "1.8x", strength: 72, status: "Optimal" },
        { name: "Audience Retention", score: "1.2x", strength: 55, status: "Stable" },
    ]

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-surface-container border-outline-variant rounded-2xl">
                    <CardHeader className="p-6 border-b border-outline-variant/10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-primary" />
                                <CardTitle className="text-lg font-semibold tracking-tight text-on-surface">Strategy Analysis</CardTitle>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-8">
                        <div className="space-y-6">
                            {PILLARS.map((p) => (
                                <div key={p.name} className="space-y-2 group">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{p.name}</p>
                                            <p className="text-[10px] font-medium text-on-surface-variant">{p.status}</p>
                                        </div>
                                        <span className="text-xs font-black text-primary">{p.score} Growth</span>
                                    </div>
                                    <Progress value={p.strength} className="h-1.5" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    <Card className="bg-surface-container border-outline-variant rounded-2xl">
                        <CardHeader className="p-6 pb-2">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                <CardTitle className="text-lg font-semibold tracking-tight text-on-surface">Detected Trends</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-wrap gap-2">
                                {trendingTags.length > 0 ? (
                                    trendingTags.map((t) => (
                                        <div key={t.tag} className="px-3 py-1.5 bg-surface-container-high border border-outline-variant/50 rounded-lg text-xs font-bold text-on-surface">
                                            {t.tag} <span className="ml-2 text-[8px] opacity-40">{t.count}x</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-on-surface-variant italic">No metadata trends detected.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-surface-container border-outline-variant rounded-2xl">
                        <CardContent className="p-8 flex items-center justify-between">
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-on-surface-variant">Posting Frequency</h4>
                                <p className="text-2xl font-black text-primary tracking-tight">{postingCadence}</p>
                            </div>
                            <CalendarDays className="w-8 h-8 text-primary/50" />
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card className="bg-surface-container border-outline-variant rounded-2xl">
                <CardContent className="p-8 flex items-center gap-8 bg-linear-to-r from-primary/5 to-transparent">
                    <Lightbulb className="w-8 h-8 text-primary animate-pulse" />
                    <div className="space-y-1">
                        <h4 className="text-xs font-black uppercase tracking-widest text-primary">Intelligence Summary</h4>
                        <p className="text-base text-on-surface leading-relaxed italic font-medium">
                            &quot;Current data suggests {channelName} is prioritizing high-engagement keywords like <span className="text-primary font-bold">{trendingTags[0]?.tag || 'N/A'}</span>. To compete, align your production with the detected {postingCadence} cadence.&quot;
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}