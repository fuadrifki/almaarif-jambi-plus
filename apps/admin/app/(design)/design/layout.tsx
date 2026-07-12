import { DesignShell } from '@/features/ads/components/ads-shell';

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return <DesignShell>{children}</DesignShell>;
}
