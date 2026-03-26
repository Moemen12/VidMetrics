import { LayoutDashboard, Users, Brain, Settings } from "lucide-react";
import Link from "next/link";
import { type DashboardTab } from "../../dashboard/page";

interface BottomNavProps {
    readonly activeTab: DashboardTab;
    readonly handle: string;
}

export default function BottomNav({ activeTab, handle }: Readonly<BottomNavProps>) {
    const items: ReadonlyArray<{ icon: typeof LayoutDashboard; label: DashboardTab }> = [
        { icon: LayoutDashboard, label: "overview" },
        { icon: Users, label: "competitors" },
        { icon: Brain, label: "intelligence" },
        { icon: Settings, label: "settings" },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-background/80 backdrop-blur-xl border-t border-outline-variant shadow-2xl">
            {items.map(({ icon: Icon, label }) => (
                <Link
                    key={label}
                    href={`/dashboard?tab=${label}&channel=${encodeURIComponent(handle)}`}
                    className={`flex flex-col items-center justify-center rounded-2xl w-12 h-12 transition-all duration-200 ${activeTab === label
                        ? 'bg-primary/20 text-primary border border-primary/20'
                        : 'text-on-surface-variant hover:text-primary'
                        }`}
                >
                    <Icon className="w-6 h-6" />
                </Link>
            ))}
        </nav>
    );
}
