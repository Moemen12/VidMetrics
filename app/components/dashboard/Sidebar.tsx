import { LayoutDashboard, Users, Lightbulb, Settings } from "lucide-react";
import { type DashboardTab } from "../../dashboard/page";

interface SidebarProps {
    readonly activeTab: DashboardTab;
    readonly onTabChange: (tab: DashboardTab) => void;
}

export default function Sidebar({ activeTab, onTabChange }: Readonly<SidebarProps>) {
    const items: ReadonlyArray<{ icon: typeof LayoutDashboard; label: string; tab: DashboardTab }> = [
        { icon: LayoutDashboard, label: "Dashboard", tab: "overview" },
        { icon: Users, label: "Competitors", tab: "competitors" },
        { icon: Lightbulb, label: "Intelligence", tab: "intelligence" },
    ];

    return (
        <div className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-20 flex-col items-center py-8 space-y-8 bg-surface border-r border-outline-variant z-40">
            {items.map(({ icon: Icon, label, tab }) => (
                <div key={label} className="group relative">
                    <button
                        onClick={() => onTabChange(tab)}
                        className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${activeTab === tab ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                            }`}
                    >
                        <Icon className="w-6 h-6" />
                    </button>
                    <div className="absolute left-16 bg-surface-container-highest text-on-surface text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {label}
                    </div>
                </div>
            ))}
            <div className="mt-auto group relative pb-4">
                <button
                    onClick={() => onTabChange("settings")}
                    className={`p-3 rounded-xl transition-all duration-200 cursor-pointer ${activeTab === "settings" ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                        }`}
                >
                    <Settings className="w-6 h-6" />
                </button>
                <div className="absolute left-16 bg-surface-container-highest text-on-surface text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Settings
                </div>
            </div>
        </div>
    );
}
