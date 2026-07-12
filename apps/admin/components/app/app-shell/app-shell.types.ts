import type { ReactNode } from 'react';

import type { User } from '@/lib/types/user';

export type AppShellProps = {
  children: ReactNode;
  user: User;
};
