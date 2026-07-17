'use client';
import { cn } from '@/lib';

import { createContext, useCallback, useContext, type ReactElement, type ReactNode } from 'react';

import type { TabsItemProps, TabsProps } from './tabs.types';

type ContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
};

const TabsContext = createContext<ContextValue>({ value: '', onValueChange: () => {} });
const useTabs = () => useContext(TabsContext);

const TabsItem = ({ value, icon, disabled, children, className, ...props }: TabsItemProps) => {
  const { value: activeValue, onValueChange, disabled: groupDisabled } = useTabs();
  const isActive = activeValue === value;
  const isDisabled = disabled || groupDisabled;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={isDisabled}
      className={cn('ads-tabs__item', isActive && 'ads-tabs__item--active', className)}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {icon && <span className="ads-tabs__icon">{icon}</span>}
      {children}
    </button>
  );
};

const TabsRoot = ({ value, onValueChange, disabled, children, className, ...props }: TabsProps) => {
  const items = useCallback(() => {
    const collected: string[] = [];

    const walk = (node: ReactNode) => {
      if (!node) return;

      if (Array.isArray(node)) {
        node.forEach(walk);
        return;
      }

      if (typeof node === 'object' && 'props' in node && (node as ReactElement).type === TabsItem) {
        collected.push((node as ReactElement<{ value: string }>).props.value);
      }
    };

    walk(children);

    return collected;
  }, [children]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];

      if (!keys.includes(e.key)) return;

      e.preventDefault();

      const values = items();
      const currentIndex = values.indexOf(value);

      let nextIndex = currentIndex;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown': {
          nextIndex = (currentIndex + 1) % values.length;
          break;
        }
        case 'ArrowLeft':
        case 'ArrowUp': {
          nextIndex = (currentIndex - 1 + values.length) % values.length;
          break;
        }
        case 'Home': {
          nextIndex = 0;
          break;
        }
        case 'End': {
          nextIndex = values.length - 1;
          break;
        }
      }

      const nextValue = values[nextIndex];

      if (nextValue) {
        onValueChange(nextValue);
      }
    },
    [value, onValueChange, items],
  );

  return (
    <TabsContext.Provider value={{ value, onValueChange, disabled }}>
      <div
        role="tablist"
        className={cn('ads-tabs', className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const Tabs = Object.assign(TabsRoot, {
  Item: TabsItem,
});
