import { Surface } from '../surface';

import type { HeaderProps } from './header.types';

export const Header = ({ title, logo, actions }: HeaderProps) => (
  <header className="sticky top-0 z-50">
    <Surface className="flex h-16 items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {logo}

        <div className="font-semibold leading-5">{title}</div>
      </div>

      <div className="flex items-center gap-3">{actions}</div>
    </Surface>
  </header>
);
