'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { destroySession } from '@/features/auth/server';

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await destroySession();

    router.push('/login');
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-(--text-secondary) transition hover:bg-white/5 hover:text-(--text-primary)"
    >
      <LogOut size={18} />

      <span className="flex-1 text-left">Logout</span>
    </button>
  );
};
