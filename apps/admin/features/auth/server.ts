'use server';

import type { User } from './types';

import { setSession, clearSession } from '@/lib/auth';

export async function createSession(user: User) {
  await setSession(user);
}

export async function destroySession() {
  await clearSession();
}
