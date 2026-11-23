
import { useAppearance } from '@/hooks/use-appearance';

export default function ThemeToggle() {
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const toggleTheme = () => {
        const newTheme =
            resolvedAppearance === 'light' ? 'dark' : 'light';

        updateAppearance(newTheme);

        // Kekalkan keserasian dengan theme lama DPPE
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${
                resolvedAppearance === 'light' ? 'dark' : 'light'
            } mode`}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '9px 13px',
                borderRadius: '9px',
                border: '1px solid var(--dppe-border)',
                background: 'var(--dppe-surface)',
                color: 'var(--dppe-navy)',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 700,
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
            }}
        >
            {resolvedAppearance === 'light' ? (
                <>
                    <span>🌙</span>
                    Dark
                </>
            ) : (
                <>
                    <span>☀️</span>
                    Light
                </>
            )}
        </button>
    );
}
