type PageActionsProps = Readonly<{
  children: React.ReactNode;
}>;

export function PageActions({ children }: PageActionsProps) {
  return <div className="flex items-center justify-between">{children}</div>;
}
