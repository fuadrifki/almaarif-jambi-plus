'use client';

import { useRouter } from 'next/navigation';
import { LogOut, Settings, UserIcon, UserCircle } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Surface,
} from '@/components/ui';
import { destroySession } from '@/features/auth/server';

import type { User } from '@/lib/types/user';
import { toast } from '@/components/ui/toast';

export const UserMenu = ({ user }: { user: User }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await destroySession();

      toast.success('Berhasil logout');

      router.push('/login');
      router.refresh();
    } catch {
      toast.error('Gagal logout. Silakan coba lagi.');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Surface>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm cursor-pointer"
          >
            <UserCircle size={24} />

            <span className="hidden text-sm font-medium text-primary sm:inline">{user.name}</span>
          </button>
        </Surface>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuLabel>
          <p className="text-base font-semibold text-primary">{user.name}</p>

          <p className="text-xs text-secondary">{user.email}</p>

          <p className="text-xs capitalize text-secondary">{user.role}</p>
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
