'use client';

import type { PropsWithChildren } from 'react';

import { ThemeProvider } from './theme-provider';

export const AppProvider = ({ children }: PropsWithChildren) => (
  <ThemeProvider>{children}</ThemeProvider>
);
