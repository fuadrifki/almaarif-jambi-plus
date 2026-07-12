'use client';

import type { PropsWithChildren } from 'react';

import { Toaster } from '@/components/ui';

import { ThemeProvider } from './theme-provider';

export const AppProvider = ({ children }: PropsWithChildren) => (
  <ThemeProvider>
    {children}

    <Toaster />
  </ThemeProvider>
);
