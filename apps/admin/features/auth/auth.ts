import type { User } from '@/lib/types/user';

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@almaarif.id',
    password: 'admin',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Ustadz Ahmad',
    email: 'teacher@almaarif.id',
    password: '12345',
    role: 'teacher',
  },
];

export const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error('Email dan password wajib diisi');
  }

  const user = mockUsers.find((item) => item.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    throw new Error('Email tidak terdaftar');
  }

  if (!user || user.password !== password) {
    throw new Error('Email atau password salah');
  }

  return user;
};
