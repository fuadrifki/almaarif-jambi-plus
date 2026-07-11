import { DesignShell } from '@/features/design-system/components/design-shell';

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return <DesignShell>{children}</DesignShell>;
}
