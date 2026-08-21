import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from 'lucide-react';

/**
 * TODO: Please turn this into an animation of a sliding toggle.
 * 
 */
function ThemeToggle(className="", ...props) {
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            className={`
                ${className}
            `}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={isDark ? 
                "Switch to light theme" :
                "Switch to dark theme."
            }
            {...props}
        >
            <Sun
                className={`
                    absolute w-5 h-5 text-accent transition-all duration-300
                    ${isDark? 'rotate-90 scale-0 opacity-0' :
                        'rotate-0 scale-100 opacity-100'}
            `}/>
            <Moon
                className={`
                    absolute w-5 h-5 text-accent transition-all duration-300
                    ${isDark ? 'rotate-0 scale-100 opacity-100' :
                        '-rotate-90 scale-0 opacity-0'}
                    
            `}/>
        </button>
    )
}

export default ThemeToggle;