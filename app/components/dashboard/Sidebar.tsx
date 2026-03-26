import { LayoutDashboard, Users, Lightbulb, Settings } from "lucide-react";
import Link from "next/link";
import { type DashboardTab } from "@/lib/types";

interface SidebarProps {
    readonly activeTab: DashboardTab;
    readonly handle: string;
}

export default function Sidebar({ activeTab, handle }: Readonly<SidebarProps>) {
    const items: ReadonlyArray<{ icon: typeof LayoutDashboard; label: string; tab: DashboardTab }> = [
        { icon: LayoutDashboard, label: "Dashboard", tab: "overview" },
        { icon: Users, label: "Competitors", tab: "competitors" },
        { icon: Lightbulb, label: "Intelligence", tab: "intelligence" },
    ];

    return (
        <div className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-20 flex-col items-center py-8 space-y-8 bg-surface border-r border-outline-variant z-40">
            {items.map(({ icon: Icon, label, tab }) => (
                <div key={label} className="group relative">
                    <Link
                        href={`/dashboard?tab=${tab}&channel=${encodeURIComponent(handle)}`}
                        className={`p-3 rounded-xl block transition-all duration-200 ${activeTab === tab ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                            }`}
                    >
                        <Icon className="w-6 h-6" />
                    </Link>
                    <div className="absolute left-16 bg-surface-container-highest text-on-surface text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {label}
                    </div>
                </div>
            ))}
            <div className="mt-auto group relative pb-4">
                <Link
                    href={`/dashboard?tab=settings&channel=${encodeURIComponent(handle)}`}
                    className={`p-3 rounded-xl block transition-all duration-200 ${activeTab === "settings" ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                        }`}
                >
                    <Settings className="w-6 h-6" />
                </Link>
                <div className="absolute left-16 bg-surface-container-highest text-on-surface text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Settings
                </div>
            </div>
        </div>
    );
}
