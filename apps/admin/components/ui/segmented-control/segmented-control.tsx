'use client';

import { createContext, useCallback, useContext } from 'react';

import { cn } from '@/lib';

import type { ReactElement, ReactNode } from 'react';

import type { SegmentedControlItemProps, SegmentedControlProps } from './segmented-control.types';

type ContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
};

const SegmentedControlContext = createContext<ContextValue>({
  value: '',
  onValueChange: () => {},
});

const useSegmentedControl = () => useContext(SegmentedControlContext);

const SegmentedControlItem = ({
  value,
  icon,
  disabled,
  children,
  className,
  ...props
}: SegmentedControlItemProps) => {
  const { value: activeValue, onValueChange, disabled: groupDisabled } = useSegmentedControl();
  const isActive = activeValue === value;
  const isDisabled = disabled || groupDisabled;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={isDisabled}
      className={cn(
        'ads-segmented-control__item',
        isActive && 'ads-segmented-control__item--active',
        className,
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {icon && <span className="ads-segmented-control__icon">{icon}</span>}

      {children}
    </button>
  );
};

const SegmentedControlRoot = ({
  value,
  onValueChange,
  disabled,
  children,
  className,
  ...props
}: SegmentedControlProps) => {
  const items = useCallback(() => {
    const collected: string[] = [];

    const walk = (node: ReactNode) => {
      if (!node) return;

      if (Array.isArray(node)) {
        node.forEach(walk);
        return;
      }

      if (
        typeof node === 'object' &&
        'props' in node &&
        (node as ReactElement).type === SegmentedControlItem
      ) {
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
    <SegmentedControlContext.Provider value={{ value, onValueChange, disabled }}>
      <div
        role="tablist"
        className={cn('ads-segmented-control', className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    </SegmentedControlContext.Provider>
  );
};

export const SegmentedControl = Object.assign(SegmentedControlRoot, {
  Item: SegmentedControlItem,
});
