import { Surface } from '../surface';
import type { HeaderProps } from './header.types';

export function Header({ title, actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50">
      <Surface className="flex h-16 items-center justify-between px-6">
        <div className="font-semibold">{title}</div>

        <div className="flex items-center gap-3">{actions}</div>
      </Surface>
    </header>
  );
}
