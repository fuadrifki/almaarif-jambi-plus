import { Surface } from '../surface';

import type { HeaderProps } from './header.types';

export function Header({ title, logo, actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50">
      <Surface className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {logo}

          <div className="font-semibold">{title}</div>
        </div>

        <div className="flex items-center gap-3">{actions}</div>
      </Surface>
    </header>
  );
}
