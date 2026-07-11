'use client';

import { Surface } from '@/components/ui';
import { ThemeToggle } from '@/features/design-system/components/theme-toggle';

export function GlobalThemeToggle() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Surface>
        <ThemeToggle />
      </Surface>
    </div>
  );
}
