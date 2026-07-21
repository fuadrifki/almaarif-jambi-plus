'use client';

import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { cn } from '@/lib';
import { Card } from '@/components/ui';
import type { ReportSummary } from '../../queries/types';

type ReportSummaryCardsProps = {
  summary: ReportSummary;
  className?: string;
};

const CARDS = [
  {
    key: 'present' as const,
    label: 'Hadir',
    valueKey: 'present' as const,
    filterValue: 'PRESENT',
    className: 'text-green-500',
    bgClassName: 'hover:bg-green-500/10',
  },
  {
    key: 'sick' as const,
    label: 'Sakit',
    valueKey: 'sick' as const,
    filterValue: 'SICK',
    className: 'text-yellow-500',
    bgClassName: 'hover:bg-yellow-500/10',
  },
  {
    key: 'excused' as const,
    label: 'Izin',
    valueKey: 'excused' as const,
    filterValue: 'PERMISSION',
    className: 'text-blue-500',
    bgClassName: 'hover:bg-blue-500/10',
  },
  {
    key: 'absent' as const,
    label: 'Alpha',
    valueKey: 'absent' as const,
    filterValue: 'ABSENT',
    className: 'text-red-500',
    bgClassName: 'hover:bg-red-500/10',
  },
];

export const ReportSummaryCards = ({ summary, className }: ReportSummaryCardsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCardClick = useCallback(
    (filterValue: string) => {
      const params = new URLSearchParams(searchParams);
      const currentStatus = params.get('status');

      if (currentStatus === filterValue) {
        params.delete('status');
      } else {
        params.set('status', filterValue);
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, searchParams, router],
  );

  const currentStatus = searchParams.get('status') || '';

  return (
    <div className={cn('grid grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {CARDS.map((card) => {
        const isActive = currentStatus === card.filterValue;

        return (
          <button
            key={card.key}
            type="button"
            onClick={() => handleCardClick(card.filterValue)}
            className={cn(
              'text-left rounded-3xl border transition-colors cursor-pointer',
              isActive
                ? 'border-primary bg-primary/10'
                : 'border-transparent bg-card hover:border-border',
              card.bgClassName,
            )}
          >
            <Card title={card.label}>
              <div className="flex flex-col gap-1">
                <p className={cn('text-xl md:text-2xl font-bold', card.className)}>
                  {summary[card.valueKey]}
                </p>
                <p className="text-xs text-secondary">klik untuk filter</p>
              </div>
            </Card>
          </button>
        );
      })}
    </div>
  );
};
