'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-(--text-secondary) transition hover:bg-black/5 hover:text-(--text-primary)"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}

      {isDark ? 'Light' : 'Dark'}
    </button>
  );
}
