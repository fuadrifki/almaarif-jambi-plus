'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <NextThemeProvider
    attribute="class"
    defaultTheme="light"
    enableSystem={false}
    disableTransitionOnChange
  >
    {children}
  </NextThemeProvider>
);
