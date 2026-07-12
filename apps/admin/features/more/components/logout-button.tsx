'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { Button, toast } from '@/components/ui';
import { destroySession } from '@/features/auth/server';

export const LogoutButton = () => {
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
    <Button
      variant="ghost"
      className="w-full justify-start"
      leftIcon={<LogOut size={18} />}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};
