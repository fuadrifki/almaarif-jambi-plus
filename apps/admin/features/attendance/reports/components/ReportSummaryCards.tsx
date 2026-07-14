import { cn } from '@/lib';
import { ReportSummary } from '../../queries/report/types';
import { Badge } from '@/components/ui';

type ReportSummaryCardsProps = {
  summary: ReportSummary | null;
  className?: string;
};

export const ReportSummaryCards = ({ summary, className }: ReportSummaryCardsProps) => {
  if (!summary) {
    return (
      <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4', className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-24 bg-surface animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: 'Total Students',
      value: summary.totalStudents,
      variant: 'info' as const,
      className: 'text-blue-600',
    },
    {
      label: 'Present',
      value: summary.present,
      variant: 'success' as const,
      className: 'text-green-600',
    },
    {
      label: 'Sick',
      value: summary.sick,
      variant: 'warning' as const,
      className: 'text-yellow-600',
    },
    {
      label: 'Permission',
      value: summary.permission,
      variant: 'info' as const,
      className: 'text-blue-600',
    },
    {
      label: 'Absent',
      value: summary.absent,
      variant: 'danger' as const,
      className: 'text-red-600',
    },
  ];

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4', className)}>
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-surface rounded-lg p-4 border border-border shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-secondary">{card.label}</p>
            <p className={cn('text-2xl font-bold', card.className)}>{card.value}</p>
            <div className="flex items-center gap-2">
              <Badge variant={card.variant} className="text-xs">
                {card.value > 0 ? '✓' : '—'}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
