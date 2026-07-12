'use server';

import type { User } from './types';

import { setSession, clearSession } from '@/lib/auth';

export const createSession = async (user: User) => {
  await setSession(user);
};

export const destroySession = async () => {
  await clearSession();
};
