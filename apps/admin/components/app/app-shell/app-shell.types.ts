import type { ReactNode } from 'react';

import type { User } from '@/features/auth/types';

export interface AppShellProps {
  children: ReactNode;
  user: User;
}
