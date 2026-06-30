import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../utils/cn";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        "border-cream-dark bg-white text-navy-800 hover:border-navy-800",
        "dark:border-navy-700 dark:bg-navy-800 dark:text-slate-100 dark:hover:border-slate-400"
      )}
    >
      <span aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
      {isDark ? "Светлая" : "Тёмная"}
    </button>
  );
}
