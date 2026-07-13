'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/lib';

import type { ReactNode } from 'react';

export type InfiniteScrollProps = {
  children: ReactNode;
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  loader?: ReactNode;
  end?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
};

export const InfiniteScroll = ({
  children,
  hasMore,
  isLoading,
  onLoadMore,
  loader,
  end,
  threshold = 0,
  rootMargin = '200px',
  className,
}: InfiniteScrollProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !isLoading && hasMore) {
          onLoadMore();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [isLoading, hasMore, onLoadMore, threshold, rootMargin]);

  return (
    <div className={cn('flex flex-col', className)}>
      {children}

      {isLoading && hasMore && loader}

      {!hasMore && !isLoading && end}

      <div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />
    </div>
  );
};
