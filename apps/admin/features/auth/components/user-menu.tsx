'use client';

import { useRouter } from 'next/navigation';
import { LogOut, Settings, UserIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import { destroySession } from '@/features/auth/server';

import type { User } from '@/lib/types/user';

export const UserMenu = ({ user }: { user: User }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await destroySession();

    router.push('/login');
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm transition hover:bg-white/10"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-[10px] font-medium text-(--text-primary)">
            {user.name
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <span className="hidden text-sm font-medium text-(--text-primary) sm:inline">
            {user.name}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuLabel>
          <p className="text-sm font-medium text-(--text-primary)">{user.name}</p>

          <p className="text-xs text-(--text-secondary)">{user.email}</p>

          <p className="mt-1 text-xs capitalize text-(--text-secondary)">{user.role}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <UserIcon size={16} />

          <span>Profil</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings size={16} />

          <span>Pengaturan</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="text-red-400">
          <LogOut size={16} />

          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
