import 'bootstrap/dist/css/bootstrap.min.css';
import './style/app.css';
import { createInertiaApp, router } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'DPPE';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
layout: (name) => {
    switch (true) {
        case name === 'welcome':
        case name === 'about':
            return null;

        case name.startsWith('auth/'):
            return AuthLayout;

        case name.startsWith('settings/'):
            return [AppLayout, SettingsLayout];

        default:
            return AppLayout;
    }
},
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// Initialize theme when the application loads
initializeTheme();

// Track the current page path
let lastPathname = window.location.pathname;

// Reapply theme only when navigating to a different page
router.on('navigate', () => {
    const currentPathname = window.location.pathname;

    if (currentPathname !== lastPathname) {
        initializeTheme();
    }

    lastPathname = currentPathname;
});