import type { LayoutProps } from './layout.types';

export const Layout = ({ children }: LayoutProps) => (
  <div className="ads-layout">
    <div className="ads-layout__header" />

    <div className="ads-layout__sidebar" />

    <main className="ads-layout__content">{children}</main>
  </div>
);
