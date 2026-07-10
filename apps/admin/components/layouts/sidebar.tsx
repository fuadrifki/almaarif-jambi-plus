import Link from 'next/link';

import { navigation } from '@/config/navigation';
import { appConfig } from '@/config/app';

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-card">
      <div className="border-b p-6">
        <h1 className="text-xl font-bold">{appConfig.shortName}</h1>

        <p className="text-sm text-muted-foreground">{appConfig.description}</p>
      </div>

      <nav className="flex flex-col gap-1 p-3">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent"
            >
              <Icon className="h-5 w-5" />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
