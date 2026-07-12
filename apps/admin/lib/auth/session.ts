import { cookies } from 'next/headers';

import type { User } from '@/lib/types/user';

const SESSION_KEY = 'ads_session';

export const getSession = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_KEY);

  if (!session?.value) {
    return null;
  }

  try {
    return JSON.parse(session.value) as User;
  } catch {
    return null;
  }
};

export const setSession = async (user: User) => {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_KEY, JSON.stringify(user), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
};

export const clearSession = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_KEY);
};
