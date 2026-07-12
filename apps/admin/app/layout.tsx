import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import './globals.css';

import { appConfig } from '@/config/app';
import { AppProvider } from '@/providers';
import { ThemeToggle } from '@/features/ads/components/theme-toggle';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: appConfig.name,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.description,
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={montserrat.variable}>
      <body className="font-sans antialiased min-h-full flex flex-col">
        <AppProvider>
          <ThemeToggle />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
