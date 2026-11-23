
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BookOpen,
    ClipboardCheck,
    FolderOpen,
    ShieldCheck,
    Sparkles,
    Clock3,
} from 'lucide-react';
import { dashboard } from '@/routes';

export default function Dashboard() {
    const { auth } = usePage().props as any;
    const user = auth?.user;

    const stats = [
        {
            title: 'Scenarios Explored',
            value: '0',
            description: 'Applications explored',
            icon: FolderOpen,
        },
        {
            title: 'Reviews Completed',
            value: '0',
            description: 'Your completed reviews',
            icon: ClipboardCheck,
        },
        {
            title: 'Permissions Reviewed',
            value: '0',
            description: 'Permission decisions made',
            icon: ShieldCheck,
        },
        {
            title: 'Learning Progress',
            value: '0%',
            description: 'Overall completion',
            icon: BookOpen,
        },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex flex-1 flex-col gap-7 p-4 md:p-7">

                {/* WELCOME BANNER */}
                <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#800F35] to-[#4B1028] p-6 text-white shadow-lg md:p-8">
                    <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full border-[30px] border-white/10" />
                    <div className="absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-white/5" />

                    <div className="relative z-10 max-w-2xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-pink-100">
                            <Sparkles size={14} />
                            YOUR PERSONAL DASHBOARD
                        </div>

                        <h1 className="text-2xl font-bold md:text-3xl">
                            Welcome back, {user?.name || 'User'}!
                        </h1>

                        <p className="mt-3 max-w-lg text-sm leading-relaxed text-pink-100 md:text-base">
                            Ready to continue your privacy learning journey?
                            Explore scenarios and discover how applications
                            request access to your personal information.
                        </p>

                        <Link
                            href="/#featured-scenarios"
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#800F35] shadow-sm transition hover:bg-pink-50"
                        >
                            Explore Scenarios
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </section>

                {/* STATISTICS */}
                <section>
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-foreground">
                            Your Overview
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            A summary of your learning activities.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.title}
                                    className="rounded-2xl border border-sidebar-border/70 bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-sidebar-border"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#800F35]/10 text-[#800F35] dark:bg-pink-300/10 dark:text-pink-300">
                                            <Icon size={21} />
                                        </div>
                                        <span className="text-xs font-medium text-muted-foreground">
                                            MY ACTIVITY
                                        </span>
                                    </div>

                                    <h3 className="mt-5 text-3xl font-bold text-foreground">
                                        {stat.value}
                                    </h3>

                                    <p className="mt-1 text-sm font-semibold text-foreground">
                                        {stat.title}
                                    </p>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {stat.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* QUICK ACTIONS */}
                <section>
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-foreground">
                            Quick Actions
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Continue exploring DPPE features.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">

                        <Link
                            href="/#featured-scenarios"
                            className="group flex items-center gap-4 rounded-2xl border border-sidebar-border/70 bg-card p-5 transition hover:border-[#800F35]/50 hover:shadow-md dark:border-sidebar-border"
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#800F35]/10 text-[#800F35] dark:bg-pink-300/10 dark:text-pink-300">
                                <FolderOpen size={23} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-foreground">
                                    Explore Scenarios
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Discover application permission requests.
                                </p>
                            </div>

                            <ArrowRight
                                size={19}
                                className="shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-[#800F35]"
                            />
                        </Link>

                        <div className="flex items-center gap-4 rounded-2xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-[#800F35] dark:bg-pink-300/10 dark:text-pink-300">
                                <ClipboardCheck size={23} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-foreground">
                                    My Reviews
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    View your saved permission reviews.
                                </p>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Available after integration.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* RECENT ACTIVITY */}
                <section className="rounded-2xl border border-sidebar-border/70 bg-card p-5 shadow-sm dark:border-sidebar-border md:p-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#800F35]/10 text-[#800F35] dark:bg-pink-300/10 dark:text-pink-300">
                            <Clock3 size={20} />
                        </div>

                        <div>
                            <h2 className="font-bold text-foreground">
                                Recent Activity
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Keep track of your latest activities.
                            </p>
                        </div>
                    </div>

                    <div className="flex min-h-36 flex-col items-center justify-center text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                            <ClipboardCheck
                                size={25}
                                className="text-muted-foreground"
                            />
                        </div>

                        <p className="mt-4 font-semibold text-foreground">
                            No activity yet
                        </p>

                        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                            Your recent scenario explorations and permission
                            reviews will appear here.
                        </p>
                    </div>
                </section>

                {/* FOOTER NOTE */}
                <p className="text-center text-xs text-muted-foreground">
                    Digital Privacy Permission Explorer (DPPE) · Learn.
                    Explore. Understand Your Privacy.
                </p>

            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
