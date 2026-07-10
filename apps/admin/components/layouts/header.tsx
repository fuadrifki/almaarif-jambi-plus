export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h2 className="font-semibold">Dashboard</h2>
      </div>

      <div className="text-sm text-muted-foreground">Admin</div>
    </header>
  );
}
