import type { User } from './types';

const mockUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@almaarif.id',
  role: 'admin',
};

export async function login(email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  return mockUser;
}

export async function logout() {
  return true;
}
