import { cn } from '@/lib';

export type SkeletonProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const Skeleton = ({ className, style }: SkeletonProps) => (
  <div className={cn('animate-pulse rounded-lg bg-(--skeleton)', className)} style={style} />
);

export const SkeletonText = ({ lines = 3, className }: { lines?: number; className?: string }) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }, (_, i) => (
      <Skeleton key={i} className={cn('h-4', i === lines - 1 ? 'w-3/4' : 'w-full')} />
    ))}
  </div>
);

export const SkeletonAvatar = ({ size = 40, className }: { size?: number; className?: string }) => (
  <Skeleton className={cn('rounded-full', className)} style={{ width: size, height: size }} />
);

export const SkeletonCard = ({ className }: { className?: string }) => (
  <div className={cn('space-y-3 p-4', className)}>
    <div className="flex items-center gap-3">
      <SkeletonAvatar size={36} />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
    <SkeletonText lines={2} />
  </div>
);
