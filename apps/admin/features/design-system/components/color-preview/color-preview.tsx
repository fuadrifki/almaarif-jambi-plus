interface ColorPreviewProps {
  items: {
    name: string;
    token: string;
    value: string;
  }[];
}

export function ColorPreview({ items }: ColorPreviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.token} className="flex items-center gap-4">
          <div
            className="h-14 w-14 rounded-xl border border-(--border)"
            style={{
              background: item.value,
            }}
          />

          <div className="space-y-1">
            <p className="font-medium">{item.name}</p>

            <p className="text-sm text-(--text-secondary)">{item.token}</p>

            <code className="text-xs text-(--text-secondary)">{item.value}</code>
          </div>
        </div>
      ))}
    </div>
  );
}
