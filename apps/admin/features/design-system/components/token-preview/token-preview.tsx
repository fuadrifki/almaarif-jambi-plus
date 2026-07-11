interface TokenPreviewProps {
  items: {
    name: string;
    value: string;
  }[];
}

export function TokenPreview({ items }: TokenPreviewProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-between border-b border-(--border) pb-3 last:border-none last:pb-0"
        >
          <span className="text-sm text-(--text-secondary)">{item.name}</span>

          <code className="rounded-md bg-black/5 px-2 py-1 text-xs">{item.value}</code>
        </div>
      ))}
    </div>
  );
}
