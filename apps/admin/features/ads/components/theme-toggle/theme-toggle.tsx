'use client';

import { Surface } from '@/components/ui';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Surface>
        <button
          type="button"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-(--text-secondary) transition hover:bg-black/5 hover:text-(--text-primary)"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}

          {isDark ? 'Light' : 'Dark'}
        </button>
      </Surface>
    </div>
  );
};
