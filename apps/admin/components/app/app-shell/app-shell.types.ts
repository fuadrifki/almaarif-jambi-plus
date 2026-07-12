import type { ReactNode } from 'react';

import type { User } from '@/features/auth/types';

export type AppShellProps = {
  children: ReactNode;
  user: User;
};
