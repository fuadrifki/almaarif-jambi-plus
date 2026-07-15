'use client';

import { useCallback, useState } from 'react';

import { EmptyState, InfiniteScroll, Skeleton, SkeletonCard, Surface } from '@/components/ui';

import { SectionPreview } from '../../components/section-preview';

const createItems = (page: number, perPage = 8) =>
  Array.from({ length: perPage }, (_, i) => ({
    id: `${page}-${i}`,
    name: `Item ${page * perPage + i + 1}`,
  }));

const BasicDemo = () => {
  const [items, setItems] = useState(() => createItems(0));
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      const nextPage = page + 1;
      const newItems = createItems(nextPage);

      setItems((prev) => [...prev, ...newItems]);
      setPage(nextPage);
      setIsLoading(false);

      if (nextPage >= 5) {
        setHasMore(false);
      }
    }, 800);
  }, [page]);

  return (
    <div className="max-h-80 overflow-y-auto rounded-xl border border-border p-4">
      <InfiniteScroll
        hasMore={hasMore}
        isLoading={isLoading}
        onLoadMore={loadMore}
        loader={
          <div className="space-y-3 py-3">
            <SkeletonCard />
          </div>
        }
        end={
          <p className="py-4 text-center text-sm text-secondary">All {items.length} items loaded</p>
        }
      >
        <div className="space-y-2">
          {items.map((item) => (
            <Surface key={item.id} className="p-3">
              <p className="text-sm font-medium">{item.name}</p>
            </Surface>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

const EmptyDemo = () => (
  <div className="max-h-80 overflow-y-auto rounded-xl border border-border p-4">
    <InfiniteScroll hasMore={false} isLoading={false} onLoadMore={() => {}}>
      <EmptyState title="No items found" description="There is nothing to display yet." />
    </InfiniteScroll>
  </div>
);

const EndOnlyDemo = () => {
  const items = Array.from({ length: 12 }, (_, i) => ({
    id: String(i),
    name: `Item ${i + 1}`,
  }));

  return (
    <div className="max-h-80 overflow-y-auto rounded-xl border border-border p-4">
      <InfiniteScroll hasMore={false} isLoading={false} onLoadMore={() => {}}>
        <div className="space-y-2">
          {items.map((item) => (
            <Surface key={item.id} className="p-3">
              <p className="text-sm font-medium">{item.name}</p>
            </Surface>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

const CardGridDemo = () => {
  const [items, setItems] = useState(() => createItems(0, 6));
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      const nextPage = page + 1;
      const newItems = createItems(nextPage, 6);

      setItems((prev) => [...prev, ...newItems]);
      setPage(nextPage);
      setIsLoading(false);

      if (nextPage >= 4) {
        setHasMore(false);
      }
    }, 600);
  }, [page]);

  return (
    <div className="max-h-96 overflow-y-auto rounded-xl border border-border p-4">
      <InfiniteScroll
        hasMore={hasMore}
        isLoading={isLoading}
        onLoadMore={loadMore}
        loader={
          <div className="grid grid-cols-2 gap-3 py-3 sm:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => (
              <Surface key={i} className="p-4">
                <Skeleton className="mb-2 h-20 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="mt-1 h-3 w-1/2" />
              </Surface>
            ))}
          </div>
        }
        end={<p className="py-4 text-center text-sm text-secondary">No more cards to load</p>}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((item) => (
            <Surface key={item.id} className="p-4">
              <div className="mb-3 flex h-20 items-center justify-center rounded-lg bg-white/5 text-xs text-secondary">
                Image
              </div>
              <p className="text-sm font-medium">{item.name}</p>
              <p className="mt-1 text-xs text-secondary">Description text</p>
            </Surface>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export const InfiniteScrollPage = () => (
  <div className="space-y-8">
    <section>
      <h1 className="text-3xl font-semibold">Infinite Scroll</h1>

      <p className="mt-2 text-secondary">
        A behavior component that detects when the user scrolls near the bottom and triggers
        automatic page loading. Uses IntersectionObserver for efficient scroll detection.
      </p>
    </section>

    <SectionPreview
      title="Basic"
      description="Scroll down to load more items. Each page adds 8 items after a short delay."
      code={`<InfiniteScroll
  hasMore={hasMore}
  isLoading={isLoading}
  onLoadMore={loadMore}
  loader={<SkeletonCard />}
  end={<p>All items loaded</p>}
>
  <div className="space-y-2">
    {items.map((item) => (
      <Surface key={item.id} className="p-3">
        <p className="text-sm font-medium">{item.name}</p>
      </Surface>
    ))}
  </div>
</InfiniteScroll>`}
    >
      <BasicDemo />
    </SectionPreview>

    <SectionPreview
      title="Empty State"
      description="When there is no data to display at all."
      code={`<InfiniteScroll hasMore={false} isLoading={false} onLoadMore={() => {}}>
  <EmptyState title="No items found" description="There is nothing to display yet." />
</InfiniteScroll>`}
    >
      <EmptyDemo />
    </SectionPreview>

    <SectionPreview
      title="End of List"
      description="When all data has been loaded and there is no more to fetch."
      code={`<InfiniteScroll hasMore={false} isLoading={false} onLoadMore={() => {}}>
  {/* items */}
</InfiniteScroll>`}
    >
      <EndOnlyDemo />
    </SectionPreview>

    <SectionPreview
      title="Card Grid"
      description="Infinite scroll with a responsive card grid layout."
      code={`<InfiniteScroll
  hasMore={hasMore}
  isLoading={isLoading}
  onLoadMore={loadMore}
  loader={<SkeletonCard />}
  end={<p>No more cards</p>}
>
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
    {items.map((item) => (
      <Surface key={item.id} className="p-4">
        <p className="text-sm font-medium">{item.name}</p>
      </Surface>
    ))}
  </div>
</InfiniteScroll>`}
    >
      <CardGridDemo />
    </SectionPreview>

    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-sm font-semibold text-primary">Props</h3>

      <div className="mt-3 space-y-2 text-xs text-secondary">
        <div>
          <code className="text-primary">children</code> — ReactNode. The content to render (cards,
          list items, etc.).
        </div>
        <div>
          <code className="text-primary">hasMore</code> — boolean. Whether more data is available to
          load.
        </div>
        <div>
          <code className="text-primary">isLoading</code> — boolean. Whether a load is currently in
          progress. Prevents duplicate requests.
        </div>
        <div>
          <code className="text-primary">onLoadMore</code> — <code>() =&gt; void</code>. Callback
          fired when the sentinel enters the viewport and more data is available.
        </div>
        <div>
          <code className="text-primary">loader</code> — ReactNode, optional. Shown below children
          while loading and hasMore are both true.
        </div>
        <div>
          <code className="text-primary">end</code> — ReactNode, optional. Shown when hasMore is
          false and isLoading is false.
        </div>
        <div>
          <code className="text-primary">threshold</code> — number, optional. IntersectionObserver
          threshold. Defaults to 0.
        </div>
        <div>
          <code className="text-primary">rootMargin</code> — string, optional. IntersectionObserver
          rootMargin. Defaults to &quot;200px&quot; to trigger loading before reaching the bottom.
        </div>
        <div>
          <code className="text-primary">className</code> — string, optional. Additional classes for
          the root wrapper.
        </div>
      </div>
    </section>
  </div>
);
