
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const initialTheme: Theme =
            savedTheme === 'dark' ? 'dark' : 'light';

        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((current) =>
            current === 'light' ? 'dark' : 'light'
        );
    };

    return (
        <button
            type="button"
            className="btn btn-outline-primary"
            onClick={toggleTheme}
            aria-label="Toggle colour theme"
        >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    );
}
