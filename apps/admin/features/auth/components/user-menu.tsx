'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, LogOut, Settings, UserIcon } from 'lucide-react';

import { destroySession } from '@/features/auth/server';

import type { User } from '@/lib/types/user';

export const UserMenu = ({ user }: { user: User }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await destroySession();

    router.push('/login');
    router.refresh();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
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

        <ChevronDown
          size={14}
          className={`text-(--text-secondary) transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-white/10 bg-[#1a2433] p-2 shadow-lg">
          <div className="px-3 py-2">
            <p className="text-sm font-medium text-(--text-primary)">{user.name}</p>

            <p className="text-xs text-(--text-secondary)">{user.email}</p>

            <p className="mt-1 text-xs capitalize text-(--text-secondary)">{user.role}</p>
          </div>

          <hr className="my-1 border-white/10" />

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-(--text-secondary) transition hover:bg-white/5 hover:text-(--text-primary)"
          >
            <UserIcon size={16} />

            <span className="flex-1 text-left">Profil</span>
          </button>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-(--text-secondary) transition hover:bg-white/5 hover:text-(--text-primary)"
          >
            <Settings size={16} />

            <span className="flex-1 text-left">Pengaturan</span>
          </button>

          <hr className="my-1 border-white/10" />

          <button
            type="button"
            onClick={() => {
              setOpen(false);

              void handleLogout();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-white/5"
          >
            <LogOut size={16} />

            <span className="flex-1 text-left">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};
