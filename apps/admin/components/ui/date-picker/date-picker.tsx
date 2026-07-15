'use client';
import { useState, forwardRef } from 'react';
import { DayPicker } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { cn } from '@/lib';
import { Calendar } from 'lucide-react';

import { Button } from '../button';

import 'react-day-picker/dist/style.css';
import { DatePickerProps } from './date-picker.types';

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = 'Pilih tanggal',
      disabled = false,
      error = false,
      className,
      size = 'md',
      status = 'idle',
      leftIcon,
      rightIcon,
      onOpenChange,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);

    const handleSelect = (date: Date | undefined) => {
      onChange?.(date);
      if (date) {
        setOpen(false);
        onOpenChange?.(false);
      }
    };

    const handleOpenChange = (isOpen: boolean) => {
      setOpen(isOpen);
      onOpenChange?.(isOpen);
    };

    const getButtonSizeClasses = () => {
      switch (size) {
        case 'sm':
          return 'h-8 pl-3 pr-9 text-sm';
        case 'lg':
          return 'h-12 pl-5 pr-14 text-lg';
        default:
          return 'h-10 pl-4 pr-12 text-base';
      }
    };

    const getIconSizeClasses = () => {
      switch (size) {
        case 'sm':
          return 'size-4';
        case 'lg':
          return 'size-6';
        default:
          return 'size-5';
      }
    };

    const statusColor = error ? 'text-red-500' : 'text-secondary';

    return (
      <Popover open={open} onOpenChange={handleOpenChange} modal={true}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            type="button"
            variant="outline"
            size={size}
            disabled={disabled || status === 'loading'}
            className={cn(
              'ads-input-wrapper relative',
              'ads-button',
              'ads-input',
              'rounded-full',
              'w-full',
              'text-left',
              'justify-start',
              getButtonSizeClasses(),
              '[&>span]:flex',
              '[&>span]:items-center',
              '[&>span]:gap-2',
              className,
            )}
          >
            {leftIcon && <span className={cn(statusColor)}>{leftIcon}</span>}

            <Calendar className={cn(statusColor, getIconSizeClasses())} />

            <span className={cn('text-primary', value ? 'font-medium' : 'font-normal')}>
              {value
                ? value.toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : placeholder}
            </span>

            {rightIcon && <span className="text-secondary">{rightIcon}</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="ads-popover z-50 mt-2 rounded-md border bg-surface p-3 shadow-lg ring-1 ring-black/5 focus:outline-none"
          sideOffset={4}
        >
          <DayPicker
            mode="single"
            selected={value}
            onSelect={handleSelect}
            className="ads-calendar"
            classNames={{
              today: 'bg-primary/20 text-primary',
              selected:
                'bg-brand text-white hover:bg-brand hover:text-white focus:bg-brand focus:text-white',
              // day_disabled: 'text-muted-foreground opacity-50 cursor-not-allowed',
            }}
          />
        </PopoverContent>
      </Popover>
    );
  },
);

DatePicker.displayName = 'DatePicker';
