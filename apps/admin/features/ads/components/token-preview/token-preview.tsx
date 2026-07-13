type TokenPreviewProps = {
  items: {
    name: string;
    value: string;
  }[];
};

export const TokenPreview = ({ items }: TokenPreviewProps) => (
  <div className="space-y-3">
    {items.map(({ name, value }) => (
      <div
        key={name}
        className="flex items-center justify-between border-b border-border pb-3 last:border-none last:pb-0"
      >
        <span className="text-sm text-secondary">{name}</span>

        <code className="rounded-md bg-black/5 px-2 py-1 text-xs">{value}</code>
      </div>
    ))}
  </div>
);
