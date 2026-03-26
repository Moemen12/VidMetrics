import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, TrendingUp, CalendarDays } from "lucide-react"
import { IntelligenceMetrics, PillarMetric } from "@/lib/types"

interface IntelligenceViewProps extends IntelligenceMetrics {
    readonly channelName: string;
}

export default function IntelligenceView({
    channelName,
    postingCadence,
    viralHookStrength,
    engagementVelocity,
    audienceRetention,
    trendingTags,
    strategicSummary
}: Readonly<IntelligenceViewProps>) {

    const PILLARS: PillarMetric[] = [
        {
            name: "Viral Hooks",
            score: `${(viralHookStrength / 40).toFixed(1)}x`,
            strength: viralHookStrength,
            status: viralHookStrength > 70 ? "Dominant" : viralHookStrength > 40 ? "Optimal" : "Stable"
        },
        {
            name: "Engagement Velocity",
            score: `${engagementVelocity.score}%`,
            strength: Math.min(engagementVelocity.score * 4, 100),
            status: engagementVelocity.label
        },
        {
            name: "Audience Retention",
            score: `${(audienceRetention.score / 50).toFixed(1)}x`,
            strength: audienceRetention.score,
            status: audienceRetention.label
        },
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
                                            <p className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">{p.status}</p>
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
                                        <div key={t.tag} className="px-3 py-1.5 bg-surface-container-high border border-outline-variant/50 rounded-lg text-xs font-bold text-on-surface group hover:border-primary/50 transition-colors">
                                            {t.tag} <span className="ml-2 text-[8px] opacity-40 group-hover:opacity-100 transition-opacity">{t.count}x</span>
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

            <Card className="bg-surface-container border-outline-variant rounded-2xl overflow-hidden">
                <CardContent className="p-8 flex items-center gap-8 bg-linear-to-r from-primary/5 to-transparent relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                    <Lightbulb className="w-8 h-8 text-primary shrink-0" />
                    <div className="space-y-1">
                        <h4 className="text-xs font-black uppercase tracking-widest text-primary">Intelligence Summary</h4>
                        <p className="text-base text-on-surface leading-relaxed italic font-medium">
                            &quot;{strategicSummary}&quot;
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}