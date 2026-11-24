
import { useAppearance } from '@/hooks/use-appearance';

export default function ThemeToggle() {
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const toggleTheme = () => {
        updateAppearance(
            resolvedAppearance === 'light' ? 'dark' : 'light'
        );
    };

    return (
        <button
            type="button"
            className="btn btn-outline-primary"
            onClick={toggleTheme}
            aria-label="Toggle colour theme"
        >
            {resolvedAppearance === 'light'
                ? '🌙 Dark Mode'
                : '☀️ Light Mode'}
        </button>
    );
}
