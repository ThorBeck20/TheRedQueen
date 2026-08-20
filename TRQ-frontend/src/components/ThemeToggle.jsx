import { useTheme } from "./ThemeProvider";

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    return (
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? '☀️' : '🌙'}
        </button>
    )
}

export default ThemeToggle;