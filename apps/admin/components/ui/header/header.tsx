import { Card } from '../card';
import type { HeaderProps } from './header.types';

export const Header = ({ title, logo, leading, actions }: HeaderProps) => (
  <header className="sticky top-0 z-50">
    <Card className="flex h-16 items-center justify-between">
      <div className="flex items-center gap-4">
        {leading}

        {logo}

        <div className="font-semibold leading-5">{title}</div>
      </div>

      <div className="flex items-center gap-3">{actions}</div>
    </Card>
  </header>
);
