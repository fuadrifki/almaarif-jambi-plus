import { TEACHERS } from '@/lib/db/seed-teachers';

export const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error('Email dan password wajib diisi');
  }

  const user = TEACHERS.find((item) => item.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    throw new Error('Email tidak terdaftar');
  }

  if (!user || user.password !== password) {
    throw new Error('Email atau password salah');
  }

  return user;
};
