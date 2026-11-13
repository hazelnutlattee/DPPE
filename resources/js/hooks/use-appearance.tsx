
import { useSyncExternalStore } from 'react';

export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = ResolvedAppearance | 'system';

export type UseAppearanceReturn = {
    readonly appearance: Appearance;
    readonly resolvedAppearance: ResolvedAppearance;
    readonly updateAppearance: (mode: Appearance) => void;
};

const listeners = new Set<() => void>();
let currentAppearance: Appearance = 'system';
let mediaListenerAdded = false;

const prefersDark = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const getStoredAppearance = (): Appearance => {
    if (typeof window === 'undefined') {
        return 'system';
    }

    const savedAppearance = localStorage.getItem('appearance');

    if (
        savedAppearance === 'light' ||
        savedAppearance === 'dark' ||
        savedAppearance === 'system'
    ) {
        return savedAppearance;
    }

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
    }

    return 'system';
};

const isDarkMode = (appearance: Appearance): boolean => {
    return appearance === 'dark' ||
        (appearance === 'system' && prefersDark());
};

const applyTheme = (appearance: Appearance): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const isDark = isDarkMode(appearance);

    document.documentElement.classList.toggle('dark', isDark);

    document.documentElement.setAttribute(
        'data-theme',
        isDark ? 'dark' : 'light'
    );

    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

const handleSystemThemeChange = (): void => {
    if (currentAppearance === 'system') {
        applyTheme(currentAppearance);
        notify();
    }
};

export function initializeTheme(): void {
    if (typeof window === 'undefined') {
        return;
    }

    currentAppearance = getStoredAppearance();

    localStorage.setItem('appearance', currentAppearance);

    setCookie('appearance', currentAppearance);

    applyTheme(currentAppearance);

    // Add the system theme listener only once
    if (!mediaListenerAdded) {
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', handleSystemThemeChange);

        mediaListenerAdded = true;
    }

    notify();
}

export function useAppearance(): UseAppearanceReturn {
    const appearance: Appearance = useSyncExternalStore(
        subscribe,
        () => currentAppearance,
        () => 'system',
    );

    const resolvedAppearance: ResolvedAppearance = isDarkMode(appearance)
        ? 'dark'
        : 'light';

    const updateAppearance = (mode: Appearance): void => {
        currentAppearance = mode;

        localStorage.setItem('appearance', mode);

        localStorage.setItem(
            'theme',
            mode === 'system' ? (prefersDark() ? 'dark' : 'light') : mode
        );

        setCookie('appearance', mode);

        applyTheme(mode);
        notify();
    };

    return { appearance, resolvedAppearance, updateAppearance } as const;
}
