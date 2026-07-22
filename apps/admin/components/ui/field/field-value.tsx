import { cn } from '@/lib';

export const FieldValue = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn('mt-1 text-sm text-primary wrap-break-word', className)}
      role="status"
      aria-live="polite"
    >
      {children || '-'}
    </div>
  );
};
