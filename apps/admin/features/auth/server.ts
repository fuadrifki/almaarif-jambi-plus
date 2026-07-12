'use server';

import type { User } from '@/lib/types/user';

import { setSession, clearSession } from '@/lib/auth';

export const createSession = async (user: User) => {
  await setSession(user);
};

export const destroySession = async () => {
  await clearSession();
};
