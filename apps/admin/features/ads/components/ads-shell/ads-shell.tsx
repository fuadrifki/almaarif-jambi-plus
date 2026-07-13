'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import { Header, Surface } from '@/components/ui';
import { cn } from '@/lib';
import { Logo } from '@almaarif/brand';
import { ThemeToggle } from '../theme-toggle';

import { designNavigation } from './ads-shell.navigation';
import type { DesignShellProps } from './ads-shell.types';

const HamburgerButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-white/10 hover:text-primary md:hidden"
    aria-label="Open navigation"
  >
    <Menu size={20} />
  </button>
);

const NavContent = ({ onNavigate }: { onNavigate?: () => void }) => {
  const pathname = usePathname();

  return (
    <>
      {designNavigation.map((group) => (
        <div key={group.title} className="space-y-3">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-secondary">
            {group.title}
          </p>

          <div className="space-y-1">
            {group.items.map(({ label, href }) => {
              const isActive = href === '/' ? pathname === href : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onNavigate}
                  className={cn('ads-nav-item', isActive && 'ads-nav-item--active')}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export const DesignShell = ({ children }: DesignShellProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const openDrawer = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setDrawerOpen(true);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!drawerOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen, closeDrawer]);

  // Focus trap + restore focus
  useEffect(() => {
    if (drawerOpen) {
      const firstLink = drawerRef.current?.querySelector('a') as HTMLElement | null;
      firstLink?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [drawerOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <div className="ads-layout gap-y-4">
      <header className="ads-layout__header p-4">
        <Header
          title="Almaarif Design System"
          logo={<Logo width={50} height={30} />}
          leading={<HamburgerButton onClick={openDrawer} />}
          actions={
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          }
        />
      </header>

      {/* Desktop sidebar */}
      <aside className="ads-layout__sidebar p-4">
        <Surface className="h-full p-4 space-y-3">
          <NavContent />
        </Surface>
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div
          className="ads-drawer md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div className="ads-drawer__overlay" onClick={closeDrawer} aria-hidden="true" />

          <div className="ads-drawer__panel" ref={drawerRef}>
            <Surface className="flex h-full flex-col">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Logo width={40} height={24} />
                  <span className="text-sm font-semibold">Design System</span>
                </div>

                <button
                  type="button"
                  onClick={closeDrawer}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-white/10 hover:text-primary"
                  aria-label="Close navigation"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <NavContent onNavigate={closeDrawer} />
              </div>
            </Surface>
          </div>
        </div>
      )}

      <main className="ads-layout__content p-4 mt-4">{children}</main>
    </div>
  );
};
