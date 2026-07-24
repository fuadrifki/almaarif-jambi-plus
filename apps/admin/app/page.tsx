import type { Metadata } from 'next';
import Link from 'next/link';

import { Button, PageLayout } from '@/components/ui';
import { Users, Lock } from 'lucide-react';
import { Logo } from '@almaarif/brand';
import { appConfig } from '@/config/app';

export const metadata: Metadata = {
  title: appConfig.name,
};

export default function LandingPage() {
  return (
    <PageLayout>
      <PageLayout.Content className="flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="flex justify-center">
            <Logo width={200} height={60} />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{appConfig.name}</h1>

            <p className="text-secondary">{appConfig.description}</p>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/students">
              <Button className="w-full" leftIcon={<Users size={16} />}>
                Lihat Data Santri
              </Button>
            </Link>

            <Link href="/login">
              <Button variant="ghost" className="w-full" leftIcon={<Lock size={16} />}>
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
}
