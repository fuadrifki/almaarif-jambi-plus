'use client';

import { createContext, useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';

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
      role="radio"
      aria-checked={isActive}
      disabled={isDisabled}
      data-active={isActive}
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const activeItem = container.querySelector<HTMLElement>(
      '.ads-segmented-control__item[data-active="true"]',
    );

    if (!activeItem) return;

    setIndicatorStyle({
      left: activeItem.offsetLeft,
      width: activeItem.offsetWidth,
    });
  }, [value, children]);

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
        ref={containerRef}
        role="radiogroup"
        className={cn('ads-segmented-control', className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <div
          className="ads-segmented-control__indicator"
          style={{
            transform: `translateX(${indicatorStyle.left}px)`,
            width: indicatorStyle.width,
          }}
          aria-hidden="true"
        />

        {children}
      </div>
    </SegmentedControlContext.Provider>
  );
};

export const SegmentedControl = Object.assign(SegmentedControlRoot, {
  Item: SegmentedControlItem,
});
