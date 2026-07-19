'use client';
import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { cn } from '@/lib';
import { Calendar } from 'lucide-react';
import { format as formatDateFn } from 'date-fns';
import { id } from 'date-fns/locale';

import { Button } from '../button';

import 'react-day-picker/dist/style.css';
import { DatePickerProps } from './date-picker.types';

export const DatePicker = ({
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
  format = 'dd MMMM yyyy',
  resettable = false,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  const [displayMonth, setDisplayMonth] = useState(value ?? new Date());

  const handleReset = () => {
    onChange?.(undefined);
    // Keep the popover open
    // Trigger re-render to keep the popover open
  };

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
          type="button"
          variant="outline"
          size={size}
          disabled={disabled || status === 'loading'}
          className={cn(
            'ads-date-picker__trigger',
            `ads-date-picker__trigger--${size}`,
            `ads-date-picker__trigger--${status}`,
            leftIcon && 'ads-date-picker__trigger--has-left-icon',
            rightIcon && 'ads-date-picker__trigger--has-right-icon',
            className,
          )}
        >
          {leftIcon && <span className={cn(statusColor)}>{leftIcon}</span>}

          <Calendar className={cn(statusColor, getIconSizeClasses())} />

          <span className={cn('text-primary', value ? 'font-medium' : 'font-normal')}>
            {value ? formatDateFn(value, format, { locale: id }) : placeholder}
          </span>

          {rightIcon && <span className="text-secondary">{rightIcon}</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="ads-popover" sideOffset={4} widthSameTrigger={false}>
        <DayPicker
          selected={value}
          onSelect={handleSelect}
          mode="single"
          captionLayout="dropdown-years"
          month={displayMonth}
          onMonthChange={setDisplayMonth}
          locale={id}
          className="ads-date-picker__calendar"
        />

        {resettable && value && (
          <div className="my-3 flex items-center px-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="text-secondary hover:text-primary transition-colors"
            >
              Reset
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
