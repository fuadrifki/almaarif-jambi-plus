import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { appConfig } from '@/config/app';
import { AppProvider } from '@/providers';
import { GlobalThemeToggle } from '@/components/app/global-theme-toggle';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: appConfig.name,
  description: appConfig.description,
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
          <GlobalThemeToggle />

          {children}
        </AppProvider>
      </body>
    </html>
  );
}
