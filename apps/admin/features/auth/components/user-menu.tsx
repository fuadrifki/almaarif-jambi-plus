'use client';

import { useRouter } from 'next/navigation';

import { destroySession } from '@/features/auth/server';

import type { User } from '../types';

export function UserMenu({ user }: { user: User }) {
  const router = useRouter();

  const handleLogout = async () => {
    await destroySession();

    router.push('/login');
    router.refresh();
  };

  return (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-sm font-medium text-(--text-primary)">{user.name}</p>

        <p className="text-xs text-(--text-secondary)">{user.email}</p>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="rounded-xl border border-white/10 px-3 py-2 text-sm transition hover:bg-white/10"
      >
        Logout
      </button>
    </div>
  );
}
