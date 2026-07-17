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
      className={cn('mt-1', 'text-sm', 'text-[--text-primary]', 'break-words', className)}
      role="status"
      aria-live="polite"
    >
      {children || '-'}
    </div>
  );
};
