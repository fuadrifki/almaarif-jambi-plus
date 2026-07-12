type ColorPreviewProps = {
  items: {
    name: string;
    token: string;
    value: string;
  }[];
};

export const ColorPreview = ({ items }: ColorPreviewProps) => (
  <div className="grid gap-4 md:grid-cols-2">
    {items.map(({ token, name, value }) => (
      <div key={token} className="flex items-center gap-4">
        <div
          className="h-14 w-14 rounded-xl border border-(--border)"
          style={{ background: value }}
        />

        <div className="space-y-1">
          <p className="font-medium">{name}</p>

          <p className="text-sm text-(--text-secondary)">{token}</p>

          <code className="text-xs text-(--text-secondary)">{value}</code>
        </div>
      </div>
    ))}
  </div>
);
