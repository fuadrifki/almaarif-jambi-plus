import { cn } from '@/lib/utils';

type PageSectionProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export function PageSection({ children, className }: PageSectionProps) {
  return <section className={cn('rounded-xl border bg-card p-6', className)}>{children}</section>;
}
