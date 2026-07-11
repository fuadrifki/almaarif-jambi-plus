import { cookies } from 'next/headers';

import type { User } from '@/features/auth/types';

const SESSION_KEY = 'ads_session';

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_KEY);

  if (!session) {
    return null;
  }

  return JSON.parse(session.value) as User;
}

export async function setSession(user: User) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_KEY, JSON.stringify(user), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
}

export async function clearSession() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_KEY);
}
