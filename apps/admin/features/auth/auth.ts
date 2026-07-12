import type { User } from './types';

const mockUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@almaarif.id',
  role: 'admin',
};

export const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  return mockUser;
};
