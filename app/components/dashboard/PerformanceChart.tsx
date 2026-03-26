"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
    { date: "Mar 1", views: 4000000 },
    { date: "Mar 5", views: 4500000 },
    { date: "Mar 10", views: 3800000 },
    { date: "Mar 15", views: 5200000 },
    { date: "Mar 20", views: 4800000 },
    { date: "Mar 25", views: 6100000 },
    { date: "Mar 30", views: 5800000 },
]

export default function PerformanceChart() {
    return (
        <Card className="bg-surface-container border-outline-variant rounded-2xl">
            <CardHeader className="p-6 pb-2">
                <CardTitle className="text-lg font-semibold tracking-tight text-on-surface">Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
                <ChartContainer
                    config={{
                        views: {
                            label: "Views",
                            color: "hsl(var(--primary))",
                        },
                    }}
                    className="h-75 w-full"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "var(--on-surface-variant)", fontSize: 10 }}
                                dy={10}
                            />
                            <YAxis hide />
                            <Tooltip content={<ChartTooltipContent hideLabel />} />
                            <Line
                                type="monotone"
                                dataKey="views"
                                stroke="var(--primary)"
                                strokeWidth={3}
                                dot={false}
                                style={{
                                    filter: "drop-shadow(0 0 8px rgba(75, 226, 119, 0.4))"
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
